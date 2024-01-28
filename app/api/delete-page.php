<?php 

require_once('./utils/getPages.php');

$_POST = json_decode(file_get_contents("php://input"), true);
function deletePage(){
     $file = "../../" . $_POST['name'];

     if(file_exists($file)) {
          unlink($file);

          echo json_encode(array(
               "status" => 0,
               "response" => "Файл удален!"
          ));
          
          http_response_code(200);
          exit();

     }
     
     http_response_code(400);
          

}

deletePage();
     