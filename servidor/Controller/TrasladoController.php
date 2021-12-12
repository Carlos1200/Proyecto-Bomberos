<?php

    namespace Controller;

    use MVC\Router;
    use Model\Traslado;

    class TrasladoController{

        public static function crearTraslado(Router $router){
            $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
            $token=str_replace("token=","",$query);
            $traslado=new Traslado($_POST);
            $traslado::VerificarToken($token);
            $errores=$traslado->validar();

            if(empty($errores)){
                $errores=$traslado->crearTraslado();

                if(empty($errores)){
                    $errores=$traslado->crearTrasladoIndividual();
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

    }

?>