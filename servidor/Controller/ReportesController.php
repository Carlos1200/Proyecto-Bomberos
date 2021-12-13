<?php
namespace Controller;

use MVC\Router;
use Model\Reportes;

class ReportesController{

    public static function nuevoReportes(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);

        $reporte=new Reportes($_POST);
        $reporte::VerificarToken($output['token']);
        $errores=$reporte->validar();
        
        if(empty($errores)){
            $errores=$reporte->crearAportesDescuentosMinutos();
            if(empty($errores)){
                $errores=$reporte->DetallesReportes();
                
                if(empty($errores)){
                    $errores=$reporte->Autorizacion();
                    if(empty($errores)){
                        $reporte->crearReporte();
                        $errores=$reporte::getErrores();
                        if(!empty($errores)){
                            $router->render('errores/error',[
                                'errores'=>$errores
                            ]);
                        }
                    }else{
                        $router->render('errores/error',[
                            'errores'=>$errores
                        ]);
                    }
                }else{
                    $router->render('errores/error',[
                        'errores'=>$errores
                    ]);
                }

            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

}

?>