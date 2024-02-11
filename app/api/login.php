<?php

session_start();

$_POST = json_decode(file_get_contents("php://input"), true);




function login(){

    $password = $_POST["password"] ?? '';
    if($password){
        $settings = json_decode(file_get_contents('./settings.json'), true);

    }
  
}

login();