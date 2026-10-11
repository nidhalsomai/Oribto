<?php

require __DIR__ . '/config.php';

session_start();

if (!isset($_GET['provider']) || $_GET['provider'] !== 'google') {
    header('Location: index.php');
    exit;
}

if (empty(GOOGLE_CLIENT_ID) || empty(GOOGLE_CLIENT_SECRET)) {
    $_SESSION['auth_error'] = 'Google OAuth is not configured yet.';
    header('Location: index.php');
    exit;
}

if (!isset($_GET['code'])) {
    $params = [
        'client_id' => GOOGLE_CLIENT_ID,
        'redirect_uri' => GOOGLE_REDIRECT_URI,
        'response_type' => 'code',
        'scope' => 'openid email profile',
        'access_type' => 'offline',
        'prompt' => 'consent',
    ];
    $url = 'https://accounts.google.com/o/oauth2/v2/auth?' . http_build_query($params);
    header('Location: ' . $url);
    exit;
}

$code = $_GET['code'];
$curl = curl_init('https://oauth2.googleapis.com/token');
curl_setopt_array($curl, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'code' => $code,
        'client_id' => GOOGLE_CLIENT_ID,
        'client_secret' => GOOGLE_CLIENT_SECRET,
        'redirect_uri' => GOOGLE_REDIRECT_URI,
        'grant_type' => 'authorization_code',
    ]),
    CURLOPT_HTTPHEADER => ['Content-Type: application/x-www-form-urlencoded'],
    CURLOPT_TIMEOUT => 30,
]);

$tokenResponse = curl_exec($curl);
$tokenError = curl_error($curl);
curl_close($curl);

if ($tokenError || $tokenResponse === false) {
    $_SESSION['auth_error'] = 'Google token exchange failed.';
    header('Location: index.php');
    exit;
}

$tokenData = json_decode($tokenResponse, true);
if (!isset($tokenData['access_token'])) {
    $_SESSION['auth_error'] = 'No access token returned by Google.';
    header('Location: index.php');
    exit;
}

$browser = curl_init('https://www.googleapis.com/oauth2/v3/userinfo');
curl_setopt_array($browser, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $tokenData['access_token']],
    CURLOPT_TIMEOUT => 30,
]);

$userResponse = curl_exec($browser);
$userError = curl_error($browser);
curl_close($browser);

if ($userError || $userResponse === false) {
    $_SESSION['auth_error'] = 'Unable to load Google profile.';
    header('Location: index.php');
    exit;
}

$userData = json_decode($userResponse, true);
if (!isset($userData['email'])) {
    $_SESSION['auth_error'] = 'Google profile is incomplete.';
    header('Location: index.php');
    exit;
}

$pdo = db();
$email = strtolower(trim((string) $userData['email']));
$googleId = (string) ($userData['sub'] ?? '');
$name = trim((string) ($userData['name'] ?? $email));
$avatar = (string) ($userData['picture'] ?? '');

$stmt = $pdo->prepare('SELECT * FROM users WHERE google_id = :google_id OR email = :email LIMIT 1');
$stmt->execute(['google_id' => $googleId, 'email' => $email]);
$user = $stmt->fetch();

if ($user) {
    $userId = (int) $user['id'];
    $update = $pdo->prepare('UPDATE users SET google_id = :google_id, avatar = :avatar, name = :name WHERE id = :id');
    $update->execute(['google_id' => $googleId ?: $user['google_id'], 'avatar' => $avatar ?: $user['avatar'], 'name' => $name ?: $user['name'], 'id' => $userId]);
} else {
    $insert = $pdo->prepare('INSERT INTO users (name, email, google_id, avatar, created_at) VALUES (:name, :email, :google_id, :avatar, NOW())');
    $insert->execute(['name' => $name, 'email' => $email, 'google_id' => $googleId, 'avatar' => $avatar]);
    $userId = (int) $pdo->lastInsertId();
}

$_SESSION['user_id'] = $userId;
$settings = ensureSettings($pdo, $userId);
$_SESSION['lang'] = $settings['lang'];
header('Location: index.php');
exit;
