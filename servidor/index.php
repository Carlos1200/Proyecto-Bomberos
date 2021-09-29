<?php
    require("Router.php");
    require 'config/database.php';

    $db=conectarDB();

    require 'Model/ActiveRecord.php';

    ActiveRecord::setDB($db);

    $router= new Router();
    require("Controller/UsuarioController.php");
    require("Controller/LoginController.php");


    $router->get('/api/usuarios',[UsuarioController::class,'obtenerUsuarios']);

    $router->post('/api/login',[LoginController::class,'login']);

    $router->get('/api/logverificar',[LoginController::class,'verificarSesion']);

    $router->get('/api/logout',[LoginController::class,'logout']);

    $router->comprobarRutas();
?>