<?php

function createNewPage(){
     $new_page_path = "../../" . $_POST['filename'] . ".html";

     if(file_exists($new_page_path)) {
          header("HTTP/1.0 400 Bad Request");
     }
     else {
          fopen($new_page_path,"w");
     }

}

createNewPage();
     