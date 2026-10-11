<?php
require __DIR__ . '/config.php';

session_start();
$_SESSION['auth_error'] = 'Name-only mode is enabled.';
header('Location: index.php');
exit;
