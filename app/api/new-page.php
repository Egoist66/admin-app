<?php


require_once('./utils/getPages.php');

$name = $_POST = json_decode(file_get_contents("php://input"), true);
function createNewPage()
{
     global $name;

     $new_page_path = "../../" . $name['name'] . ".html";

          if (file_exists($new_page_path)) {
               echo json_encode(array(
                    "status" => 1,
                    "files" => [],
                    "response" => "Файл уже существует!"
               ));
               http_response_code(200);
          } else {
               fopen($new_page_path, "w");
               echo json_encode(array(
                    "status" => 0,
                    "files" => getHTMLFiles("../../*.html"),
                    "response" => "Страница успешно создана!"
               ));

               http_response_code(201);
          }
     
}

createNewPage();
