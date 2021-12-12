<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\TrasladoController;

    $router->post('/api/traslados/CrearTraslado.php',[TrasladoController::class,'crearTraslado']);

    $router->comprobarRutas();
    
?>