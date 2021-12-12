<?php
namespace API\usuarios;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\UsuarioController;

    $router->post('/api/usuarios/EditarUsuario.php',[UsuarioController::class,'actualizarUsuario']);

    $router->comprobarRutas();
    
?>