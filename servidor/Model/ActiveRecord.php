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

    public static function insert(){
        
    }

    public static function VerificarToken($tokenAPI){
        $token=$_ENV['API_KEY'];

        if($token!==$tokenAPI){
            self::$errores[]="El token no es válido";
        }
    }

    // public static function sanitizarAtributos($atributos){
    //     $sanitizado=[];

    //     foreach($atributos as $key =>$value){
    //         $sanitizado[$key]=self::$db->
    //     }
    // }


}