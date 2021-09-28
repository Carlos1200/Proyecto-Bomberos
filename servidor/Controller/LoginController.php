<?php


require_once('Model/Usuario.php');
include_once "cors.php";

class LoginController{
    public static function login(Router $router){
        $usuario=new Usuario($_POST);
        $errores=$usuario->validar();
        if(empty($errores)){
            do{
                $usuario->existeUsuario();
            
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
        $usuario=new Usuario();

        $autenticado=$usuario->verificarSesion();

        $router->render('usuarios/autenticar',[
            'autenticado'=>$autenticado
        ]);
    }
}