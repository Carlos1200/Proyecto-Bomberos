<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\ReportesController;

    $router->get('/api/reportes/ObtenerReportesFiltrados.php',[ReportesController::class,'obtenerReportesFiltrados']);

    $router->comprobarRutas();
    
?>