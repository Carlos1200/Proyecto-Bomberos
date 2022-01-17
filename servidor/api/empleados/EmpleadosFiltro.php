<?php
namespace API\empleados;

require_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\EmpleadoController;

    $router->post('/api/empleados/EmpleadosFiltro.php',[EmpleadoController::class,'empleadosFiltrados']);

    $router->comprobarRutas();
    
?>