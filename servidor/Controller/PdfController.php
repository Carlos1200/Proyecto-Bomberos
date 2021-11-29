<?php
namespace Controller;

include_once "cors.php";
use Model\Pdf;

class PdfController{
    
    public static function generarPdf(){
        $pdf = new Pdf();
        $pdf->AddPage();
        $title = 'Autorización Minutos Extras';
        $pdf->SetTitle($title,true);
        $pdf->AddFont('DejaVuu','','DejaVuSans.ttf',true);
        $pdf->SetFont('DejaVuu','',10);
        $pdf->Cell(0,10,"El jefe Gerardo Velazquéz ha autorizado los siguientes minutos",0,1,'C');
        $pdf->Cell(0,0,"en la estacion de San Salvador",0,1,'C');
        $pdf->Cell(0,15,"Haciendo un total de 1500 minutos extras diurnos",0,1,'C');
        $pdf->Cell(0,10,"Haciendo un total de 1000 minutos extras nocturnos",0,1,'C');
        $pdf->Cell(0,10,"Haciendo un total de 2500 minutos extras totales",0,1,'C');
        $pdf->Output('I',"documento.pdf",true);
    }
}