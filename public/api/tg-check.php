<?php
// Диагностика уведомлений в Telegram. Открыть: /api/tg-check.php?key=ecopro-7f3k
// Отправляет тестовое сообщение в группу и показывает, что мешает. После наладки файл можно удалить.
if (($_GET['key'] ?? '') !== 'ecopro-7f3k') { http_response_code(404); exit; }
header('Content-Type: text/plain; charset=utf-8');
$_SERVER['REQUEST_METHOD'] = 'GET';
$cfg = @include __DIR__ . '/config.php';
echo "config.php: " . (is_array($cfg) ? 'найден' : 'НЕ НАЙДЕН') . "\n";
echo "token: " . (!empty($cfg['tg_token']) ? 'есть' : 'НЕТ') . ", chat_id: " . ($cfg['tg_chat_id'] ?? 'НЕТ') . "\n";
echo "PHP: " . PHP_VERSION . "\n";
echo "curl: " . (function_exists('curl_init') ? 'есть' : 'нет') . ", allow_url_fopen: " . (ini_get('allow_url_fopen') ? 'on' : 'off') . "\n";
echo "DNS api.telegram.org: " . gethostbyname('api.telegram.org') . "\n";
if (!is_array($cfg) || empty($cfg['tg_token'])) exit;
// Подключаем функцию отправки из lead.php без выполнения обработчика
$src = file_get_contents(__DIR__ . '/lead.php');
preg_match('/function tg_send.*?\n}\n/s', $src, $m);
eval($m[0]);
$t0 = microtime(true);
$r = tg_send($cfg['tg_token'], $cfg['tg_chat_id'], '🔧 Тест с сервера сайта: уведомления о заявках работают');
printf("Отправка: %s (%.1f с)\nОтвет: %s\nHTTP: %s\n%s\n", $r['ok'] ? 'OK' : 'ОШИБКА', microtime(true) - $t0, $r['error'], $r['code'], $r['body']);
$log = __DIR__ . '/logs/tg.log';
if (is_file($log)) { echo "\nПоследние ошибки из логов:\n" . implode('', array_slice(file($log), -5)); }
