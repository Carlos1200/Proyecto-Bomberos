<?php
namespace Model;
 
use PDF\tFPDF;

class Pdf extends tFPDF{


    public function Header()
{
    global $title;
    // Arial bold 15
    $this->AddFont('DejaVu','','DejaVuSansCondensed-Bold.ttf',true);
    $this->SetFont('DejaVu','',14);
    // Calculamos ancho y posición del título.
    $w = $this->GetStringWidth('Autorización Minutos Extras')+6;
    $this->SetX((210-$w)/2);
    // Título
    $this->Cell($w,9,'Autorización Minutos Extras');
    // Salto de línea
    $this->Ln(10);
}

function Footer()
{
    // Posición a 1,5 cm del final
    $this->SetY(-15);
    // Arial itálica 8
    $this->AddFont('DejaVu','','DejaVuSansCondensed-Bold.ttf',true);
    $this->SetFont('DejaVu','',8);
    // Color del texto en gris
    $this->SetTextColor(128);
    // Número de página
    $this->Write(10,'Página '.$this->PageNo());
}
}

?>