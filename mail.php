<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

$name = $data['name'];
$mail = $data['mail'];
$msg = $data['msg'];

$title = 'Сообщение с сайта W-Wave Radio'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>'.
        '<p>Почта: <strong>'.$mail.'</strong></p>'.
        '<p>Имя: <strong>'.$msg.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.yandex.com'; // SMTP сервера вашей почты
  $mail->Username   = 'andrey13makarov@yandex.ru'; // Логин на почте
  $mail->Password   = 'ygvxhdrembrzxyyt'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('andrey13makarov@yandex.ru', 'Сообщение с сайта W-Wave Radio'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('andrey13makarov@yandex.ru');
  $mail->addAddress('uyean@outlook.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение успешно отправлено');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}');
}
