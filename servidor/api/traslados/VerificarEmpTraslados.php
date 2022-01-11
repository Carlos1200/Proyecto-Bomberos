<?php
namespace API\traslados;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\TrasladoController;

    $router->post('/api/traslados/verificarEmpTraslados.php',[TrasladoController::class,'verificarEmpTraslados']);
    $router->comprobarRutas();
    
?>