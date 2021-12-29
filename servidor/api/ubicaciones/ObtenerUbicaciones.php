<?php
namespace API\ubicaciones;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\UbicacionesController;

    $router->get('/api/ubicaciones/ObtenerUbicaciones.php',[UbicacionesController::class,'obtenerUbicacion']);

    $router->comprobarRutas();
    
?>