<?php

require('Model/Usuario.php');

class UsuarioController{
    public static function obtenerUsuarios(Router $router){
    
        $usuarios=Usuario::all();
        $router->render('usuarios/usuarios',[
            'usuarios'=>$usuarios
        ]);
    }
}

?>