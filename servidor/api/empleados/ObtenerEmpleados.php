<?php
namespace API\empleados;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\EmpleadoController;

    $router->get('/api/empleados/ObtenerEmpleados.php',[EmpleadoController::class,'obtenerEmpleadosFiltrados']);

    $router->comprobarRutas();
    
?>