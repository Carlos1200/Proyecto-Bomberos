<?php

namespace Model;
use \PDO;

class Usuario extends ActiveRecord{

    protected static $tabla = 'usuarios';
    protected static $columnasDB=['idUsuario','NombreUsuario','tipoUsuario','contra',"UbicacionUsuario"];
    public $idUsuario;
    public $NombreUsuario;
    public $tipoUsuario;
    public $UbicacionUsuario;
    public $contra;
    public $token;

    public function __construct($args=[])
    {
        $this->idUsuario=$args['idUsuario']??null;
        $this->NombreUsuario=$args['NombreUsuario']??'';
        $this->tipoUsuario=$args['tipoUsuario']??'';
        $this->UbicacionUsuario=$args['UbicacionUsuario']??'';
        $this->contra=$args['contra']??'';
    }

    public function existeUsuario($nuevo=false){
        $query= "SELECT * FROM ". self::$tabla. " WHERE NombreUsuario = :NombreUsuario";

        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':NombreUsuario',$this->NombreUsuario,PDO::PARAM_STR);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);
        if(!$resultado){
            if($nuevo){
                return false;
            }else{
                self::$errores[]="No existe Usuario";
            }
        }else{
            if($nuevo){
                self::$errores[]="El usuario ya existe";
            }else{
                $this->idUsuario=$resultado[0]['idUsuario'];
                $this->NombreUsuario=$resultado[0]['NombreUsuario'];
                $this->tipoUsuario=$resultado[0]['tipoUsuario'];
                $this->UbicacionUsuario=$resultado[0]['UbicacionUsuario'];
            }
        }
        
    }



    public static function hash($password) {
        return hash('sha512', $_ENV['SALT'] . $password);
    }
    public static function verificarContra($password, $hash) {
        return ($hash == self::hash($password));
    }

    public function hashearContra(){
        if($this->contra){
            $contraHasheada=self::hash($this->contra);
            $this->contra=(binary)$contraHasheada;
        }else{
            $this->contra="";
        }
    }

    public function ComprobarContra(){
        $query= "SELECT contra FROM ". self::$tabla. " WHERE NombreUsuario = :NombreUsuario";

        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':NombreUsuario',$this->NombreUsuario,PDO::PARAM_STR);
        $consulta->execute();
        $resultado=$consulta->fetchAll(PDO::FETCH_ASSOC);

        if(!$resultado){
            self::$errores[]="Ocurrió un error";
        }else{
            if(!$this->verificarContra($this->contra,$resultado[0]['contra'])){
                self::$errores[]="Contraseña o Usuario Incorrecto";
            }
        }
    }
    
    public function crearUsuario(){
        $query="EXEC insertarUsuarios :NombreUsuario, :tipoUsuario, :contra, :UbicacionUsuario";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':NombreUsuario',$this->NombreUsuario,PDO::PARAM_STR);
        $consulta->bindParam(':tipoUsuario',$this->tipoUsuario,PDO::PARAM_STR);
        $consulta->bindParam(':contra',$this->contra,PDO::PARAM_STR);
        $consulta->bindParam(':UbicacionUsuario',$this->UbicacionUsuario,PDO::PARAM_STR);
        $consulta->execute();
        
        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar un nuevo usuario";
        }

    }

    public function actualizarUsuario(){
        $query="EXEC actualizarUsuarios :idUsuario, :NombreUsuario, :tipoUsuario, :contra, :UbicacionUsuario";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idUsuario',$this->idUsuario,PDO::PARAM_INT);
        $consulta->bindParam(':NombreUsuario',$this->NombreUsuario,PDO::PARAM_STR);
        $consulta->bindParam(':tipoUsuario',$this->tipoUsuario,PDO::PARAM_STR);
        $consulta->bindParam(':contra',$this->contra,PDO::PARAM_STR);
        $consulta->bindParam(':UbicacionUsuario',$this->UbicacionUsuario,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->rowCount() > 0){
            self::$errores[]="No se pudo actualizar el usuario";
        }

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

    public function validarNuevo($nuevo=true){
        if(!$nuevo){
            if(!$this->idUsuario){
                self::$errores[]="El id es obligatorio";
            }
        }
        if(!$this->NombreUsuario){
            self::$errores[]="El usuario es obligatorio";
        }
        if($nuevo){
            if(!$this->contra){
                self::$errores[]="La contraseña es obligatoria";
            }
        }
        if(!$this->tipoUsuario){
            self::$errores[]="El tipo de usuario es obligatorio";
        }
        if(!$this->UbicacionUsuario){
            self::$errores[]="La ubicación es obligatoria";
        }

        return self::$errores;
    }

    public function autenticar(){
        session_start();
        //LLenar el arreglo de session
        $_SESSION['idUsuario']=$this->idUsuario;
        $_SESSION['NombreUsuario']=$this->NombreUsuario;
        $_SESSION['tipoUsuario']=$this->tipoUsuario;
        $_SESSION['UbicacionUsuario']=$this->UbicacionUsuario;
        $_SESSION['login']=true;

        return($_SESSION);
    }

    public function verificarUsuarioActual(){
        if($_SESSION['idUsuario']===$this->idUsuario){
            self::$errores[]="No se puede eliminar Usuario Actual";
        }
    }

    public function eliminarUsuario(){

        if($this->idUsuario){

            $query="EXEC eliminarUsuarios :idUsuario";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':idUsuario',$this->idUsuario,PDO::PARAM_INT);
            $consulta->execute();

            if(!self::$db->rowCount() > 0){
                self::$errores[]="No se pudo Eliminar el usuario";
            }
        }else{
            self::$errores[]="El id es obligatorio";
        }

        return self::$errores;
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