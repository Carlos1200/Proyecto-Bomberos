<?php

namespace Controller;

use MVC\Router;
use Model\Usuario;

class LoginController{
    public static function login(Router $router){

        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        $usuario=new Usuario($_POST);

        $usuario::VerificarToken($token);

        $errores=$usuario->validar();
        if(empty($errores)){
            do{
                $usuario->existeUsuario();
            
                $errores=$usuario->getErrores();

                if(empty($errores)){

                    //Comprobar password

                    $usuario->ComprobarContra();

                    $errores=$usuario->getErrores();

                    if(empty($errores)){
                        $autenticado = $usuario->autenticar();
                    
                        $router->render('usuarios/autenticar',[
                            'autenticado'=>$autenticado
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
                    break;
                }

            }while(false);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
        

    }
    public static function logout(Router $router){
        
        $usuario=new Usuario();
        $autenticado=$usuario->cerrarSesion();
        
        $router->render('usuarios/autenticar',[
            'autenticado'=>$autenticado
        ]);
    }

    public static function verificarSesion(Router $router){

        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $usuario=new Usuario();

        $usuario::VerificarToken($token);

        $errores=$usuario->getErrores();

        if(empty($errores)){
            $autenticado=$usuario->verificarSesion();

            $router->render('usuarios/autenticar',[
                'autenticado'=>$autenticado
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }

    }
}