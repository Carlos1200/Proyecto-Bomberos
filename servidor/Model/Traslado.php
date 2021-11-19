<?php

    namespace Model;
    use \PDO;

    class Traslado extends ActiveRecord{

        public $plazaAnterior;
        public $plazaActual;
        public $ubicacionAnterior;
        public $ubicacionActual;
        public $grupoAnterior;
        public $grupoActual;
        public $fechaCambio;
        public $descripcion;
        public $fechaCreacion;

        public $idTraslado;
        public $tituloHistorial;
        public $idHistorialTraslados;
        public $idEmpleados;

        public function __construct($args=[]){
            $this->plazaAnterior=$args['plazaAnterior']??'';
            $this->plazaActual=$args['plazaActual']??'';
            $this->ubicacionAnterior=$args['ubicacionAnterior']??'';
            $this->ubicacionActual=$args['ubicacionActual']??'';
            $this->grupoAnterior=$args['grupoAnterior']??'';
            $this->grupoActual=$args['grupoActual']??'';
            $this->fechaCambio=$args['fechaCambio']??'';
            $this->descripcion=$args['descripcion']??'';
            $this->fechaCreacion=$args['fechaCreacion']??'';
            $this->tituloHistorial=$args['tituloHistorial']??'';
            $this->idHistorialTraslados=$args['idHistorialTraslados']??'';
            $this->idEmpleados=$args['idEmpleados']??'';
        }

        public function validar(){
            
            if(!$this->plazaAnterior){
                self::$errores[]="La plaza anterior es obligatoria";
            }
            if(!$this->plazaActual){
                self::$errores[]="La plaza actual es obligatoria";
            }
            if(!$this->ubicacionAnterior){
                self::$errores[]="La ubicación anterior es obligatoria";
            }
            if(!$this->ubicacionActual){
                self::$errores[]="La ubicación actual es obligatoria";
            }
            if(!$this->grupoAnterior){
                self::$errores[]="El grupo anterior es obligatorio";
            }
            if(!$this->grupoActual){
                self::$errores[]="El grupo actual es obligatorio";
            }
            if(!$this->fechaCambio){
                self::$errores[]="La fecha de cambio es obligatoria";
            }
            if(!$this->descripcion){
                self::$errores[]="La descripción es obligatoria";
            }
            if(!$this->fechaCreacion){
                self::$errores[]="La fecha de creación es obligatoria";
            }
            if(!$this->tituloHistorial){
                self::$errores[]="El titulo de historial es obligatorio";
            }
            if(!$this->idHistorialTraslados){
                self::$errores[]="El id historial de traslados es obligatorio";
            }
            if(!$this->idEmpleados){
                self::$errores[]="Los id de traslados son obligatorios";
            }
            return self::$errores;
        }

        public function crearTraslado(){
            $sql="EXEC insertarHistorialTrasladosLotes :plazaAnterior,:plazaActual,:ubicacionAnterior,:ubicacionActual,:grupoAnterior,:grupoActual,:fechaCambio,:descripcion,:fechaCreacion";
            $query=self::$db->prepare($sql);
            $query->bindValue(":plazaAnterior",$this->plazaAnterior,PDO::PARAM_STR);
            $query->bindValue(":plazaActual",$this->plazaActual,PDO::PARAM_STR);
            $query->bindValue(":ubicacionAnterior",$this->ubicacionAnterior,PDO::PARAM_STR);
            $query->bindValue(":ubicacionActual",$this->ubicacionActual,PDO::PARAM_STR);
            $query->bindValue(":grupoAnterior",$this->grupoAnterior,PDO::PARAM_STR);
            $query->bindValue(":grupoActual",$this->grupoActual,PDO::PARAM_STR);
            $query->bindValue(":fechaCambio",$this->fechaCambio,PDO::PARAM_STR);
            $query->bindValue(":descripcion",$this->descripcion,PDO::PARAM_STR);
            $query->bindValue(":fechaCreacion",$this->fechaCreacion,PDO::PARAM_STR);
            $query->execute();
            
            if(!self::$db->lastInsertId()>0){
                self::$errores[]="No se pudo agregar los traslados";
            }else{
                $this->idTraslado=self::$db->lastInsertId();
            }
    
            return self::$errores;
        }

        public function crearTrasladoIndividual(){
            $idReporteHistorial='';

            for($i=1;$i<=$this->idHistorialTraslados;$i++){
                if($i==1){
                    $idReporteHistorial.=$this->idTraslado;
                }else{
                    $idReporteHistorial.=','.$this->idTraslado;
                }
            }

            $sql="EXEC ingresarReportesdeHistorial :idReporteHistorial,:tituloHistorial,:idHistorialTraslados,:idEmpleados";
            $query=self::$db->prepare($sql);
            $query->bindValue(":idReporteHistorial",$idReporteHistorial,PDO::PARAM_STR);
            $query->bindValue(":tituloHistorial",$this->tituloHistorial,PDO::PARAM_STR);
            $query->bindValue(":idHistorialTraslados",$this->idHistorialTraslados,PDO::PARAM_STR);
            $query->bindValue(":idEmpleados",$this->idEmpleados,PDO::PARAM_STR);
            $query->execute();
            
            if(!self::$db->lastInsertId()>0){
                self::$errores[]="No se pudo agregar los traslados";
            }

            return self::$errores;
        }

    }

?>