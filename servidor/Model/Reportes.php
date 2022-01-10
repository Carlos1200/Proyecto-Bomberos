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

    public $idReporte;
    public $fechaCreacion;
    public $Verificacion;
    public $idAutorizaciones;
    public $idUsuario;
    public $idPensionActual;
    public $salarioActual;



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
        $this->idUsuario=$args['idUsuario']??'';
        $this->Verificacion=$args['Verificacion']??'';
        $this->fechaCreacion=$args['fechaCreacion']??'';
        $this->idPensionActual=$args['idPensionActual']??'';
        $this->salarioActual=$args['salarioActual']??'';
        $this->idReporte=$args['idReporte']??'';
    }

    public function validar()
    {
        if(!$this->idPensionActual)
        {
            $this->errors[] = "El id Pension es obligatorio";
        }
        if(!$this->salarioActual)
        {
            $this->errors[] = "El salario actual es obligatorio";
        }
        if(!$this->minutosDiurnosNormales&&$this->minutosDiurnosNormales!=='0'){
            self::$errores[]="Los minutos diurnos normales son obligatorios";
        }

        if(!$this->minutosNocturnosNormales&&$this->minutosNocturnosNormales!=='0'){
            self::$errores[]="Los minutos nocturnos normales son obligatorios";
        }

        if(!$this->valorMinuto && $this->valorMinuto!=='0'){
            self::$errores[]="El valor minuto es obligatorio";
        }

        if(!$this->totalExtraDiurno && $this->totalExtraDiurno!=='0'){
            self::$errores[]="Los minutos extras diurnos son obligatorios";
        }

        if(!$this->totalExtraNocturno && $this->totalExtraNocturno!=='0'){
            self::$errores[]="Los minutos extras nocturnos son obligatorios";
        }

        if(!$this->totalHorasExtras && $this->totalHorasExtras!=='0'){
            self::$errores[]="El total horas extras son obligatorios";
        }

        if(!$this->minutosDiurnosAutorizados && $this->minutosDiurnosAutorizados!=='0'){
            self::$errores[]="Los minutos diurnos autorizados son obligatorios";
        }

        if(!$this->minutosNocturnosAutorizados && $this->minutosNocturnosAutorizados!=='0'){
            self::$errores[]="Los minutos nocturnos autorizados son obligatorios";
        }

        if(!$this->minutosAutorizados && $this->minutosAutorizados!=='0'){
            self::$errores[]="Los minutos autorizados son obligatorios";
        }

        if(!$this->minutosDiurnosTotales && $this->minutosDiurnosTotales!=='0'){
            self::$errores[]="Los minutos diurnos totales son obligatorios";
        }

        if(!$this->minutosNocturnosTotales && $this->minutosNocturnosTotales!=='0'){
            self::$errores[]="Los minutos nocturnos totales son obligatorios";
        }

        if(!$this->ISSSdescuento && $this->ISSSdescuento!=='0'){
            self::$errores[]="El ISSS descuento es obligatoria";
        }

        if(!$this->IPSFAdescuento && $this->IPSFAdescuento!=='0'){
            self::$errores[]="El IPSFA descuento es obligatoria";
        }

        if(!$this->AFPCRECERdescuento && $this->AFPCRECERdescuento!=='0'){
            self::$errores[]="El AFP CRECER descuento es obligatoria";
        }

        if(!$this->AFPCONFIAdescuento && $this->AFPCONFIAdescuento!=='0'){
            self::$errores[]="El AFP CONFIA descuento es obligatoria";
        }

        if(!$this->retencionRenta && $this->retencionRenta!=='0'){
            self::$errores[]="La retencion Renta es obligatoria";
        }

        if(!$this->totalDescuentos && $this->totalDescuentos!=='0'){
            self::$errores[]="El total descuento es obligatoria";
        }

        if(!$this->sueldoparaISSS && $this->sueldoparaISSS!=='0'){
            self::$errores[]="El sueldo para ISSS es obligatorio";
        }

        if(!$this->Liquido && $this->Liquido!=='0'){
            self::$errores[]="El suedo liquido es obligatorio";
        }

        if(!$this->ISSSaporte && $this->ISSSaporte!=='0'){
            self::$errores[]="El ISSS aporte es obligatorio";
        }

        if(!$this->IPSFAaporte && $this->IPSFAaporte!=='0'){
            self::$errores[]="El IPSFA aporte es obligatorio";
        }

        if(!$this->AFPCRECERaporte && $this->AFPCRECERaporte!=='0'){
            self::$errores[]="El AFP CRECER aporte es obligatorio";
        }

        if(!$this->AFPCONFIAaporte && $this->AFPCONFIAaporte!=='0'){
            self::$errores[]="El AFP CONFIA aporte es obligatorio";
        }

        if(!$this->totalAportaciones && $this->totalAportaciones!=='0'){
            self::$errores[]="El total aportaciones es obligatorio";
        }

        if(!$this->sueldoMasHorasExtras && $this->sueldoMasHorasExtras!=='0'){
            self::$errores[]="El sueldo con horas extras es obligatorio";
        }

        if(!$this->totalAportHoras && $this->totalAportHoras!=='0'){
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

        if(!$this->sumatoriaHorasDiurnasNormales && $this->sumatoriaHorasDiurnasNormales!=='0'){
            self::$errores[]="La sumatoria de horas diurnas es obligatoria";
        }

        if(!$this->sumatoriaHorasNocturnasNormales && $this->sumatoriaHorasNocturnasNormales!=='0'){
            self::$errores[]="La sumatoria de horas nocturnas es obligatoria";
        }

        if(!$this->sumatoriaHorasNormales){
            self::$errores[]="La sumatoria de horas totales normales es obligatoria";
        }

        if(!$this->fechaCreacion){
            self::$errores[]="La fecha de creación es obligatoria";
        }
        if(!$this->Verificacion && $this->Verificacion!=='0'){
            self::$errores[]="La verificación es obligatoria";
        }
        if(!$this->idUsuario){
            self::$errores[]="Los id's de usuarios son obligatorios";
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
            self::$errores[]="No se pudo agregar la autorizacion del reporte";
        }else{
            $this->idAutorizaciones=self::$db->lastInsertId();
        }

        return self::$errores;
    }

    public function CrearReporte(){
        //Generar id's del Reporte
        $id=$this->generateRandomString();
        $idReporteString='';
        for($i=1;$i<=intval($this->idSelectTop);$i++){
            if($i==1){
                $idReporteString=$id;
            }else{
                $idReporteString=$idReporteString.','.$id;
            }
        }

        //Generar id's de autorizaciones
        $idAutorizacionesString='';
        for($i=1;$i<=intval($this->idSelectTop);$i++){
            if($i==1){
                $idAutorizacionesString=$this->idAutorizaciones;
            }else{
                $idAutorizacionesString=$idAutorizacionesString.','.$this->idAutorizaciones;
            }
        }

        $query = "EXEC insertarReportes :idReporte, :fechaCreacion, :idUsuario, :Verificacion, :idAutorizaciones, :selectTop";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(":idReporte",$idReporteString,PDO::PARAM_STR);
        $consulta->bindParam(":fechaCreacion",$this->fechaCreacion,PDO::PARAM_STR);
        $consulta->bindParam(":idUsuario",$this->idUsuario,PDO::PARAM_STR);
        $consulta->bindParam(":Verificacion",$this->Verificacion,PDO::PARAM_STR);
        $consulta->bindParam(":idAutorizaciones",$idAutorizacionesString,PDO::PARAM_STR);
        $consulta->bindParam(":selectTop",$this->idSelectTop,PDO::PARAM_INT);
        $consulta->execute();

        $query="select DISTINCT top(1) autorizaciones.creadorJefe, reportes.fechaCreado, reportes.verificacion, reportes.idReporte, autorizaciones.idAutorizaciones
        from autorizaciones INNER JOIN reportes on autorizaciones.idAutorizaciones = reportes.idAutorizaciones 
        order by autorizaciones.idAutorizaciones desc";
        $consulta=self::$db->prepare($query);
        $consulta->execute();
        $resultado=$consulta->fetch(PDO::FETCH_ASSOC);
        return $resultado;
    }

    function generateRandomString($length = 10) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < $length; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        return $randomString;
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
            self::$errores[]="No se pudo agregar los extras del reporte";
        }
        return self::$errores;
    }

    public function DetallesReportes(){

        $query="EXEC ingresarDetallesReporte :sueldoMasHorasExtras, :totalAportHoras, :idEmpleados, :idPensionActual, :salarioActual, :idSelectTop";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(":sueldoMasHorasExtras",$this->sueldoMasHorasExtras,PDO::PARAM_STR);
        $consulta->bindParam(":totalAportHoras",$this->totalAportHoras,PDO::PARAM_STR);
        $consulta->bindParam(":idEmpleados",$this->idEmpleados,PDO::PARAM_STR);
        $consulta->bindParam(":idPensionActual",$this->idPensionActual,PDO::PARAM_STR);
        $consulta->bindParam(":salarioActual",$this->salarioActual,PDO::PARAM_STR);
        $consulta->bindParam(":idSelectTop",$this->idSelectTop,PDO::PARAM_INT);
        $consulta->execute();

        if(!self::$db->lastInsertId()>0){
            self::$errores[]="No se pudo agregar los detalles reporte";
        }

        return self::$errores;
    }

    public function obtenerReportes(){
        $query="EXEC obtenerReportes";
        $consulta=self::$db->prepare($query);
        $consulta->execute();
        $reportes=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $reportes;
    }

    public function reportesFiltrados($nombreJefe){
        if(is_null($nombreJefe)){
            self::$errores[]="No se ha enviado el id";
        }else{
            $query="EXEC busquedaReportes :nombreJefe";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(":nombreJefe",$nombreJefe,PDO::PARAM_STR);
            $consulta->execute();
            $reportes=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $reportes;
        }
    }

    public function reportesUbicacion($ubicacion){
        if(is_null($ubicacion)){
            self::$errores[]="No se ha enviado la ubicación";
        }else{
            $query="EXEC busquedaReportesUbicacion :ubicacion";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(":ubicacion",$ubicacion,PDO::PARAM_STR);
            $consulta->execute();
            $reportes=$consulta->fetchAll(PDO::FETCH_ASSOC);
            return $reportes;
        }
    }

    public function leerDetallesReportes($idReporte){
        if(is_null($idReporte)){
            self::$errores[]="No se ha enviado el id del reporte";
        }else{
            $query="EXEC LeerDetallesReporte :idReporte";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(":idReporte",$idReporte,PDO::PARAM_STR);
            $consulta->execute();
            $reportes=$consulta->fetchAll(PDO::FETCH_ASSOC);
            
            return $reportes;
        }
    }
    
    public function actualizarMinutosAutorizados(){
        if(!$this->idReporte||!$this->minutosDiurnosAutorizados||!$this->minutosNocturnosAutorizados){
            self::$errores[]="No se ha enviado el id del Reporte";
        }else{
            $query="EXEC actualizarMinutosAutorizados :idReporte, :minutosDiurnos, :minutosNocturnos";
            $consulta=self::$db->prepare($query);
            $consulta->bindParam(":idReporte",$this->idReporte,PDO::PARAM_STR);
            $consulta->bindParam(":minutosDiurnos",$this->minutosDiurnosAutorizados,PDO::PARAM_STR);
            $consulta->bindParam(":minutosNocturnos",$this->minutosNocturnosAutorizados,PDO::PARAM_STR);
            $consulta->execute();
        }
    }

    public function informacionExcel($idReporte){
        if(is_null($idReporte)){
            self::$errores[]="No se ha enviado el id del reporte";
        }else{
        $query="EXEC imprimirDatosReportePequeño :idReporte";
        $consulta=self::$db->prepare($query);
        $consulta->bindParam(":idReporte",$idReporte,PDO::PARAM_STR);
        $consulta->execute();
        $reportes=$consulta->fetchAll(PDO::FETCH_ASSOC);
        return $reportes;
        }
    }

    public function obtenerMes($mes=01){
        $meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
        return $meses[$mes-1];
        
    }
}


?>