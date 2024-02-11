<?php

session_start();


function logout(){
    if($_SESSION['auth'] === true){
        if($_GET['action'] === 'logout'){
            $_SESSION['auth'] = false;
            unset($_SESSION['auth']);
            session_destroy();

            echo json_encode([
                "loggedOut" => true
            ]);
        }

       

    }
}

logout();