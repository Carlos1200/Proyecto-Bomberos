<?php
namespace API\empleados;

require_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\EmpleadoController;

    $router->post('/api/empleados/EliminarEmpleado.php',[EmpleadoController::class,'eliminarEmpleado']);
    $router->comprobarRutas();
    
?>