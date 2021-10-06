<?php

namespace Controller;

include_once "cors.php";
use MVC\Router;
use Model\Usuario;

class UsuarioController{
    public static function obtenerUsuarios(Router $router){
    
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        Usuario::VerificarToken($token);

        $errores=Usuario::getErrores();

        if(empty($errores)){
            $usuarios=Usuario::all();
            $router->render('usuarios/usuarios',[
                'usuarios'=>$usuarios
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }

    }

    public static function nuevoUsuario(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $usuario=new Usuario($_POST);
        
        $usuario::VerificarToken($token);
        $errores=$usuario->validarNuevo();

        if(empty($errores)){

            //Verificar si el usuario no existe

            $usuario->existeUsuario(true);

            $errores=$usuario::getErrores();

            if(empty($errores)){
                //Hashear contraseña
                $usuario->hashearContra();

                //Crear Usuario
                $errores=$usuario->crearUsuario();

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