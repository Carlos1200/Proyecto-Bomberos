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
    use Controller\EmpleadoController;

    //!Usuarios
    $router->get('/api/usuarios',[UsuarioController::class,'obtenerUsuarios']);
    $router->post('/api/usuarios',[UsuarioController::class,'nuevoUsuario']);
    $router->post('/api/usuariosEdit',[UsuarioController::class,'actualizarUsuario']);
    $router->post('/api/usuariosDelete',[UsuarioController::class,'eliminarUsuario']);

    //!Login
    $router->post('/api/login',[LoginController::class,'login']);
    $router->get('/api/logverificar',[LoginController::class,'verificarSesion']);
    $router->get('/api/logout',[LoginController::class,'logout']);

    //!Ubicaciones
    $router->post('/api/ubicacion',[UbicacionesController::class,'nuevaUbicacion']);
    $router->get('/api/ubicacion',[UbicacionesController::class,'obtenerUbicacion']);
    $router->post('/api/ubicacionEdit',[UbicacionesController::class,'actualizarUbicacion']);
    $router->post('/api/ubicacionDelete',[UbicacionesController::class,'eliminarUbicacion']);

    //!Plazas
    $router->post('/api/plaza',[PlazaController::class,'nuevaPlaza']);
    $router->get('/api/plaza',[PlazaController::class,'obtenerPlazas']);
    $router->post('/api/plazaEdit',[PlazaController::class,'actualizarPlaza']);
    $router->post('/api/plazaDelete',[PlazaController::class,'eliminarPlaza']);

    //!Pensiones
    $router->post('/api/pension',[PensionController::class,'nuevaPension']);
    $router->get('/api/pension',[PensionController::class,'obtenerPensiones']);

    //!Grupo
    $router->post('/api/grupo',[GrupoController::class,'nuevoGrupo']);
    $router->get('/api/grupo',[GrupoController::class,'obtenerGrupos']);
    $router->post('/api/grupoEdit',[GrupoController::class,'actualizarGrupo']);
    $router->post('/api/grupoDelete',[GrupoController::class,'eliminarGrupo']);

    //!Empleados
    $router->get('/api/empleado',[EmpleadoController::class,'obtenerEmpleados']);
    $router->post('/api/empleadoFiltro',[EmpleadoController::class,'obtenerEmpleadosFiltrados']);
    $router->post('/api/empleado',[EmpleadoController::class,'insertarUsuarios']);
    $router->post('/api/empleadoEdit',[EmpleadoController::class,'actualizarEmpleados']);
    $router->post('/api/empleadoDelete',[EmpleadoController::class,'eliminarEmpleado']);
    $router->post('/api/empleadoDetalle',[EmpleadoController::class,'ObtenerDetalleEmpleado']);

    //!Traslados
    $router->post('/api/traslado',[EmpleadoController::class,'insertarTraslado']);

    $router->comprobarRutas();
?>