<?php


require_once('./utils/getPages.php');

//$_POST = json_decode(file_get_contents("php://input"), true);
function createNewPage(){
     $new_page_path = "../../" . $_POST['filename'] . ".html";

     if(file_exists($new_page_path)) {
          echo json_encode(array(
               "status" => 1,
               "files" => [],
               "response" => "Файл уже существует!"
          ));
          http_response_code(200);

     }
     else {
          fopen($new_page_path,"w");

          http_response_code(201);

          echo json_encode(array(
               "status" => 0,
               "files" => getHTMLFiles("../../*.html"),
               "response" => "Страница успешно создана!"
          ));
     }

}

createNewPage();
     