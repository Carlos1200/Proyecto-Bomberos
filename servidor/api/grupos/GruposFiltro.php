<?php
namespace API\grupos;

require_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\GrupoController;

    $router->post('/api/grupos/GruposFiltro.php',[GrupoController::class,'grupoFiltro']);

    $router->comprobarRutas();
    
?>