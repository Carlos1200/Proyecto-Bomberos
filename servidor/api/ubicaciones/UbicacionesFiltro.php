<?php
namespace API\ubicaciones;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\UbicacionesController;

    $router->post('/api/ubicaciones/UbicacionesFiltro.php',[UbicacionesController::class,'ubicacionFiltro']);

    $router->comprobarRutas();
    
?>