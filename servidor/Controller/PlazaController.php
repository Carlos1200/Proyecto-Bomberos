<?php
namespace Controller;

use MVC\Router;
use Model\Plaza;

class PlazaController{


    public static function nuevaPlaza(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $plaza=new Plaza($_POST);
        $plaza::VerificarToken($token);
        $errores=$plaza->validar();

        if(empty($errores)){
            //Validar que no exista otra plaza igual
            $plaza->existePlaza();

            $errores=$plaza::getErrores();

            if(empty($errores)){
                //Crear plaza
                $plazas=$plaza->nuevaPlaza();
                $errores=$plaza::getErrores();
                if(empty($errores)){
                    $router->render('plazas/plazas',[
                        'plazas'=>$plazas
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

        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function plazaFiltro(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $plaza=new Plaza($_POST);
        $plaza::VerificarToken($token);

        $errores=$plaza::getErrores();

        if(empty($errores)){
            $plazas=$plaza->plazaFiltro();
            $router->render('plazas/plazas',[
                'plazas'=>$plazas
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function obtenerPlazas(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        Plaza::VerificarToken($token);

        $errores=Plaza::getErrores();

        if(empty($errores)){
            $plazas=Plaza::all();
            $router->render('plazas/plazas',[
                'plazas'=>$plazas
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function actualizarPlaza(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $plaza=new Plaza($_POST);
        $plaza::VerificarToken($token);
        $plaza::verificarAdmin();

        $errores=$plaza->validar(false);
        if(empty($errores)){
            $errores=$plaza->editarPlaza();
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

    public static function eliminarPlaza(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $plaza=new Plaza($_POST);
        $plaza::VerificarToken($token);
        $plaza::verificarAdmin();
        $errores=$plaza::getErrores();

        if(empty($errores)){
            $errores=$plaza->eliminarPlaza();
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