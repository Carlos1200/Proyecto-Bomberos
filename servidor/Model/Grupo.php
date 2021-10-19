<?php

namespace Model;
use \PDO;

class Grupo extends ActiveRecord{
    protected static $tabla = 'grupos';
    protected static $columnasDB=['idGrupo','nombreGrupo'];
    public $idGrupo;
    public $nombreGrupo;
    
    public function __construct($args=[])
    {
        $this->idGrupo=$args['idGrupo']??null;
        $this->nombreGrupo=$args['nombreGrupo']??'';
    }

    public function validar()
    {
        if(!$this->nombreGrupo){
            self::$errores[]="El Nombre del Grupo es obligatorio";
        }
        return self::$errores;
    }

    public function existeGrupo(){
        $query="SELECT * FROM ".self::$tabla. " WHERE nombreGrupo = :nombreGrupo";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreGrupo',$this->nombreGrupo,PDO::PARAM_STR);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);

        if($resultado){
           self::$errores[]="El Grupo ya existe"; 
        }
    }

    public function nuevoGrupo(){
        $query="INSERT INTO ".self::$tabla. "(nombreGrupo) VALUES(:nombreGrupo)";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreGrupo',$this->nombreGrupo,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar un nuevo Grupo";
        }

        return self::$errores;
    }
}


?>