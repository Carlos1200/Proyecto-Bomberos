<?php
namespace API\login;

require_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\LoginController;

    $router->get('/api/login/Logout.php',[LoginController::class,'logout']);

    $router->comprobarRutas();
    
?>