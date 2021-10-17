<?php

    require_once('./app.php');
    use MVC\Router;
    

    $router= new Router();
    use Controller\UsuarioController;
    use Controller\LoginController;
    use Controller\UbicacionesController;
    use Controller\PlazaController;
    use Controller\PensionController;
    use Controller\GrupoController;

    //Usuarios
    $router->get('/api/usuarios',[UsuarioController::class,'obtenerUsuarios']);
    $router->post('/api/usuarios',[UsuarioController::class,'nuevoUsuario']);
    $router->post('/api/usuariosEdit',[UsuarioController::class,'actualizarUsuario']);
    $router->post('/api/usuariosDelete',[UsuarioController::class,'eliminarUsuario']);


    //Login
    $router->post('/api/login',[LoginController::class,'login']);
    $router->get('/api/logverificar',[LoginController::class,'verificarSesion']);
    $router->get('/api/logout',[LoginController::class,'logout']);

    //Ubicaciones
    $router->post('/api/ubicacion',[UbicacionesController::class,'nuevaUbicacion']);
    $router->get('/api/ubicacion',[UbicacionesController::class,'obtenerUbicacion']);
    $router->post('/api/ubicacionEdit',[UbicacionesController::class,'actualizarUbicacion']);
    $router->post('/api/ubicacionDelete',[UbicacionesController::class,'eliminarUbicacion']);

    //Plazas
    $router->post('/api/plaza',[PlazaController::class,'nuevaPlaza']);
    $router->get('/api/plaza',[PlazaController::class,'obtenerPlazas']);

    //Pensiones
    $router->post('/api/pension',[PensionController::class,'nuevaPension']);
    $router->get('/api/pension',[PensionController::class,'obtenerPensiones']);

    //grupo
    $router->post('/api/grupo',[GrupoController::class,'nuevoGrupo']);
    $router->get('/api/grupo',[GrupoController::class,'obtenerGrupos']);

    $router->comprobarRutas();
?>