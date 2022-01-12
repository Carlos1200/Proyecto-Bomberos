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

    public function validar($nuevo=true)
    {
        if(!$nuevo){
            if(!$this->idPlaza){
                self::$errores[]="El id de la plaza es obligatorio";
            }
        }
        if(!$this->nombrePlaza){
            self::$errores[]="El Nombre de la plaza es obligatorio";
        }
        return self::$errores;
    }

    public function obtenerPlazas(){
        $query="EXEC leerPlaza";
        $consulta=self::$db->prepare($query);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $resultado;
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
        $query="EXEC insertarPlaza :nombrePlaza";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombrePlaza',$this->nombrePlaza,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar una nueva plaza";
            return null;
        }else{
            $query="SELECT top (1) nombrePlaza, idPlaza from plazaNominal order by idPlaza desc";
            $consulta=self::$db->prepare($query);
            $consulta->execute();
            $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $datos;
        }

        
    }

    public function plazaFiltro(){ 
        $query="EXEC busquedaPlazas :nombrePlaza";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombrePlaza',$this->nombrePlaza,PDO::PARAM_STR);
        $consulta->execute();

        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);

        return $datos;
    }

    public function editarPlaza(){
        $query="EXEC actualizarPlaza :idPlaza, :nombrePlaza";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idPlaza',$this->idPlaza,PDO::PARAM_INT);
        $consulta->bindParam(':nombrePlaza',$this->nombrePlaza,PDO::PARAM_STR);
        $consulta->execute();

        $query="SELECT * FROM plazaNominal WHERE idPlaza = :idPlaza";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idPlaza',$this->idPlaza,PDO::PARAM_INT);
        $consulta->execute();
        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);

        return $datos;
    }

    public function eliminarPlaza(){
        if($this->idPlaza){
            $query="EXEC eliminarPlaza :idPlaza";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':idPlaza',$this->idPlaza,PDO::PARAM_INT);
            $consulta->execute();

            if(!self::$db->rowCount() > 0){
                self::$errores[]="No se Elimino la Plaza";
            }

        }else{
            self::$errores[]="El id de la Plaza es obligatorio";
        }

        return self::$errores;
    }

}

?>