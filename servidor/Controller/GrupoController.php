<?php
namespace Controller;

include_once "cors.php";
use MVC\Router;
use Model\Grupo;

class GrupoController{


    public static function nuevoGrupo(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $grupo=new Grupo($_POST);
        $grupo::VerificarToken($token);
        $errores=$grupo->validar();

        if(empty($errores)){
            //Validar que no exista otra grupo igual
            $grupo->existeGrupo();

            $errores=$grupo::getErrores();

            if(empty($errores)){
                //Crear grupo
                $errores=$grupo->nuevoGrupo();

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

    public static function obtenerGrupos(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $grupo=new Grupo();

        $grupo::VerificarToken($token);

        $errores=$grupo::getErrores();

        if(empty($errores)){
            $grupos=$grupo->obtenerGrupos();
            $router->render('grupo/grupo',[
                'grupos'=>$grupos
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function actualizarGrupo(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $grupo=new Grupo($_POST);

        $grupo::VerificarToken($token);
        $grupo->validar(false);

        $errores=$grupo::getErrores();

        if(empty($errores)){
            $grupo->editarGrupo();
            $errores=$grupo::getErrores();
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

    public static function eliminarGrupo(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $grupo=new Grupo($_POST);

        $grupo::VerificarToken($token);

        $errores=$grupo::getErrores();

        if(empty($errores)){
            $grupo->eliminarGrupo();
            $errores=$grupo::getErrores();
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