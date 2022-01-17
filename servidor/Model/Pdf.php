<?php
namespace Model;

use PDO;

class PDF extends ActiveRecord{
    //Obteniendo propiedades de la clase pdf

    public function obtenerAutorizacion($id){
        if(is_null($id)){
            self::$errores[]="No se ha enviado el id";
        }else{
            $query="EXEC imprimirAutorizaciones :id";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(":id",$id,PDO::PARAM_STR);
            $consulta->execute();
            $resultado=$consulta->fetchAll(\PDO::FETCH_ASSOC);
            if(!$resultado){
                self::$errores[]="No se ha encontrado la autorización";
            }else{
                return $resultado['0'];
            }
        }            
    }

    public function obtenerMes($mes=01){
        $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        return $meses[$mes-1];
        
    }
}



?>