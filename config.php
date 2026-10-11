<?php
date_default_timezone_set('UTC');

const APP_NAME = 'Orbito';
const APP_URL = 'http://localhost/orbito';
const DB_HOST = '127.0.0.1';
const DB_NAME = 'focusflow';
const DB_USER = 'root';
const DB_PASS = '';

const TURNSTILE_SITE_KEY = '';
const TURNSTILE_SECRET   = '';

function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) return $pdo;

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
    return $pdo;
}

function currentUserId(): ?int
{
    return isset($_SESSION['user_id']) ? (int) $_SESSION['user_id'] : null;
}

function requireAuth(): void
{
    if (empty($_SESSION['user_id'])) {
        http_response_code(401);
        echo json_encode(['ok' => false, 'message' => 'Unauthorized']);
        exit;
    }
}

function defaultSettings(): array
{
    return [
        'pomodoro' => 25,
        'short_break' => 5,
        'long_break' => 15,
        'long_break_interval' => 4,
        'auto_start_breaks' => 0,
        'auto_start_pomodoros' => 0,
        'auto_check_tasks' => 0,
        'check_to_bottom' => 0,
        'alarm_sound' => 'kitchen',
        'alarm_volume' => 60,
        'alarm_repeat' => 1,
        'focus_sound' => 'none',
        'focus_volume' => 40,
        'lang' => 'en',
    ];
}

function readSettings(PDO $pdo, int $userId): array
{
    $settings = defaultSettings();
    $stmt = $pdo->prepare('SELECT * FROM settings WHERE user_id = :user_id');
    $stmt->execute(['user_id' => $userId]);
    $row = $stmt->fetch();
    if ($row) {
        foreach ($settings as $key => $value) {
            if (array_key_exists($key, $row)) $settings[$key] = $row[$key];
        }
    }
    return $settings;
}

function ensureSettings(PDO $pdo, int $userId): array
{
    $settings = readSettings($pdo, $userId);
    $stmt = $pdo->prepare(
        'INSERT INTO settings (user_id, pomodoro, short_break, long_break, long_break_interval,
         auto_start_breaks, auto_start_pomodoros, auto_check_tasks, check_to_bottom,
         alarm_sound, alarm_volume, alarm_repeat, focus_sound, focus_volume, lang)
         VALUES (:user_id, :pomodoro, :short_break, :long_break, :long_break_interval,
         :auto_start_breaks, :auto_start_pomodoros, :auto_check_tasks, :check_to_bottom,
         :alarm_sound, :alarm_volume, :alarm_repeat, :focus_sound, :focus_volume, :lang)
         ON DUPLICATE KEY UPDATE user_id = user_id'
    );
    $stmt->execute([
        'user_id' => $userId,
        'pomodoro' => (int) $settings['pomodoro'],
        'short_break' => (int) $settings['short_break'],
        'long_break' => (int) $settings['long_break'],
        'long_break_interval' => (int) $settings['long_break_interval'],
        'auto_start_breaks' => (int) $settings['auto_start_breaks'],
        'auto_start_pomodoros' => (int) $settings['auto_start_pomodoros'],
        'auto_check_tasks' => (int) $settings['auto_check_tasks'],
        'check_to_bottom' => (int) $settings['check_to_bottom'],
        'alarm_sound' => $settings['alarm_sound'],
        'alarm_volume' => (int) $settings['alarm_volume'],
        'alarm_repeat' => (int) $settings['alarm_repeat'],
        'focus_sound' => $settings['focus_sound'],
        'focus_volume' => (int) $settings['focus_volume'],
        'lang' => $settings['lang'],
    ]);
    return readSettings($pdo, $userId);
}
