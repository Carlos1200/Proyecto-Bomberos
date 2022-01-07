<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\ReportesController;

    $router->get('/api/reportes/ObtenerDetallesReportes.php',[ReportesController::class,'leerDetallesReportes']);

    $router->comprobarRutas();
    
?>