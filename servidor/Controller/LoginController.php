<?php



class LoginController{
    public static function login(){
        var_dump($_POST);
    }
    public static function logout(){
        echo "LogOut";
    }
}