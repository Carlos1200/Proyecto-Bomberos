<?php
namespace API\traslados;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\TrasladoController;

    $router->post('/api/traslados/EliminarTraslados.php',[TrasladoController::class,'eliminarTraslados']);

    $router->comprobarRutas();
    
?>