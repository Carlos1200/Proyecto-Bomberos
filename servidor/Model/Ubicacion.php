<?php

namespace Model;
use \PDO;

class Ubicacion extends ActiveRecord{

    protected static $tabla = 'ubicacionEmpleado';
    protected static $columnasDB=['idUbicacion','nombreUbicacion'];
    public $idUbicacion;
    public $nombreUbicacion;

    public function __construct($args=[])
    {
        $this->idUbicacion=$args['idUbicacion']??null;
        $this->nombreUbicacion=$args['nombreUbicacion']??'';
    }

    public function validar()
    {
        if(!$this->nombreUbicacion){
            self::$errores[]="El Nombre de la ubicación es obligatorio";
        }
        return self::$errores;
    }

    public function existeUbicacion(){
        $query="SELECT * FROM ".self::$tabla. " WHERE nombreUbicacion = :nombreUbicacion";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreUbicacion',$this->nombreUbicacion,PDO::PARAM_STR);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);

        if($resultado){
           self::$errores[]="La ubicación ya existe"; 
        }
    }

    public function nuevaUbicacion(){
        $query="INSERT INTO ".self::$tabla. "(nombreUbicacion) VALUES(:nombreUbicacion)";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreUbicacion',$this->nombreUbicacion,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar una nueva Ubicacion";
        }

        return self::$errores;
    }

    
}

?>