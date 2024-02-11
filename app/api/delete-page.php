<?php 
session_start();

require_once('./utils/getPages.php');

if($_SESSION['auth'] !== true){
     http_response_code(403);
     die();
}

$_POST = json_decode(file_get_contents("php://input"), true);
$backupFile = json_decode(file_get_contents('../backup/backups.json'), true);
function deletePage(){
     global $backupFile;

     $file = $_POST['page'] ?? '';
     $path = '../backup/' . $file;

     if(file_exists($path)) {
          unlink($path);
          
          $backupFile = array_filter($backupFile, fn($backup) => $backup['backup'] !== $file);
          $backupFile = array_values($backupFile);
          file_put_contents('../backup/backups.json', json_encode($backupFile));

          echo json_encode([
               "status" => 0,
               "response" => "Файл удален!"
          ]);
          
          http_response_code(200);
          exit();

     }
     else {
          echo json_encode([
               "status" => 1,
               "response" => "Файл не был удален!"
          ]);

          http_response_code(200);
          exit();

     }
     
          

}

deletePage();
     