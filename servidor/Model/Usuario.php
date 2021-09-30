<?php

namespace Model;
use \PDO;

class Usuario extends ActiveRecord{

    protected static $tabla = 'Usuarios';
    protected static $columnasDB=['idUsuario','NombreUsuario','tipoUsuario','contra'];
    public $idUsuario;
    public $NombreUsuario;
    public $tipoUsuario;
    public $contra;

    public function __construct($args=[])
    {
        $this->idUsuario=$args['idUsuario']??null;
        $this->NombreUsuario=$args['NombreUsuario']??'';
        $this->tipoUsuario=$args['tipoUsuario']??'';
        $this->contra=$args['contra']??'';
    }

    public function existeUsuario(){
        $query= "SELECT * FROM ". self::$tabla. " WHERE NombreUsuario = :NombreUsuario";

        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':NombreUsuario',$this->NombreUsuario,PDO::PARAM_STR);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);
        if(!$resultado){
            self::$errores[]="No existe Usuario";
        }else{
            $this->idUsuario=$resultado[0]['idUsuario'];
            $this->NombreUsuario=$resultado[0]['NombreUsuario'];
            $this->tipoUsuario=$resultado[0]['tipoUsuario'];
            $this->contra=[];
        }
        
    }

    public static function getErrores(){
        return self::$errores;
    }

    public function validar()
    {
        if(!$this->NombreUsuario){
            self::$errores[]="El usuario es obligatorio";
        }
        if(!$this->contra){
            self::$errores[]="La contraseña es obligatoria";
        }

        return self::$errores;
    }


    public function autenticar(){
        session_start();
        //LLenar el arreglo de session
        $_SESSION['idUsuario']=$this->idUsuario;
        $_SESSION['NombreUsuario']=$this->NombreUsuario;
        $_SESSION['tipoUsuario']=$this->tipoUsuario;
        $_SESSION['login']=true;

        return($_SESSION);
    }

    public function cerrarSesion(){
        session_start();
        $_SESSION=[];
        return($_SESSION);
    }

    public function verificarSesion(){
        session_start();
        return($_SESSION);
    }

    public function atributos(){
        $atributos=[];
        foreach(self::$columnasDB as $columna){
            $atributos[$columna]=$this->$columna;
        }
        return $atributos;
    }


  
}