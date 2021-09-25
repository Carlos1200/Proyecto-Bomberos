<?php


require('Model/Usuario.php');

class LoginController{
    public static function login(){
        $usuario=new Usuario($_POST);

        
    }
    public static function logout(){
        echo "LogOut";
    }
}