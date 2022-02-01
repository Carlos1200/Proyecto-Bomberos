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
    public $nombreUbicacion;
    public $idPlaza;
    public $fechaCreacionEmpleado;
    public $selectTop;
    
    public function __construct($args=[])
    {
        $this->idEmpleado=$args['idEmpleado']??null;
        $this->nombres=$args['nombres']??'';
        $this->apellidos=$args['apellidos']??'';
        $this->salarioNominal=$args['salarioNominal']??'';
        $this->idGrupo=$args['idGrupo']??'';
        $this->idPension=$args['idPension']??'';
        $this->idUbicacion=$args['idUbicacion']??'';
        $this->nombreUbicacion=$args['nombreUbicacion']??'';
        $this->idPlaza=$args['idPlaza']??'';
        $this->fechaCreacionEmpleado=$args['fechaCreacionEmpleado']??'';
        $this->selectTop=$args['selectTop']??'';
    }

    public function validar($nuevo=true)
    {
        if(!$nuevo){
            if(!$this->idEmpleado){
                self::$errores[]="El id del empleado es obligatorio";
            }
        }
        if(!$this->nombres){
            self::$errores[]="El Nombre del empleado es obligatorio";
        }
        if(!$this->apellidos){
            self::$errores[]="El apellido del empleado es obligatorio";
        }
        if(!$this->salarioNominal){
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
        if($nuevo){
            if(!$this->fechaCreacionEmpleado){
                self::$errores[]="La fecha de creación del empleado es obligatorio";
            }
            if(!$this->selectTop){
                self::$errores[]="La cantidad de empleados es obligatoria";
            }
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

    public function ObtenerEmpleadosFiltrados(){
        $query="EXEC leerEmpleadoJefe :nombreUbicacion";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombreUbicacion',$this->nombreUbicacion,PDO::PARAM_STR);
        $consulta->execute();
        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $datos;
    }

    public function empleadosFiltrados(){
        $query="EXEC busquedaEmpleados :nombres";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombres',$this->nombres,PDO::PARAM_STR);
        $consulta->execute();
        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $datos;
    }

    public function empleadosFiltradosUbicacion(){
        if(!$this->nombreUbicacion){
            self::$errores[]="La ubicación es obligatoria";
        }else{
            $query="EXEC busquedaEmpleadosJefe :nombres, :nombreUbicacion";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':nombres',$this->nombres,PDO::PARAM_STR);
            $consulta->bindParam(':nombreUbicacion',$this->nombreUbicacion,PDO::PARAM_STR);
            $consulta->execute();
            $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $datos;
        }
    }

    public function ObtenerEmpleadosDetalles(){
        $query="EXEC leerEmpleadoJefe :idEmpleado";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idEmpleado',$this->idEmpleado,PDO::PARAM_STR);
        $consulta->execute();
        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $datos;
    }

    public function editarEmpleado(){
        $query="EXEC actualizarEmpleado :idEmpleado, :nombres, :apellidos, :salarioNominal, :idGrupo, :idPension, :idUbicacion, :idPlaza";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idEmpleado',$this->idEmpleado,PDO::PARAM_STR);
        $consulta->bindParam(':nombres',$this->nombres,PDO::PARAM_STR);
        $consulta->bindParam(':apellidos',$this->apellidos,PDO::PARAM_STR);
        $consulta->bindParam(':salarioNominal',$this->salarioNominal,PDO::PARAM_STR);
        $consulta->bindParam(':idGrupo',$this->idGrupo,PDO::PARAM_STR);
        $consulta->bindParam(':idPension',$this->idPension,PDO::PARAM_STR);
        $consulta->bindParam(':idUbicacion',$this->idUbicacion,PDO::PARAM_STR);
        $consulta->bindParam(':idPlaza',$this->idPlaza,PDO::PARAM_STR);
        $consulta->execute();
        
        //Consultar empleado Actualizado
        $query="EXEC vistaEmpleadoId :idEmpleado";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':idEmpleado',$this->idEmpleado,PDO::PARAM_STR);
        $consulta->execute();
        $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $datos;
    }

    public function nuevosEmpleados(){
        $query="EXEC insertarEmpleados :nombres, :apellidos, :salarioNominal, :idGrupo, :idPension, :idUbicacion, :idPlaza, :fechaCreacionEmpleado";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':nombres',$this->nombres,PDO::PARAM_STR);
        $consulta->bindParam(':apellidos',$this->apellidos,PDO::PARAM_STR);
        $consulta->bindParam(':salarioNominal',$this->salarioNominal,PDO::PARAM_STR);
        $consulta->bindParam(':idGrupo',$this->idGrupo,PDO::PARAM_STR);
        $consulta->bindParam(':idPension',$this->idPension,PDO::PARAM_STR);
        $consulta->bindParam(':idUbicacion',$this->idUbicacion,PDO::PARAM_STR);
        $consulta->bindParam(':idPlaza',$this->idPlaza,PDO::PARAM_STR);
        $consulta->bindParam(':fechaCreacionEmpleado',$this->fechaCreacionEmpleado,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar nuevos usuarios";
            return null;
        }else{
            $query="EXEC vistaUltimoEmpleado :selectTop";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':selectTop',$this->selectTop,PDO::PARAM_INT);
            $consulta->execute();
            $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $datos;
        }

        return self::$errores;
    }

    public function eliminarEmpleado(){
        if($this->idEmpleado){
            $query="EXEC eliminarEmpleado :idEmpleado";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':idEmpleado',$this->idEmpleado,PDO::PARAM_INT);
            $consulta->execute();


        }else{
            self::$errores[]="El id del empleado es obligatorio";
        }

        return self::$errores;
    }

    public function leerEmpleadoDetalles(){
        
        if($this->idEmpleado){
            $query="EXEC leerEmpleadoDetalles :idEmpleado";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':idEmpleado',$this->idEmpleado,PDO::PARAM_INT);
            $consulta->execute();
            $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $datos;
        }else{
            self::$errores[]="El id del empleado es obligatorio";
        }

    }

    public function leerEmpleadoDetallesLotes(){
        
        if($this->idEmpleado){
            $query="EXEC leerVariosEmpleadosDetalles :idEmpleado";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(':idEmpleado',$this->idEmpleado,PDO::PARAM_STR);
            $consulta->execute();
            $datos=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $datos;
        }else{
            self::$errores[]="El id del empleado es obligatorio";
        }

    }
    
}


?>