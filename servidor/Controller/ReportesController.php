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

    public static function obtenerReportesFiltrados(Router $router){
        $nj=null;
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('nj',$output);
        $existeToken=array_key_exists('token',$output);
        if($existe){
            $nj=$output['nj'];
        }

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->reportesFiltrados($nj);
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
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

    public static function obtenerReportesUbicacion(Router $router){
        $nj=null;
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('nj',$output);
        $existeToken=array_key_exists('token',$output);
        if($existe){
            $nj=$output['nj'];
        }

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->reportesFiltrados($nj);
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
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
    public static function obtenerReportes(Router $router){
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existeToken=array_key_exists('token',$output);

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->obtenerReportes();
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
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

    public static function leerDetallesReportes(Router $router){
        $nj=null;
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('nj',$output);
        $existeToken=array_key_exists('token',$output);
        if($existe){
            $nj=$output['nj'];
        }

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->detallesReportes();
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
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