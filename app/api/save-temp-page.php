<?php
session_start();


if($_SESSION['auth'] !== true){
     http_response_code(403);
    die();
}

$_POST = json_decode(file_get_contents("php://input"), true);
function saveTemplatePage()
{
     $new_page_path = "../../\$randTmp-page01.html";

     if ($_POST["html"] ?? null) {

          file_put_contents($new_page_path, $_POST["html"]);

          echo json_encode(array(
               "status" => 0,
               "response" => "Шаблон успешно создан"
          ));
          http_response_code(201);

          return;
     } else {

          echo json_encode(array(
               "status" => 1,
               "response" => "Ошибка создания шаблона"
          ));

          http_response_code(200);
     }
}

saveTemplatePage();
