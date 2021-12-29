<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\PlazaController;

    $router->get('/api/plazas/ObtenerPlazas.php',[PlazaController::class,'obtenerPlazas']);

    $router->comprobarRutas();
    
?>