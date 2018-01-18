<?php

$host = $_SERVER["HTTP_HOST"];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = json_decode(file_get_contents('php://input'), true);

    $dateTime = new DateTime();
    $dateStr = $dateTime->format("Y-m-d\TH:i:sP");

    $img = $json["img"] ?? "";
    $img = str_replace("data:image/png;base64,", "", $img);
    $img = str_replace(" ", "+", $img);

    $imgData = base64_decode($img);
    $imgPath = getcwd() . "/images/";
    $imgName = "j-hnnybens-n." . uniqid() . $dateStr . ".png";

    $file = "{$imgPath}{$imgName}";
    $success = file_put_contents($file, $imgData);

    echo $success
        ? "https://$host/uploads/images/{$imgName}"
        : "Unable to save image. FILE={$file}";

    exit;
}

header("Location: https://{$host}/");
exit;
