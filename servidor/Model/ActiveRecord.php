<?php


class ActiveRecord{
    protected static $db;
    protected static $tabla='';
    protected static $columnasDB=[];

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

}


