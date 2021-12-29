<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\PensionController;

    $router->post('/api/pensiones/CrearPension.php',[PensionController::class,'nuevaPension']);

    $router->comprobarRutas();
    
?>