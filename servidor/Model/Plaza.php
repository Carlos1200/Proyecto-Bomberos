<?php

namespace Model;
use \PDO;


class Plaza extends ActiveRecord{

    protected static $tabla = 'plazaNominal';
    protected static $columnasDB=['idPlaza','nombrePlaza'];
    public $idPlaza;
    public $nombrePlaza;
    
    public function __construct($args=[])
    {
        $this->idPlaza=$args['idPlaza']??null;
        $this->nombrePlaza=$args['nombrePlaza']??'';
    }

    public function validar()
    {
        if(!$this->nombrePlaza){
            self::$errores[]="El Nombre de la plaza es obligatorio";
        }
        return self::$errores;
    }

    public function existePlaza(){
        $query="SELECT * FROM ".self::$tabla. " WHERE nombrePlaza = :nombrePlaza";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombrePlaza',$this->nombrePlaza,PDO::PARAM_STR);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);

        if($resultado){
           self::$errores[]="La Plaza ya existe"; 
        }
    }

    public function nuevaPlaza(){
        $query="INSERT INTO ".self::$tabla. "(nombrePlaza) VALUES(:nombrePlaza)";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombrePlaza',$this->nombrePlaza,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar una nueva plaza";
        }

        return self::$errores;
    }

}

?>