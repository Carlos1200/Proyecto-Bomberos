<?php

namespace Controller;

include_once "cors.php";
use MVC\Router;
use Model\Ubicacion;

class UbicacionesController{

    public static function nuevaUbicacion(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $ubicacion=new Ubicacion($_POST);
        $ubicacion::VerificarToken($token);
        $ubicacion::verificarAdmin();
        $errores=$ubicacion->validar();

        if(empty($errores)){
            //Validar que no exista otra ubicacion igual
            $ubicacion->existeUbicacion();

            $errores=$ubicacion::getErrores();

            if(empty($errores)){
                //Crear ubicacion
                $errores=$ubicacion->nuevaUbicacion();

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
    }

    public static function obtenerUbicacion(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        Ubicacion::VerificarToken($token);

        $errores=Ubicacion::getErrores();

        if(empty($errores)){
            $ubicaciones=Ubicacion::all();
            $router->render('ubicaciones/ubicaciones',[
                'ubicaciones'=>$ubicaciones
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function actualizarUbicacion(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $ubicacion=new Ubicacion($_POST);
        $ubicacion::VerificarToken($token);
        $ubicacion::verificarAdmin();

        $errores=$ubicacion->validar(false);

        if(empty($errores)){
            $errores=$ubicacion->editarUbicacion();

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
    }

    public static function eliminarUbicacion(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $ubicacion=new Ubicacion($_POST);
        $ubicacion::VerificarToken($token);
        $ubicacion::verificarAdmin();
        $errores=$ubicacion::getErrores();

        if(empty($errores)){
            $errores=$ubicacion->eliminarUbicacion();
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
    }

}

?>