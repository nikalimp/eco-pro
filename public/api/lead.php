<?php
// Обработчик заявок ECO-PRO (форма «Записаться на встречу» и квиз).
// Письмо со всеми данными — на почту; в Telegram-группу — уведомление БЕЗ персональных данных
// (Telegram — сервер вне РФ, а политика сайта обещает, что трансграничной передачи нет).
// Настройки — в api/config.php рядом (в репозиторий не кладём, образец — config.example.php).

$cfg = @include __DIR__ . '/config.php';
if (!is_array($cfg)) { $cfg = []; }
$mailTo = $cfg['mail_to'] ?? 'assistant@pro-nas.pro';
$mailFrom = $cfg['mail_from'] ?? 'site@pro-nas.pro';
$tgToken = $cfg['tg_token'] ?? '';
$tgChat = $cfg['tg_chat_id'] ?? '';

// Отправка в Telegram: сначала curl, если его нет — file_get_contents. Ошибки пишутся в api/logs/tg.log (закрыт снаружи).
function tg_send($token, $chat, $text) {
  $url = "https://api.telegram.org/bot$token/sendMessage";
  $data = http_build_query(['chat_id' => $chat, 'text' => $text]);
  if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => $data, CURLOPT_RETURNTRANSFER => true, CURLOPT_CONNECTTIMEOUT => 8, CURLOPT_TIMEOUT => 15]);
    $res = curl_exec($ch); $err = curl_error($ch); $code = curl_getinfo($ch, CURLINFO_HTTP_CODE); curl_close($ch);
    if ($res === false) return ['ok' => false, 'error' => "curl: $err", 'code' => 0, 'body' => ''];
  } else {
    $ctx = stream_context_create(['http' => ['method' => 'POST', 'header' => "Content-Type: application/x-www-form-urlencoded\r\n", 'content' => $data, 'timeout' => 15, 'ignore_errors' => true]]);
    $res = @file_get_contents($url, false, $ctx);
    if ($res === false) { $e = error_get_last(); return ['ok' => false, 'error' => 'fopen: ' . ($e['message'] ?? 'нет ответа'), 'code' => 0, 'body' => '']; }
    $code = 0; if (isset($http_response_header[0]) && preg_match('/\s(\d{3})\s/', $http_response_header[0], $m)) $code = (int)$m[1];
  }
  $j = json_decode($res, true);
  return ['ok' => !empty($j['ok']), 'error' => $j['description'] ?? "HTTP $code", 'code' => $code, 'body' => mb_substr((string)$res, 0, 300)];
}
function tg_log($msg) {
  $dir = __DIR__ . '/logs'; if (!is_dir($dir)) { @mkdir($dir, 0750); }
  @file_put_contents("$dir/tg.log", date('Y-m-d H:i:s') . " $msg\n", FILE_APPEND);
}

$wantsJson = stripos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;
function done($ok, $json, $code = 200) {
  if ($json) { http_response_code($ok ? 200 : $code); header('Content-Type: application/json; charset=utf-8'); echo json_encode(['ok' => $ok]); exit; }
  header('Location: /?sent=' . ($ok ? '1' : '0') . '#vstrecha', true, 303); exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { done(false, $wantsJson, 405); }
if (!empty($_POST['website'])) { done(true, $wantsJson); } // бот заполнил ловушку — молча «принимаем»

$clean = function ($v) { return trim(mb_substr(strip_tags(is_array($v) ? implode(', ', $v) : (string)$v), 0, 500)); };
$name = $clean($_POST['name'] ?? '');
$phone = $clean($_POST['phone'] ?? '');
$email = $clean($_POST['email'] ?? '');
$source = $clean($_POST['source'] ?? 'Сайт');
$consent = ($_POST['consent'] ?? '') === 'yes';
if ($name === '' || $phone === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$consent) { done(false, $wantsJson, 422); }

$labels = ['zadacha' => 'Задача', 'obekty' => 'Объектов', 'napravleniya' => 'Направления', 'kritichnost' => 'Критичность прозрачности (1–5)', 'rol' => 'Роль'];
$answers = [];
foreach ($labels as $k => $l) { if (!empty($_POST[$k])) { $answers[] = "$l: " . $clean($_POST[$k]); } }

$body = "Новая заявка с сайта pro-nas.pro\nИсточник: $source\n\nИмя: $name\nТелефон: $phone\nEmail: $email\n";
if ($answers) { $body .= "\nОтветы брифинга:\n" . implode("\n", $answers) . "\n"; }
$body .= "\nСогласие на обработку ПДн: да\nДата: " . date('d.m.Y H:i') . "\n";

$headers = "From: ECO-PRO <$mailFrom>\r\nReply-To: $email\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\n";
$mailOk = @mail($mailTo, '=?UTF-8?B?' . base64_encode("Заявка с сайта: $source") . '?=', $body, $headers);

$tgOk = false;
if ($tgToken && $tgChat) {
  $text = "🔔 Новая заявка с сайта\nИсточник: $source" . ($answers ? "\n" . implode("\n", $answers) : '') . "\n\nКонтакты — в письме на $mailTo";
  $tg = tg_send($tgToken, $tgChat, $text);
  $tgOk = $tg['ok'];
  if (!$tgOk) { tg_log('lead: ' . $tg['error']); }
}

if (!$mailOk) { tg_log('mail: письмо не отправлено (mail() вернул false)'); }
// Заявка принята, если сработал хотя бы один канал
done($mailOk || $tgOk, $wantsJson, 500);
