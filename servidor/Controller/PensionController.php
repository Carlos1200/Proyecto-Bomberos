<?php
namespace Controller;

include_once "cors.php";
use MVC\Router;
use Model\Pension;

class PensionController{


    public static function nuevaPension(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $pension=new Pension($_POST);
        $pension::VerificarToken($token);
        $errores=$pension->validar();

        if(empty($errores)){
            //Validar que no exista otra pension igual
            $pension->existePension();

            $errores=$pension::getErrores();

            if(empty($errores)){
                //Crear pens$pension
                $errores=$pension->nuevaPension();

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

    public static function obtenerPensiones(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        Pension::VerificarToken($token);

        $errores=Pension::getErrores();

        if(empty($errores)){
            $pensiones=Pension::all();
            $router->render('pension/pension',[
                'pensiones'=>$pensiones
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

}

?>