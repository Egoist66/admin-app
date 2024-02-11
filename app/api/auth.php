<?php

session_start();

function isUserAuth(){
    if($_SESSION['auth']){
        echo json_encode([
            "isAuth" => true,
            "statusCode" => 0
        ]);
    }
    else {
        echo json_encode([
            "isAuth" => false,
            "statusCode" => 1
        ]);
    }
}


isUserAuth();