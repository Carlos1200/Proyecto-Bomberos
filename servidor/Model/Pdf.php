<?php
namespace Model;
 



class PDF extends ActiveRecord{
    //Obteniendo propiedades de la clase pdf

    public function obtenerAutorizacion($id){
        if(is_null($id)){
            self::$errores[]="No se ha enviado el id";
        }else{
            $query="SELECT * FROM autorizaciones WHERE idAutorizaciones=:id";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(":id",$id);
            $consulta->execute();
            $resultado=$consulta->fetchAll(\PDO::FETCH_ASSOC);
            if(!$resultado){
                self::$errores[]="No se ha encontrado la autorización";
            }else{
                return $resultado['0'];
            }
        }            
    }
}



?>