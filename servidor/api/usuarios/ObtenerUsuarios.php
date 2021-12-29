<?php
namespace API\usuarios;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\UsuarioController;

    $router->get('/api/usuarios/ObtenerUsuarios.php',[UsuarioController::class,'obtenerUsuarios']);

    $router->comprobarRutas();
    
?>