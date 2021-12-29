<?php
namespace API\grupos;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\GrupoController;

    $router->get('/api/grupos/ObtenerGrupos.php',[GrupoController::class,'obtenerGrupos']);

    $router->comprobarRutas();
    
?>