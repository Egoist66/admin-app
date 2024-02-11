<?php

session_start();

$_POST = json_decode(file_get_contents("php://input"), true);

function login(){
    if(!file_exists('./settings.json')){
        file_put_contents('./settings.json', json_encode(["password" => "admin2024"]));
    }

    $password = htmlspecialchars($_POST["password"]) ?? '';
    if($password){
        $settings = json_decode(file_get_contents('./settings.json'), true);

        if($password === $settings['password']){
            $_SESSION['auth'] = true;
            $_SESSION[session_id()]['login_attempts'] = 0;

            echo json_encode([
                "statusCode" => 0,
                "response" => "",
                "isAuth" => $_SESSION['auth'] 
            ]);
        }
        else {
            $currentTimestamp = time();
            $lastAttemptTimestamp = $_SESSION[session_id()]['last_attempt_timestamp'] ?? 0;

            if ($currentTimestamp - $lastAttemptTimestamp >= 120) {
                $_SESSION[session_id()]['login_attempts'] = 0;
                $_SESSION[session_id()]['last_attempt_timestamp'] = $currentTimestamp;
            }
            else {
                $_SESSION[session_id()]['login_attempts']++;

                if($_SESSION[session_id()]['login_attempts'] >= 3){
                    echo json_encode([
                        "statusCode" => 1,
                        "time" => time(),
                        "response" => "Блокировка на 2 минуты использовано 3 и более попыток",
                        "isBlocked" => true,
                        "isAuth" => false
                    ]);
               
                    return;
                }
            }

            echo json_encode([
                "statusCode" => 1,
                "response" => "Неверный пароль!",
                "isAuth" => false
            ]);
        }
    }
    else {
        http_response_code(400);
    }
}

login();