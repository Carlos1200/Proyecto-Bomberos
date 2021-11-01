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

    public function validar($nuevo=true)
    {
        if(!$nuevo){
            if(!$this->idUbicacion){
                self::$errores[]="El Nombre de la ubicación es obligatorio";
            }
        }
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

    public function editarUbicacion(){
        $query="EXEC actualizarUbicaciones :idUbicacion, :nombreUbicacion";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idUbicacion',$this->idUbicacion,PDO::PARAM_INT);
        $consulta->bindParam(':nombreUbicacion',$this->nombreUbicacion,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->rowCount()>0){
            self::$errores[]="No se pudo editar la Ubicacion";
        }

        return self::$errores;
    }

    public function eliminarUbicacion(){
        if($this->idUbicacion){
            $query="EXEC eliminarUbicaciones :idUbicacion";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':idUbicacion',$this->idUbicacion,PDO::PARAM_INT);
            $consulta->execute();

            if(!self::$db->rowCount() > 0){
                self::$errores[]="No se pudo eliminar la Ubicacion";
            }

        }else{
            self::$errores[]="El id de ubicación es obligatorio";
        }

        return self::$errores;
    }
}

?>