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
                $pdfPropierdades->AddPage();
                $title = 'Autorización Minutos Extras';
                $pdfPropierdades->SetTitle($title,true);
                $pdfPropierdades->AddFont('DejaVuu','','DejaVuSans.ttf',true);
                $pdfPropierdades->SetFont('DejaVuu','',10);
                $pdfPropierdades->Cell(80);
                $pdfPropierdades->Cell(30,0,$title,0,0,'C');
                $pdfPropierdades->Ln(10);
                $pdfPropierdades->MultiCell(0,5,"El jefe ".$datos["creadorJefe"]." ha autorizado los siguientes minutos en la estacion de ".$datos["ubicacionEstacion"].":",0,'L');
                $pdfPropierdades->Ln(5);
                $pdfPropierdades->MultiCell(0,7,"● Haciendo un total de ".$datos["sumatoriaHorasDiurnasNormales"]." minutos extras diurnos",0,'L');
                $pdfPropierdades->MultiCell(0,7,"● Haciendo un total de ".$datos["sumatoriaHorasNocturnasNormales"]." minutos extras nocturnos",0,'L');
                $pdfPropierdades->MultiCell(0,7,"● Haciendo un total de ".$datos["sumatoriaHorasTotalesNormales"]." minutos extras totales",0,'L');
                $pdfPropierdades->Output('I',"Autorizacion.pdf",true);
            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        
        
    }
}