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

    public function validar($nuevo=true)
    {
        if(!$nuevo){
            if(!$this->idGrupo){
                self::$errores[]="El id de la plaza es obligatorio";
            }
        }
        if(!$this->nombreGrupo){
            self::$errores[]="El Nombre de la plaza es obligatorio";
        }
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

    public function EditarGrupo(){
        $query="EXEC actualizarGrupo :idGrupo, :nombreGrupo";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreGrupo',$this->nombreGrupo,PDO::PARAM_STR);
        $consulta->bindParam(':idGrupo',$this->idGrupo,PDO::PARAM_INT);
        $consulta->execute();

        if(!self::$db->rowCount()>0){
            self::$errores[]="No se pudo editar el grupo";
        }

        return self::$errores;
    }

    public function grupoFiltro(){ 
        $query="EXEC busquedaGrupos :nombreGrupo";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreGrupo',$this->nombreGrupo,PDO::PARAM_STR);
        $consulta->execute();

        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);

        return $datos;
    }

    public function nuevoGrupo(){
        $query="EXEC insertarGrupo :nombreGrupo";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreGrupo',$this->nombreGrupo,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar un nuevo Grupo";
            return null;
       }else{
            $query="SELECT top (1) nombreGrupo, idGrupo from grupos order by idGrupo desc";
            $consulta=self::$db->prepare($query);
            $consulta->execute();
            $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $datos;
       }
    }

    public function obtenerGrupos(){
        $query="EXEC leerGrupo";
        $consulta=self::$db->prepare($query);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
    }

    public function eliminarGrupo(){
        if($this->idGrupo){
        $query="EXEC eliminarGrupo :idGrupo";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idGrupo',$this->idGrupo,PDO::PARAM_INT);
        $consulta->execute();

        }else{
            self::$errores[]="El id del grupo es obligatorio";
        }
        return self::$errores;
    }
}


?>