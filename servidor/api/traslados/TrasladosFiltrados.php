<?php
namespace API\traslados;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\TrasladoController;

    $router->get('/api/traslados/TrasladosFiltrados.php',[TrasladoController::class,'obtenerTrasladosFiltrados']);

    $router->comprobarRutas();
    
?>