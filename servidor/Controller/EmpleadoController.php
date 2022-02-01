<?php
namespace Controller;


use MVC\Router;
use Model\Empleado;

class EmpleadoController{

    public static function obtenerEmpleados(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $empleado=new Empleado();

        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $empleados=$empleado->ObtenerEmpleados();
            $router->render('empleados/empleados',[
                'empleados'=>$empleados
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }
    public static function obtenerEmpleadosFiltrados(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $empleado=new Empleado($_POST);

        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $empleados=$empleado->ObtenerEmpleadosFiltrados();
            $router->render('empleados/empleados',[
                'empleados'=>$empleados
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function empleadosFiltrados(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $empleado=new Empleado($_POST);

        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $empleados=$empleado->empleadosFiltrados();
            $router->render('empleados/empleados',[
                'empleados'=>$empleados
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function empleadosFiltradosUbicacion(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $empleado=new Empleado($_POST);

        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $empleados=$empleado->empleadosFiltradosUbicacion();
            $router->render('empleados/empleados',[
                'empleados'=>$empleados
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function obtenerEmpleadosDetalle(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);

        $empleado=new Empleado($_POST);

        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $empleados=$empleado->ObtenerEmpleadosDetalles();
            $router->render('empleados/empleados',[
                'empleados'=>$empleados
            ]);
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function actualizarEmpleados(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $empleado=new Empleado($_POST);
        $empleado::VerificarToken($token);

        $errores=$empleado->validar(false);

        if(empty($errores)){
            $empleados=$empleado->editarEmpleado();
            $errores=$empleado->getErrores();

            if(empty($errores)){
                $router->render('empleados/empleados',[
                    'empleados'=>$empleados
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

    public static function insertarUsuarios(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $empleado=new Empleado($_POST);
        $empleado::VerificarToken($token);

        $errores=$empleado->validar();

        if(empty($errores)){
            $empleados=$empleado->nuevosEmpleados();
            $errores=$empleado->getErrores();
            if(empty($errores)){
                $router->render('empleados/empleados',[
                    'empleados'=>$empleados
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

    public static function eliminarEmpleado(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $empleado=new Empleado($_POST);
        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $errores=$empleado->eliminarEmpleado();
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

    public static function ObtenerDetalleEmpleado(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $empleado=new Empleado($_POST);
        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $empleados=$empleado->leerEmpleadoDetalles();
            $errores=$empleado::getErrores();
            if(empty($errores)){
                $router->render('empleados/empleados',[
                    'empleados'=>$empleados
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

    public static function ObtenerDetallesEmpleadosLotes(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        $token=str_replace("token=","",$query);
        
        $empleado=new Empleado($_POST);
        $empleado::VerificarToken($token);
        $errores=$empleado::getErrores();

        if(empty($errores)){
            $empleados=$empleado->leerEmpleadoDetallesLotes();
            $errores=$empleado::getErrores();
            if(empty($errores)){
                $router->render('empleados/empleados',[
                    'empleados'=>$empleados
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