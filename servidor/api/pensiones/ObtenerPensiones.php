<?php
namespace API\plazas;

require_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\PensionController;

    $router->get('/api/pensiones/ObtenerPensiones.php',[PensionController::class,'obtenerPensiones']);

    $router->comprobarRutas();
    
?>