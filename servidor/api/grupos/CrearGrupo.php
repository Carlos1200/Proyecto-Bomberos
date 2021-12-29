<?php
namespace API\grupos;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\GrupoController;

    $router->post('/api/grupos/CrearGrupo.php',[GrupoController::class,'nuevoGrupo']);

    $router->comprobarRutas();
    
?>