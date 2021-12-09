<?php

namespace Model;
use \PDO;

class Reportes extends ActiveRecord{

    public $minutosDiurnosNormales;
    public $minutosNocturnosNormales;
    public $valorMinuto;
    public $totalExtraDiurno;
    public $totalExtraNocturno;
    public $totalHorasExtras;
    public $minutosDiurnosAutorizados;
    public $minutosNocturnosAutorizados;
    public $minutosAutorizados;
    public $minutosDiurnosTotales;
    public $minutosNocturnosTotales;
    public $ISSSdescuento;
    public $IPSFAdescuento;
    public $AFPCRECERdescuento;
    public $AFPCONFIAdescuento;
    public $retencionRenta;
    public $totalDescuentos;
    public $sueldoparaISSS;
    public $Liquido;
    public $ISSSaporte;
    public $IPSFAaporte;
    public $AFPCRECERaporte;
    public $AFPCONFIAaporte;
    public $totalAportaciones;


    public $sueldoMasHorasExtras;
    public $totalAportHoras;
    public $idSelectTop;
    public $idEmpleados;

    public $usuarioJefe;
    public $ubicacionEstacion;
    public $sumatoriaHorasDiurnasNormales;
    public $sumatoriaHorasNocturnasNormales;
    public $sumatoriaHorasNormales;


    public function __construct($args=[]){
        $this->minutosDiurnosNormales=$args['minutosDiurnosNormales']??'';
        $this->minutosNocturnosNormales=$args['minutosNocturnosNormales']??'';
        $this->valorMinuto=$args['valorMinuto']??'';
        $this->totalExtraDiurno=$args['totalExtraDiurno']??'';
        $this->totalExtraNocturno=$args['totalExtraNocturno']??'';
        $this->totalHorasExtras=$args['totalHorasExtras']??'';
        $this->minutosDiurnosAutorizados=$args['minutosDiurnosAutorizados']??'';
        $this->minutosNocturnosAutorizados=$args['minutosNocturnosAutorizados']??'';
        $this->minutosAutorizados=$args['minutosAutorizados']??'';
        $this->minutosDiurnosTotales=$args['minutosDiurnosTotales']??'';
        $this->minutosNocturnosTotales=$args['minutosNocturnosTotales']??'';
        $this->ISSSdescuento=$args['ISSSdescuento']??'';
        $this->IPSFAdescuento=$args['IPSFAdescuento']??'';
        $this->AFPCRECERdescuento=$args['AFPCRECERdescuento']??'';
        $this->AFPCONFIAdescuento=$args['AFPCONFIAdescuento']??'';
        $this->retencionRenta=$args['retencionRenta']??'';
        $this->totalDescuentos=$args['totalDescuentos']??'';
        $this->sueldoparaISSS=$args['sueldoparaISSS']??'';
        $this->Liquido=$args['Liquido']??'';
        $this->ISSSaporte=$args['ISSSaporte']??'';
        $this->IPSFAaporte=$args['IPSFAaporte']??'';
        $this->AFPCRECERaporte=$args['AFPCRECERaporte']??'';
        $this->AFPCONFIAaporte=$args['AFPCONFIAaporte']??'';
        $this->totalAportaciones=$args['totalAportaciones']??'';

        $this->sueldoMasHorasExtras=$args['sueldoMasHorasExtras']??'';
        $this->totalAportHoras=$args['totalAportHoras']??'';
        $this->idSelectTop=$args['idSelectTop']??'';
        $this->idEmpleados=$args['idEmpleados']??'';

        $this->usuarioJefe=$args['usuarioJefe']??'';
        $this->ubicacionEstacion=$args['ubicacionEstacion']??'';
        $this->sumatoriaHorasDiurnasNormales=$args['sumatoriaHorasDiurnasNormales']??'';
        $this->sumatoriaHorasNocturnasNormales=$args['sumatoriaHorasNocturnasNormales']??'';
        $this->sumatoriaHorasNormales=$args['sumatoriaHorasNormales']??'';
    }

    public function validar($nuevo=true)
    {
        if(!$this->minutosDiurnosNormales){
            self::$errores[]="Los minutos diurnos normales son obligatorios";
        }

        if(!$this->minutosNocturnosNormales){
            self::$errores[]="Los minutos nocturnos normales son obligatorios";
        }

        if(!$this->valorMinuto){
            self::$errores[]="El valor minuto es obligatorio";
        }

        if(!$this->totalExtraDiurno){
            self::$errores[]="Los minutos extras diurnos son obligatorios";
        }

        if(!$this->totalExtraNocturno){
            self::$errores[]="Los minutos extras nocturnos son obligatorios";
        }

        if(!$this->totalHorasExtras){
            self::$errores[]="El total horas extras son obligatorios";
        }

        if(!$this->minutosDiurnosAutorizados){
            self::$errores[]="Los minutos diurnos autorizados son obligatorios";
        }

        if(!$this->minutosNocturnosAutorizados){
            self::$errores[]="Los minutos nocturnos autorizados son obligatorios";
        }

        if(!$this->minutosAutorizados){
            self::$errores[]="Los minutos autorizados son obligatorios";
        }

        if(!$this->minutosDiurnosTotales){
            self::$errores[]="Los minutos diurnos totales son obligatorios";
        }

        if(!$this->minutosNocturnosTotales){
            self::$errores[]="Los minutos nocturnos totales son obligatorios";
        }

        if(!$this->ISSSdescuento){
            self::$errores[]="El ISSS descuento es obligatoria";
        }

        if(!$this->IPSFAdescuento){
            self::$errores[]="El IPSFA descuento es obligatoria";
        }

        if(!$this->AFPCRECERdescuento){
            self::$errores[]="El AFP CRECER descuento es obligatoria";
        }

        if(!$this->AFPCONFIAdescuento){
            self::$errores[]="El AFP CONFIA descuento es obligatoria";
        }

        if(!$this->retencionRenta){
            self::$errores[]="La retencion Renta es obligatoria";
        }

        if(!$this->totalDescuentos){
            self::$errores[]="El total descuento es obligatoria";
        }

        if(!$this->sueldoparaISSS){
            self::$errores[]="El sueldo para ISSS es obligatorio";
        }

        if(!$this->Liquido){
            self::$errores[]="El suedo liquido es obligatorio";
        }

        if(!$this->ISSSaporte){
            self::$errores[]="El ISSS aporte es obligatorio";
        }

        if(!$this->IPSFAaporte){
            self::$errores[]="El IPSFA aporte es obligatorio";
        }

        if(!$this->AFPCRECERaporte){
            self::$errores[]="El AFP CRECER aporte es obligatorio";
        }

        if(!$this->AFPCONFIAaporte){
            self::$errores[]="El AFP CONFIA aporte es obligatorio";
        }

        if(!$this->totalAportaciones){
            self::$errores[]="El total aportaciones es obligatorio";
        }

        if(!$this->sueldoMasHorasExtras){
            self::$errores[]="El sueldo con horas extras es obligatorio";
        }

        if(!$this->totalAportHoras){
            self::$errores[]="El total aportaciones de horas es obligatorio";
        }

        if(!$this->idSelectTop){
            self::$errores[]="El id de seleccion es obligatorio";
        }

        if(!$this->idEmpleados){
            self::$errores[]="El id de empleados es obligatorio";
        }

        if(!$this->usuarioJefe){
            self::$errores[]="El nombre del jefe es obligatorio";
        }

        if(!$this->ubicacionEstacion){
            self::$errores[]="La ubicacion del jefe es obligatorio";
        }

        if(!$this->sumatoriaHorasDiurnasNormales){
            self::$errores[]="La sumatoria de horas diurnas es obligatoria";
        }

        if(!$this->sumatoriaHorasNocturnasNormales){
            self::$errores[]="La sumatoria de horas nocturnas es obligatoria";
        }

        if(!$this->sumatoriaHorasNormales){
            self::$errores[]="La sumatoria de horas totales normales es obligatoria";
        }
        return self::$errores;
    }

    public function Autorizacion(){
        $query="EXEC InsertarAutorizaciones :usuarioJefe,:ubicacionEstacion,:sumatoriaHorasDiurnasNormales,:sumatoriaHorasNocturnasNormales,:sumatoriaHorasNormales";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(':usuarioJefe',$this->usuarioJefe,PDO::PARAM_STR);
        $consulta->bindParam(':ubicacionEstacion',$this->ubicacionEstacion,PDO::PARAM_STR);
        $consulta->bindParam(':sumatoriaHorasDiurnasNormales',$this->sumatoriaHorasDiurnasNormales,PDO::PARAM_STR);
        $consulta->bindParam(':sumatoriaHorasNocturnasNormales',$this->sumatoriaHorasNocturnasNormales,PDO::PARAM_STR);
        $consulta->bindParam(':sumatoriaHorasNormales',$this->sumatoriaHorasNormales,PDO::PARAM_STR);
        $consulta->execute();
        
        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar el reporte";
        }

        return self::$errores;
    }

    public function crearAportesDescuentosMinutos(){
        $query = "EXEC crearAportesDescuentosMinutos :minutosDiurnosNormales, :minutosNocturnosNormales, :valorMinuto, :totalExtraDiurno, :totalExtraNocturno, :totalHorasExtras, :minutosDiurnosAutorizados, :minutosNocturnosAutorizados, :minutosAutorizados, :minutosDiurnosTotales, :minutosNocturnosTotales, :ISSSdescuento, :IPSFAdescuento, :AFPCRECERdescuento, :AFPCONFIAdescuento, :retencionRenta, :totalDescuentos, :sueldoparaISSS, :Liquido, :ISSSaporte, :IPSFAaporte, :AFPCRECERaporte, :AFPCONFIAaporte, :totalAportaciones";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(":minutosDiurnosNormales",$this->minutosDiurnosNormales,PDO::PARAM_STR);
        $consulta->bindParam(":minutosNocturnosNormales",$this->minutosNocturnosNormales,PDO::PARAM_STR);
        $consulta->bindParam(":valorMinuto",$this->valorMinuto,PDO::PARAM_STR);
        $consulta->bindParam(":totalExtraDiurno",$this->totalExtraDiurno,PDO::PARAM_STR);
        $consulta->bindParam(":totalExtraNocturno",$this->totalExtraNocturno,PDO::PARAM_STR);
        $consulta->bindParam(":totalHorasExtras",$this->totalHorasExtras,PDO::PARAM_STR);
        $consulta->bindParam(":minutosDiurnosAutorizados",$this->minutosDiurnosAutorizados,PDO::PARAM_STR);
        $consulta->bindParam(":minutosNocturnosAutorizados",$this->minutosNocturnosAutorizados,PDO::PARAM_STR);
        $consulta->bindParam(":minutosAutorizados",$this->minutosAutorizados,PDO::PARAM_STR);
        $consulta->bindParam(":minutosDiurnosTotales",$this->minutosDiurnosTotales,PDO::PARAM_STR);
        $consulta->bindParam(":minutosNocturnosTotales",$this->minutosNocturnosTotales,PDO::PARAM_STR);
        $consulta->bindParam(":ISSSdescuento",$this->ISSSdescuento,PDO::PARAM_STR);
        $consulta->bindParam(":IPSFAdescuento",$this->IPSFAdescuento,PDO::PARAM_STR);
        $consulta->bindParam(":AFPCRECERdescuento",$this->AFPCRECERdescuento,PDO::PARAM_STR);
        $consulta->bindParam(":AFPCONFIAdescuento",$this->AFPCONFIAdescuento,PDO::PARAM_STR);
        $consulta->bindParam(":retencionRenta",$this->retencionRenta,PDO::PARAM_STR);
        $consulta->bindParam(":totalDescuentos",$this->totalDescuentos,PDO::PARAM_STR);
        $consulta->bindParam(":sueldoparaISSS",$this->sueldoparaISSS,PDO::PARAM_STR);
        $consulta->bindParam(":Liquido",$this->Liquido,PDO::PARAM_STR);
        $consulta->bindParam(":ISSSaporte",$this->ISSSaporte,PDO::PARAM_STR);
        $consulta->bindParam(":IPSFAaporte",$this->IPSFAaporte,PDO::PARAM_STR);
        $consulta->bindParam(":AFPCRECERaporte",$this->AFPCRECERaporte,PDO::PARAM_STR);
        $consulta->bindParam(":AFPCONFIAaporte",$this->AFPCONFIAaporte,PDO::PARAM_STR);
        $consulta->bindParam(":totalAportaciones",$this->totalAportaciones,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar el reporte";
        }
        $this->DetallesReportes();
    }

    public function DetallesReportes(){
        $query="EXEC ingresarDetallesReporte :sueldoMasHorasExtras, :totalAportHoras, :idSelectTop, :idEmpleados";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(":sueldoMasHorasExtras",$this->sueldoMasHorasExtras,PDO::PARAM_STR);
        $consulta->bindParam(":totalAportHoras",$this->totalAportHoras,PDO::PARAM_STR);
        $consulta->bindParam(":idSelectTop",$this->idSelectTop,PDO::PARAM_STR);
        $consulta->bindParam(":idEmpleados",$this->idEmpleados,PDO::PARAM_STR);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar el reporte";
        }

        return self::$errores;
    }
}


?>