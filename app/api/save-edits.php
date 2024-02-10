<?php

require_once('./utils/statuses.php');
require_once('./utils/time-formatter.php');

$_POST = json_decode(file_get_contents("php://input"), true);


$page = $_POST["page"] ?? '';
$newhtml = $_POST["html"] ?? '';
$file = $_POST["page"];

function createBackup($path){
     global $file;

     if(!is_dir($path)){
          mkdir($path);
     }


     $backups = json_decode(file_get_contents($path . '/backups.json'));
     if(!is_array($backups)){
          $backups = [];
     }
     $backupFileName = 'backup_' . uniqid() . '.html';

   
     copy('../../' . $file, $path . $backupFileName);
     array_push($backups, [
          "page" => $file,
          "backup" => $backupFileName,
          "backup_time" => returnCurrentDate(["time_zone" => "Europe/Minsk","format" => "Y-m-d H:i:s"])
     ]);

     file_put_contents($path . "backups.json", json_encode($backups)); 
}


function saveEdits(){
     global $httpStatuses;
     global $file;
     global $newhtml;


     if ($newhtml && file_exists('../../' . $file)) {

          createBackup('../backup/');
           
          file_put_contents('../../' . $file, $newhtml);
          echo json_encode(array(
               "status" => 0,
               "response" => "Изменения сохранены!"
          ));
          http_response_code($httpStatuses["Created"]);

     } else {

          echo json_encode(array(
               "status" => 1,
               "response" => "Изменения не были сохранены!"
          ));

          http_response_code($httpStatuses["OK"]);

     }
}

saveEdits();
