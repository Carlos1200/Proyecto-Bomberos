<?php
namespace Controller;

use Model\Pdf;
use Model\pdfPropiedades;
use MVC\Router;

class PdfController{
    
    public static function generarPdf(Router $router){
        $id=null;
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('id',$output);
        if($existe){
            $id=$output['id'];
        }
        $pdfPropierdades = new pdfPropiedades();
        $pdf=new Pdf();
            $datos=$pdf->obtenerAutorizacion($id);
            $errores=$pdf::getErrores();
            if(empty($errores)){
                date_default_timezone_set('America/El_Salvador');
                $date = strtotime($datos['fechaCreado']);
                $mes=$pdf->obtenerMes(strftime("%m",$date));
                $year=strftime("%Y",$date);
                $imagenurl=dirname(__DIR__)."/LogoBomberos.png";
                $title = 'Autorización Minutos Extras';
                $pdfPropierdades->SetTitle($title,true);
                $pdfPropierdades->AddFont('DejaVuu','','DejaVuSans.ttf',true);
                $pdfPropierdades->SetFont('DejaVuu','',20);
                $pdfPropierdades->Cell(80);
                $pdfPropierdades->Cell(0, 0, $pdfPropierdades->Image($imagenurl, $pdfPropierdades->GetX()+1,$pdfPropierdades->GetY()-18,25,25), 0, 0, 'C', false,'');
                $pdfPropierdades->Ln(15);
                $pdfPropierdades->Cell(0,0,"Cuerpo de Bomberos de El Salvador",0,0,'C');
                $pdfPropierdades->SetFont('DejaVuu','',15);
                $pdfPropierdades->Ln(12);
                $pdfPropierdades->Cell(0,0,$title,0,0,'C');
                $pdfPropierdades->SetFont('DejaVuu','',10);
                $pdfPropierdades->Ln(10);
                $pdfPropierdades->MultiCell(0,5,"Se ha autorizado el reporte con ".$datos["cantidadEmpleados"]." empleados del mes ".$mes." del año ".$year.", autorizado por el jefe ".$datos["creadorJefe"].". El jefe ha autorizado los siguientes minutos en la estación ".$datos["ubicacionEstacion"].":",0,'L');
                $pdfPropierdades->Ln(5);
                $pdfPropierdades->MultiCell(0,7,"Se autorizaron un total de ".$datos["sumatoriaHorasDiurnasNormales"]." minutos extras diurnos, ".$datos["sumatoriaHorasNocturnasNormales"]." minutos extras nocturnos, teniendo la cantidad de ".$datos["sumatoriaHorasTotalesNormales"]." minutos extras totales.",0,'L');
                $pdfPropierdades->SetFont('DejaVuu','',15);
                $pdfPropierdades->Ln(12);
                $pdfPropierdades->Cell(0,0,"Id Reporte: ".$datos['idReporte'],0,0,'C');
                $pdfPropierdades->Output('I',"Autorizacion.pdf",true);
            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        
        
    }
}