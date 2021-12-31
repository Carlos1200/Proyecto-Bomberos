<?php
namespace API\empleados;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\TrasladoController;

    $router->post('/api/traslados/TrasladosDetalle.php',[TrasladoController::class,'ObtenerDetalleTraslado']);
    $router->comprobarRutas();
    
?>