<?php

session_start();


if($_SESSION['auth'] !== true){
     http_response_code(403);
    die();
}


require_once './utils/statuses.php';
function uploadFile(array $files): void {

    global $httpStatuses;

    if(file_exists($files['image']['tmp_name'])) {

        if(!is_dir('../../img/')){
            mkdir('../../img/');
        }

        if(move_uploaded_file($files["image"]['tmp_name'], "../../img/{$files['image']['name']}")){


            echo json_encode([
                'status'=> 0,
                'response' => 'Файл успешно загружен',
                'file' => [
                    "path" => "./img/{$files['image']['name']}",
                    "name" => $files["image"]["name"],
                    "size" => $files["image"]["size"],
                    "type"=> $files["image"]["type"],
                ]
            ]);

            http_response_code($httpStatuses['Created']);
        }
        else {
            echo json_encode([
                'status'=> 1,
                'response' => 'Файл не был загружен',
                'file' => []
            ]);

            http_response_code($httpStatuses['OK']);
        }
    }
    else {
        echo json_encode([
            'status'=> 1,
            'response' => 'Файл не был загружен',
            'file' => []
        ]);

        http_response_code($httpStatuses['OK']);
    }
    

}


uploadFile($_FILES);