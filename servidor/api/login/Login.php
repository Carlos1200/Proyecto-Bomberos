<?php
namespace API\login;


include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\LoginController;

    $router->post('/api/login/Login.php',[LoginController::class,'login']);

    $router->comprobarRutas();
    
?>