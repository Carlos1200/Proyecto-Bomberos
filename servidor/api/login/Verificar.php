<?php
namespace API\login;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\LoginController;

    $router->get('/api/login/Verificar.php',[LoginController::class,'verificarSesion']);

    $router->comprobarRutas();
    
?>