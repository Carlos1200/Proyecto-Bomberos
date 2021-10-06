<?php

namespace Model;
use \PDO;


class Pension extends ActiveRecord{

    protected static $tabla = 'tipoPension';
    protected static $columnasDB=['idPension','nombrePension'];
    public $idPension;
    public $nombrePension;
    
    public function __construct($args=[])
    {
        $this->idPension=$args['idPension']??null;
        $this->nombrePension=$args['nombrePension']??'';
    }

    public function validar()
    {
        if(!$this->nombrePension){
            self::$errores[]="El Nombre de la Pensión es obligatorio";
        }
        return self::$errores;
    }

    public function existePension(){
        $query="SELECT * FROM ".self::$tabla. " WHERE nombrePension = :nombrePension";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombrePension',$this->nombrePension,PDO::PARAM_STR);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);

        if($resultado){
           self::$errores[]="La Pensión ya existe"; 
        }
    }

    public function nuevaPension(){
        $query="INSERT INTO ".self::$tabla. "(nombrePension) VALUES(:nombrePension)";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombrePension',$this->nombrePension,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar una nueva pensión";
        }

        return self::$errores;
    }

}

?>