<?php
require __DIR__ . '/config.php';

if (session_status() === PHP_SESSION_NONE) session_start();

header('Content-Type: application/json; charset=utf-8');

$pdo = db();
$input = file_get_contents('php://input');
$data = [];

if ($input !== '') {
    $decoded = json_decode($input, true);
    if (is_array($decoded)) $data = $decoded;
    else parse_str($input, $data);
}
if (!empty($_POST)) {
    foreach ($_POST as $k => $v) $data[$k] = $v;
}

$action = $_GET['action'] ?? ($data['action'] ?? '');

function sendJson(array $payload): void
{
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function verifyTurnstile(string $token): bool
{
    if (!defined('TURNSTILE_SECRET') || TURNSTILE_SECRET === '') return true;
    if ($token === '') return false;
    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 8,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => TURNSTILE_SECRET,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
    ]);
    $out = curl_exec($ch);
    curl_close($ch);
    $j = json_decode((string)$out, true);
    return is_array($j) && !empty($j['success']);
}

function validUsername(string $u): bool
{
    return (bool) preg_match('/^[a-zA-Z0-9_.-]{3,40}$/', $u);
}

if ($action === 'logout') {
    session_unset();
    session_destroy();
    sendJson(['ok' => true]);
}

if ($action === 'get_dashboard') {
    $userId = currentUserId();
    if (!$userId) sendJson(['ok' => false, 'message' => 'Unauthorized']);

    $user = $pdo->prepare('SELECT id, username FROM users WHERE id = :id LIMIT 1');
    $user->execute(['id' => $userId]);
    $userRow = $user->fetch();

    $settings = readSettings($pdo, $userId);

    $taskStmt = $pdo->prepare('SELECT * FROM tasks WHERE user_id = :user_id ORDER BY position ASC, id ASC');
    $taskStmt->execute(['user_id' => $userId]);
    $tasks = $taskStmt->fetchAll();

    $today = date('Y-m-d');
    $startWeek = date('Y-m-d', strtotime('monday this week'));

    $stmt = $pdo->prepare('SELECT COALESCE(SUM(minutes),0) AS total_minutes, COUNT(*) AS session_count FROM sessions WHERE user_id = :user_id AND DATE(created_at) = :day');
    $stmt->execute(['user_id' => $userId, 'day' => $today]);
    $todayStats = $stmt->fetch();

    $weekStmt = $pdo->prepare('SELECT COALESCE(SUM(minutes),0) AS total_minutes FROM sessions WHERE user_id = :user_id AND DATE(created_at) >= :start_date');
    $weekStmt->execute(['user_id' => $userId, 'start_date' => $startWeek]);
    $weekStats = $weekStmt->fetch();

    $allStmt = $pdo->prepare('SELECT COALESCE(SUM(minutes),0) AS total_minutes FROM sessions WHERE user_id = :user_id');
    $allStmt->execute(['user_id' => $userId]);
    $allStats = $allStmt->fetch();

    $rankingStmt = $pdo->prepare(
        'SELECT u.id, u.username, COALESCE(SUM(s.minutes),0) AS total_minutes
         FROM users u
         LEFT JOIN sessions s ON s.user_id = u.id AND DATE(s.created_at) >= :start_date
         GROUP BY u.id, u.username
         ORDER BY total_minutes DESC
         LIMIT 20'
    );
    $rankingStmt->execute(['start_date' => $startWeek]);
    $ranking = $rankingStmt->fetchAll();

    $chart = [];
    for ($i = 6; $i >= 0; $i--) {
        $day = date('Y-m-d', strtotime('-' . $i . ' days'));
        $chartStmt = $pdo->prepare('SELECT COALESCE(SUM(minutes),0) AS minutes FROM sessions WHERE user_id = :user_id AND DATE(created_at) = :day');
        $chartStmt->execute(['user_id' => $userId, 'day' => $day]);
        $chart[] = ['day' => $day, 'minutes' => (int)$chartStmt->fetch()['minutes']];
    }

    sendJson([
        'ok' => true,
        'user' => $userRow,
        'settings' => $settings,
        'tasks' => $tasks,
        'stats' => [
            'today_minutes' => (int)$todayStats['total_minutes'],
            'today_sessions' => (int)$todayStats['session_count'],
            'week_minutes' => (int)$weekStats['total_minutes'],
            'all_minutes' => (int)$allStats['total_minutes'],
        ],
        'chart' => $chart,
        'ranking' => $ranking,
    ]);
}

if ($action === 'save_settings') {
    requireAuth();
    $payload = $data['settings'] ?? $data;
    if (is_string($payload)) {
        $decoded = json_decode($payload, true);
        if (is_array($decoded)) $payload = $decoded;
    }
    if (!is_array($payload)) sendJson(['ok' => false, 'message' => 'Invalid settings payload.']);

    $userId = currentUserId();
    $allowed = ['pomodoro','short_break','long_break','long_break_interval','auto_start_breaks',
                'auto_start_pomodoros','auto_check_tasks','check_to_bottom','alarm_sound',
                'alarm_volume','alarm_repeat','focus_sound','focus_volume','lang'];

    $items = [];
    foreach ($allowed as $key) {
        if (array_key_exists($key, $payload)) $items[$key] = $payload[$key];
    }
    if (!$items) sendJson(['ok' => false, 'message' => 'No settings to save.']);

    $values = ['user_id' => $userId];
    foreach ($items as $k => $v) $values[$k] = $v;

    $cols = ['user_id'];
    $placeholders = [':user_id'];
    $updates = ['user_id = VALUES(user_id)'];
    foreach ($items as $k => $v) {
        $cols[] = $k;
        $placeholders[] = ':' . $k;
        $updates[] = $k . ' = VALUES(' . $k . ')';
    }

    $sql = 'INSERT INTO settings (' . implode(', ', $cols) . ') VALUES (' . implode(', ', $placeholders) . ') ON DUPLICATE KEY UPDATE ' . implode(', ', $updates);
    $stmt = $pdo->prepare($sql);
    $stmt->execute($values);

    sendJson(['ok' => true, 'settings' => readSettings($pdo, $userId)]);
}

if ($action === 'task_add') {
    requireAuth();
    $title = trim((string)($data['title'] ?? ''));
    $estimate = max(1, min(12, (int)($data['estimate'] ?? 1)));
    if ($title === '') sendJson(['ok' => false, 'message' => 'Task title is required.']);

    $userId = currentUserId();
    $stmt = $pdo->prepare('SELECT COALESCE(MAX(position), 0) + 1 AS next_position FROM tasks WHERE user_id = :user_id');
    $stmt->execute(['user_id' => $userId]);
    $nextPosition = (int)$stmt->fetch()['next_position'];

    $insert = $pdo->prepare('INSERT INTO tasks (user_id, title, estimate, done_pomodoros, is_done, position) VALUES (:user_id, :title, :estimate, 0, 0, :position)');
    $insert->execute(['user_id' => $userId, 'title' => $title, 'estimate' => $estimate, 'position' => $nextPosition]);

    $taskId = (int)$pdo->lastInsertId();
    $row = $pdo->prepare('SELECT * FROM tasks WHERE id = :id LIMIT 1');
    $row->execute(['id' => $taskId]);
    sendJson(['ok' => true, 'task' => $row->fetch()]);
}

if ($action === 'task_toggle') {
    requireAuth();
    $taskId = (int)($data['task_id'] ?? 0);
    $userId = currentUserId();
    $stmt = $pdo->prepare('SELECT * FROM tasks WHERE id = :id AND user_id = :user_id LIMIT 1');
    $stmt->execute(['id' => $taskId, 'user_id' => $userId]);
    $task = $stmt->fetch();
    if (!$task) sendJson(['ok' => false, 'message' => 'Task not found.']);

    $newState = (int)!$task['is_done'];
    $pdo->prepare('UPDATE tasks SET is_done = :state WHERE id = :id AND user_id = :user_id')
        ->execute(['state' => $newState, 'id' => $taskId, 'user_id' => $userId]);
    sendJson(['ok' => true, 'task' => ['id' => $taskId, 'is_done' => $newState]]);
}

if ($action === 'task_delete') {
    requireAuth();
    $taskId = (int)($data['task_id'] ?? 0);
    $userId = currentUserId();
    $pdo->prepare('DELETE FROM tasks WHERE id = :id AND user_id = :user_id')
        ->execute(['id' => $taskId, 'user_id' => $userId]);
    sendJson(['ok' => true, 'deleted' => $taskId]);
}

if ($action === 'task_set_active') {
    requireAuth();
    $taskId = (int)($data['task_id'] ?? 0);
    $_SESSION['active_task_id'] = $taskId;
    sendJson(['ok' => true]);
}

if ($action === 'complete_pomodoro') {
    requireAuth();
    $taskId = (int)($data['task_id'] ?? 0);
    $userId = currentUserId();
    $taskStmt = $pdo->prepare('SELECT * FROM tasks WHERE id = :id AND user_id = :user_id LIMIT 1');
    $taskStmt->execute(['id' => $taskId, 'user_id' => $userId]);
    $task = $taskStmt->fetch();
    if (!$task) sendJson(['ok' => false, 'message' => 'Task not found.']);

    $done = (int)$task['done_pomodoros'] + 1;
    $isDone = $done >= max(1, (int)$task['estimate']);
    $pdo->prepare('UPDATE tasks SET done_pomodoros = :done, is_done = :is_done WHERE id = :id AND user_id = :user_id')
        ->execute(['done' => $done, 'is_done' => $isDone ? 1 : 0, 'id' => $taskId, 'user_id' => $userId]);

    $sessionMode = $data['mode'] ?? 'pomodoro';
    $minuteValue = (int)($data['minutes'] ?? 25);
    $pdo->prepare('INSERT INTO sessions (user_id, task_id, mode, minutes) VALUES (:user_id, :task_id, :mode, :minutes)')
        ->execute(['user_id' => $userId, 'task_id' => $taskId, 'mode' => $sessionMode, 'minutes' => $minuteValue]);

    sendJson(['ok' => true, 'task' => ['id' => $taskId, 'done_pomodoros' => $done, 'is_done' => $isDone ? 1 : 0]]);
}

if ($action === 'record_session') {
    requireAuth();
    $userId = currentUserId();
    $taskId = isset($data['task_id']) && $data['task_id'] !== '' ? (int)$data['task_id'] : null;
    $mode = in_array(($data['mode'] ?? 'pomodoro'), ['pomodoro', 'short', 'long'], true) ? $data['mode'] : 'pomodoro';
    $minutes = max(1, (int)($data['minutes'] ?? 25));
    $pdo->prepare('INSERT INTO sessions (user_id, task_id, mode, minutes) VALUES (:user_id, :task_id, :mode, :minutes)')
        ->execute(['user_id' => $userId, 'task_id' => $taskId, 'mode' => $mode, 'minutes' => $minutes]);
    sendJson(['ok' => true]);
}

sendJson(['ok' => false, 'message' => 'Unsupported action.']);
