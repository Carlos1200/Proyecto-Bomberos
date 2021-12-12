<?php
namespace API\empleados;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\EmpleadoController;

    $router->post('/api/empleados/EmpleadosDetalle.php',[EmpleadoController::class,'obtenerDetalleEmpleado']);
    $router->comprobarRutas();
    
?>