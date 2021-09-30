<?php

namespace Controller;

use MVC\Router;
use Model\Usuario;

class UsuarioController{
    public static function obtenerUsuarios(Router $router){
    
        $usuarios=Usuario::all();
        $router->render('usuarios/usuarios',[
            'usuarios'=>$usuarios
        ]);
    }
}

?>