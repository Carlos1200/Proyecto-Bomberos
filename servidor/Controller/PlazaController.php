<?php
namespace Controller;

include_once "cors.php";
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
                $errores=$plaza->nuevaPlaza();

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

}

?>