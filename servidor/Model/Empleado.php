<?php

namespace Model;
use \PDO;

class Empleado extends ActiveRecord{
    protected static $tabla = 'empleado';
    protected static $columnasDB=['idEmpleado','nombres','apellidos','salarioNormal','idGrupo','idPension','idUbicacion','idPlaza','fechaCreacionEmpleado'];
    public $idEmpleado;
    public $nombres;
    public $apellidos;
    public $salarioNormal;
    public $idGrupo;
    public $idPension;
    public $idUbicacion;
    public $idPlaza;
    public $fechaCreacionEmpleado;
    
    public function __construct($args=[])
    {
        $this->idEmpleado=$args['idEmpleado']??null;
        $this->nombres=$args['nombres']??'';
        $this->apellidos=$args['apellidos']??'';
        $this->salarioNormal=$args['salarioNormal']??'';
        $this->idGrupo=$args['idGrupo']??'';
        $this->idPension=$args['idPension']??'';
        $this->idUbicacion=$args['idUbicacion']??'';
        $this->idPlaza=$args['idPlaza']??'';
        $this->fechaCreacionEmpleado=$args['fechaCreacionEmpleado']??'';
    }

    public function validar($nuevo=true)
    {
        if(!$nuevo){
            if(!$this->nombres){
                self::$errores[]="El Nombre del empleado es obligatorio";
            }
        }
        if(!$this->nombres){
            self::$errores[]="El Nombre del empleado es obligatorio";
        }
        if(!$this->apellidos){
            self::$errores[]="El apellido del empleado es obligatorio";
        }
        if(!$this->salarioNormal){
            self::$errores[]="El salario del empleado es obligatorio";
        }
        if(!$this->idGrupo){
            self::$errores[]="El grupo del empleado es obligatorio";
        }
        if(!$this->idPension){
            self::$errores[]="La pensión del empleado es obligatorio";
        }
        if(!$this->idUbicacion){
            self::$errores[]="La ubicación del empleado es obligatorio";
        }
        if(!$this->idPlaza){
            self::$errores[]="La plaza del empleado es obligatorio";
        }
        if(!$this->fechaCreacionEmpleado){
            self::$errores[]="La fecha de creación del empleado es obligatorio";
        }
        return self::$errores;
    }

    public function ObtenerEmpleados(){
        $query="EXEC leerEmpleadoAdmin";
        $consulta=self::$db->prepare($query);
        $consulta->execute();
        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);

        return $datos;
    }

    public function editarEmpleado(){
        $query="EXEC actualizarEmpleado ";
    }
    
}


?>