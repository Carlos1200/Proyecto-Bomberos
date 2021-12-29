<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\PlazaController;

    $router->post('/api/plazas/CrearPlaza.php',[PlazaController::class,'nuevaPlaza']);

    $router->comprobarRutas();
    
?>