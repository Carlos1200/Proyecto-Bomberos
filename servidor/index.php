<?php

    require_once('./app.php');
    use MVC\Router;
    

    $router= new Router();
    use Controller\UsuarioController;
    use Controller\LoginController;


    $router->get('/api/usuarios',[UsuarioController::class,'obtenerUsuarios']);

    $router->post('/api/login',[LoginController::class,'login']);

    $router->get('/api/logverificar',[LoginController::class,'verificarSesion']);

    $router->get('/api/logout',[LoginController::class,'logout']);

    $router->comprobarRutas();
?>