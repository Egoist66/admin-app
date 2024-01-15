<?php

require_once('./utils/statuses.php');

$_POST = json_decode(file_get_contents("php://input"), true);
function saveEdits()
{
     global $httpStatuses;


     $file = "../../" . $_POST["pagename"];
     $newhtml = $_POST["html"];

     if ($newhtml && file_exists($file)) {

          file_put_contents($file, $newhtml);

          echo json_encode(array(
               "status" => 0,
               "response" => "Изменения сохранены"
          ));
          http_response_code($httpStatuses["Created"]);

          return;
     } else {

          echo json_encode(array(
               "status" => 1,
               "response" => "Изменения не были сохранены"
          ));

          http_response_code($httpStatuses["OK"]);

     }
}

saveEdits();
