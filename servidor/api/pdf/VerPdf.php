<?php
namespace API\plazas;

include_once "../../cors.php";

require_once('../../app.php');
    use MVC\Router;
    $router= new Router();
    use Controller\PdfController;

    $router->get('/api/pdf/VerPdf.php',[PdfController::class,'generarPdf']);

    $router->comprobarRutas();
    
?>