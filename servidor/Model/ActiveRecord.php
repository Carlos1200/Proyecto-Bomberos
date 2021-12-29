<?php

namespace Model;
use \PDO;

class ActiveRecord{
    protected static $db;
    protected static $tabla='';
    protected static $salt='';
    protected static $columnasDB=[];
    protected static $errores=[];


    public static function setDB($database){
        self::$db=$database;
    }


    public static function all(){
        $query="SELECT * FROM " .static::$tabla;
        
        $consulta=self::$db->prepare($query);
        $consulta->execute();
        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);

        return $datos;
    }

    public static function getErrores(){
        return self::$errores;
    }

    public static function VerificarToken($tokenAPI){
        $token=$_ENV['API_KEY'];

        if(!$tokenAPI){
            self::$errores[]="No se ha enviado el token";
        }else if($token!==$tokenAPI){
            self::$errores[]="El token no es válido";
        }
    }

    public static function verificarAdmin(){
        session_start();
        if($_SESSION['tipoUsuario']!=="Administrador"){
            self::$errores[]="No tiene permisos para esta acción";
        }
    }


}