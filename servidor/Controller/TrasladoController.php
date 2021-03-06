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
                    $traslados=$traslado->crearTrasladoIndividual();
                    $errores=$traslado::getErrores();
                    if(empty($errores)){
                        $router->render('traslados/traslados',[
                            'traslados'=>$traslados
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

        public static function verificarTraslados(Router $router){
            $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
            $token=str_replace("token=","",$query);
            $traslado=new Traslado($_POST);
            $traslado::VerificarToken($token);
            $errores=$traslado::getErrores();

            if(empty($errores)){
                $errores=$traslado->verificarTraslados();

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

        public static function verificarEmpTraslados(Router $router){
            $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
            $token=str_replace("token=","",$query);
            $traslado=new Traslado($_POST);
            $traslado::verificarToken($token);
            $errores=$traslado::getErrores();

            if(empty($errores)){
                $errores=$traslado->verificarEmpTraslados();

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

        public static function obtenerTraslados(Router $router){
            $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
            $token=str_replace("token=","",$query);
            $trasladosObj = new Traslado();

            $trasladosObj::VerificarToken($token);

            $errores= $trasladosObj::getErrores();

            if(empty($errores)){
                $traslados = $trasladosObj->obtenerTraslados();
                $router->render('traslados/traslados',[
                    'traslados'=>$traslados
                ]);
            } else {
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }

        public static function obtenerTrasladosFiltrados(Router $router){
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
            $trasladosObj = new Traslado();

            $trasladosObj::VerificarToken($token);

            $errores= $trasladosObj::getErrores();

            if(empty($errores)){
                $traslados = $trasladosObj->obtenerTrasladosFiltrados($nj);
                $router->render('traslados/traslados',[
                    'traslados'=>$traslados
                ]);
            } else {
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }

        public static function actualizarTraslados(Router $router){
            $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
            $token=str_replace("token=","",$query);
            
            $traslado= new Traslado($_POST);
            $traslado::VerificarToken($token);
            $traslado::VerificarAdmin();

            $errores = $traslado->validar(false);
            if(empty($errores)){
                // $errores=$traslado->editarPlaza();
                if(!empty($errores)){
                    $router->render('errores/error',[
                        'errores'=>$errores
                    ]);
                }
            } else {
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }

        public static function eliminarTraslados(Router $router){
            $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
            $token=str_replace("token=","",$query);

            $traslado=new Traslado($_POST);
            $traslado::VerificarToken($token);
            $traslado::verificarAdmin();
            $errores=$traslado::getErrores();

            if(empty($errores)){
                $errores=$traslado->eliminarTraslados();
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

        public static function ObtenerDetalleTraslado(Router $router){
            $query = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
            $token = str_replace("token=", "", $query);

            $traslado = new Traslado($_POST);
            $traslado::VerificarToken($token);
            $errores=$traslado::getErrores();

            if(empty($errores)){
                $traslados=$traslado->ObtenerTrasladosDetalles();
                $errores=$traslado::getErrores();
                if(empty($errores)){
                    $router->render('traslados/traslados',[
                        'traslados'=>$traslados
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

        public static function ObtenerDetalleTrasladoEmpleados(Router $router){
            $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
            $token=str_replace("token=","",$query);

            $traslado = new Traslado($_POST);
            $traslado::VerificarToken($token);
            $errores=$traslado::getErrores();

            if(empty($errores)){
                $traslados=$traslado->ObtenerTrasladosDetalles();
                $errores=$traslado::getErrores();
                if(empty($errores)){
                    $router->render('traslados/traslados',[
                        'traslados'=>$traslados
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