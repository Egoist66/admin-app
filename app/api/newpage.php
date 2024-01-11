<?php


require_once('./utils/getPages.php');
function createNewPage(){
     $new_page_path = "../../" . $_POST['filename'] . ".html";

     if(file_exists($new_page_path)) {
          echo json_encode(array(
               "status" => 1,
               "files" => [],
               "response" => "File already exists!"
          ));
          header("HTTP/1.0 200");


     }
     else {
          fopen($new_page_path,"w");

          header("HTTP/1.0 200");
          echo json_encode(array(
               "status" => 0,
               "files" => getHTMLFiles("../../*.html"),
               "response" => "Page successfully created!"
          ));
     }

}

createNewPage();
     