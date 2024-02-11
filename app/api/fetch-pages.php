<?php
session_start();


require_once('./utils/getPages.php');

if($_SESSION['auth'] !== true){
    http_response_code(403);
   die();
}

echo json_encode(getHTMLFiles("../../*.html"));


