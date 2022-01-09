<?php

namespace Controller;

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

    public static function obtenerUsuarioFiltrado(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $usuario=new Usuario($_POST);
        $usuario::VerificarToken($token);

        $errores=$usuario::getErrores();

        if(empty($errores)){
            $usuarios=$usuario->ObtenerUsuariosFiltrados();
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
        $usuario::verificarAdmin();
        $errores=$usuario->validarNuevo();

        if(empty($errores)){

            //Verificar si el usuario no existe

            $usuario->existeUsuario(true);

            $errores=$usuario::getErrores();

            if(empty($errores)){
                //Hashear contraseña
                $usuario->hashearContra();

                //Crear Usuario
                $usuarios=$usuario->crearUsuario();
                $errores=$usuario::getErrores();

                if(empty($errores)){
                    $router->render('usuarios/usuarios',[
                        'usuarios'=>$usuarios
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

    public static function actualizarUsuario(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $usuario=new Usuario($_POST);
        
        $usuario::VerificarToken($token);
        $usuario::verificarAdmin();
        $errores=$usuario->validarNuevo(false);
        if(empty($errores)){
            //Hashear contraseña
            $usuario->hashearContra();

            $usuarios=$usuario->actualizarUsuario();
            $errores=$usuario::getErrores();
            if(empty($errores)){
                $router->render('usuarios/usuarios',[
                    'usuarios'=>$usuarios
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

    public static function eliminarUsuario(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        $usuario=new Usuario($_POST);
        
        $usuario::VerificarToken($token);
        $usuario::verificarAdmin();
        $usuario->verificarUsuarioActual();
        $errores=$usuario::getErrores();
        if(empty($errores)){
            $errores=$usuario->eliminarUsuario();

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