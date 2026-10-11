<?php
require __DIR__ . '/config.php';
require __DIR__ . '/lang.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$db = db();
$user = null;
$settings = defaultSettings();
$tasks = [];

if (!empty($_SESSION['user_id'])) {
    $st = $db->prepare('SELECT id, name, email, avatar FROM users WHERE id = :id LIMIT 1');
    $st->execute(['id' => $_SESSION['user_id']]);
    $user = $st->fetch();
    if ($user) {
        $settings = readSettings($db, (int)$user['id']);
        $st = $db->prepare('SELECT * FROM tasks WHERE user_id = :uid ORDER BY position ASC, id ASC');
        $st->execute(['uid' => $user['id']]);
        $tasks = $st->fetchAll();
    }
}

$langCode = resolveLang($settings['lang'] ?? null);
?>
<!doctype html>
<html lang="<?php echo htmlspecialchars($langCode, ENT_QUOTES, 'UTF-8'); ?>" dir="<?php echo $langCode === 'ar' ? 'rtl' : 'ltr'; ?>">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Orbito</title>
<link rel="icon" href="oo.png" type="image/png">
<link rel="apple-touch-icon" href="oo.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box}
html,body{margin:0;padding:0}
body{
    background:#0B0B0C;color:#EDEDEF;
    font-family:'Inter',system-ui,sans-serif;
    font-size:14px;line-height:1.5;
    -webkit-font-smoothing:antialiased;
    min-height:100vh;
}
button{font-family:inherit;color:inherit;cursor:pointer;border:0;background:none}
input,select{font-family:inherit;color:inherit}
.mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
.shell{max-width:1000px;margin:0 auto;padding:0 28px}
@media (max-width:820px){.shell{padding:0 18px}}
.hidden{display:none!important}
:focus-visible{outline:1px solid #D97757;outline-offset:2px}

/* topbar */
.topbar{border-bottom:1px solid rgba(255,255,255,.07);position:sticky;top:0;z-index:20;background:rgba(11,11,12,.85);backdrop-filter:blur(12px)}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;height:56px}
.brand{font-weight:600;font-size:14px;letter-spacing:-.01em}
.topbar-actions{display:flex;align-items:center;gap:8px}
.badge{display:flex;align-items:center;gap:6px;padding:5px 11px;border:1px solid rgba(255,255,255,.07);border-radius:100px;font-size:12px;color:#8A8A93}
.badge .mono{color:#EDEDEF;font-weight:500}

.btn{height:32px;padding:0 13px;border:1px solid rgba(255,255,255,.07);border-radius:8px;display:inline-flex;align-items:center;gap:7px;font-size:13px;font-weight:500;transition:all .15s}
.btn:hover{background:#18181B;border-color:rgba(255,255,255,.14)}
.btn.primary{background:#D97757;border-color:#D97757;color:#fff}
.btn.primary:hover{filter:brightness(1.08)}
.btn.full{width:100%;justify-content:center;height:38px}
.btn svg{width:14px;height:14px}

.icon-btn{width:32px;height:32px;border-radius:8px;display:grid;place-items:center;color:#8A8A93;transition:all .15s}
.icon-btn:hover{color:#EDEDEF;background:#18181B}
.icon-btn svg{width:16px;height:16px}

.avatar{width:32px;height:32px;border-radius:50%;overflow:hidden;background:rgba(217,119,87,.14);border:1px solid rgba(255,255,255,.14);display:grid;place-items:center;font-weight:600;font-size:13px;color:#D97757}
.avatar img{width:100%;height:100%;object-fit:cover;display:block}

/* popover */
.pop-wrap{position:relative}
.popover{display:none;position:absolute;top:calc(100% + 8px);right:0;min-width:220px;padding:14px;background:#131315;border:1px solid rgba(255,255,255,.07);border-radius:12px;z-index:40}
.popover.active{display:block}
.pop-title{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#5E5E66;font-weight:600;margin-bottom:10px}
.pop-name{font-size:13px;font-weight:500;margin-bottom:2px}
.pop-email{font-size:11.5px;color:#8A8A93;margin-bottom:12px;word-break:break-all}
.pop-item{display:block;width:100%;text-align:left;padding:8px 10px;border-radius:6px;font-size:13px;color:#EDEDEF;transition:background .15s}
.pop-item:hover{background:#18181B}
.pop-item.danger:hover{background:rgba(229,72,77,.12);color:#E5484D}
.theme-dots{display:flex;gap:10px}
.theme-dot{width:26px;height:26px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:transform .15s,border-color .15s}
.theme-dot:hover{transform:scale(1.12)}
.theme-dot.active{border-color:#EDEDEF}
.theme-dot[data-t="ember"]{background:#D97757}
.theme-dot[data-t="sage"]{background:#6BA89B}
.theme-dot[data-t="peri"]{background:#7BA3D4}
.theme-dot[data-t="rose"]{background:#
