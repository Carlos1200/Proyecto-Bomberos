<?php
namespace API\grupos;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\GrupoController;

    $router->post('/api/grupos/EliminarGrupo.php',[GrupoController::class,'eliminarGrupo']);

    $router->comprobarRutas();
    
?>