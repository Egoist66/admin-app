<?php

session_start();


if($_SESSION['auth'] !== true){
     http_response_code(403);
    die();
}

require_once('./utils/statuses.php');

$_POST = json_decode(file_get_contents("php://input"), true);





function restoreBackup()
{
    global $httpStatuses;

    $page = $_POST["page"];
    $file = $_POST["file"];




    if ($page && $file) {

        copy('../backup/' . $file, '../../' . $page);
     
        echo json_encode(
            array(
                "status" => 0,
                "response" => "Восстановление успешно!"
            )
        );

        http_response_code($httpStatuses["Created"]);

    } else {

        echo json_encode(
            array(
                "status" => 1,
                "response" => "Ошибка восстановления"
            )
        );

        http_response_code($httpStatuses["OK"]);

    }
}

restoreBackup();
