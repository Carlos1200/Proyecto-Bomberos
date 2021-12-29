<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\ReportesController;

    $router->post('/api/reportes/CrearReporte.php',[ReportesController::class,'nuevoReportes']);

    $router->comprobarRutas();
    
?>