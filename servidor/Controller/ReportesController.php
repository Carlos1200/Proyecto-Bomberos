<?php
namespace Controller;

use MVC\Router;
use Model\Reportes;
use DateTime;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style;
class ReportesController{
    
    public static function nuevoReportes(Router $router){
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        
        $reporte=new Reportes($_POST);
        $reporte::VerificarToken($output['token']);
        $errores=$reporte->validar();
        
        if(empty($errores)){
            $errores=$reporte->crearAportesDescuentosMinutos();
            if(empty($errores)){
                $errores=$reporte->DetallesReportes();
                
                if(empty($errores)){
                    $errores=$reporte->Autorizacion();
                    if(empty($errores)){
                        $reportes=$reporte->crearReporte();
                        $errores=$reporte::getErrores();
                        if(empty($errores)){
                            $router->render('reportes/reportes',[
                                'reportes'=>$reportes
                            ]);
                        }else{
                            $router->render('errores/error',[
                                'errores'=>$errores
                            ]);
                        }
                    }else{
                        $router->render('errores/error',[
                            'errores'=>$errores
                        ]);
                    }
                }else{
                    $router->render('errores/error',[
                        'errores'=>$errores
                    ]);
                }

            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function obtenerReportesFiltrados(Router $router){
        $nj=null;
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('nj',$output);
        $existeToken=array_key_exists('token',$output);
        if($existe){
            $nj=$output['nj'];
        }

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->reportesFiltrados($nj);
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function obtenerReportesUbicacion(Router $router){
        $nj=null;
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('nj',$output);
        $existeToken=array_key_exists('token',$output);
        if($existe){
            $nj=$output['nj'];
        }

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->reportesUbicacion($nj);
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }
    public static function obtenerReportes(Router $router){
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existeToken=array_key_exists('token',$output);

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->obtenerReportes();
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function leerDetallesReportes(Router $router){
        $nj=null;
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('nj',$output);
        $existeToken=array_key_exists('token',$output);
        if($existe){
            $nj=$output['nj'];
        }

        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->leerDetallesReportes($nj);
            $errores=$reporte::getErrores();
            if(empty($errores)){
                $router->render('reportes/reportes',[
                    'reportes'=>$reportes
                ]);
            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

    public static function generarExcel(Router $router){
        $id=null;
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existe=array_key_exists('id',$output);
        $existeToken=array_key_exists('token',$output);
        if($existe){
            $id=$output['id'];
        }
        if($existeToken){
            $token=$output['token'];
        }

        $reporte=new Reportes();
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reportes=$reporte->informacionExcel($id);
            $errores=$reporte::getErrores();
            if(empty($errores)){
                date_default_timezone_set('America/El_Salvador');
                $date = strtotime($reportes[0]['fechaCreado']);
                $mes=$reporte->obtenerMes(strftime("%m",$date));
                $year=strftime("%Y",$date);
                $cantidad=count($reportes);
                $spreadsheet = new Spreadsheet();
                
                $sheet = $spreadsheet->getActiveSheet();
                $sheet->getStyle('C2:M2')->getAlignment()->setHorizontal(Style\Alignment::HORIZONTAL_CENTER);
                $sheet->mergeCells('C2:M2');
                $sheet->getStyle('I4:L4')->getAlignment()->setHorizontal(Style\Alignment::HORIZONTAL_CENTER);
                $sheet->mergeCells('I4:L4');
                $sheet->setCellValue('C2', 'HOJA DE HORAS EXTRAS DEL PERSONAL OPERATIVO');
                $sheet->getColumnDimension('D')->setWidth(40);
                $sheet->getColumnDimension('E')->setWidth(13);
                $sheet->getColumnDimension('F')->setWidth(13);
                $sheet->getColumnDimension('G')->setWidth(13);
                $sheet->getColumnDimension('H')->setWidth(20);
                $sheet->getColumnDimension('I')->setWidth(13);
                $sheet->getColumnDimension('J')->setWidth(13);
                $sheet->getColumnDimension('K')->setWidth(13);
                $sheet->getColumnDimension('L')->setWidth(13);
                $sheet->getColumnDimension('M')->setWidth(30);

                $sheet->setCellValue('D4','HORAS EXTRAS DEL MES DE: ');
                $sheet->setCellValue('E4',$mes);
                $sheet->getStyle('E4')->getFill()->setFillType(Style\Fill::FILL_SOLID);
                $sheet->getStyle('E4')->getFill()->getStartColor()->setRGB('FFFF01');

                $sheet->setCellValue('F4','Año: ');
                $sheet->setCellValue('G4',$year);
                $sheet->getStyle('G4')->getFill()->setFillType(Style\Fill::FILL_SOLID);
                $sheet->getStyle('G4')->getFill()->getStartColor()->setRGB('FFFF01');

                $sheet->setCellValue('H4','ESTACION/GRUPO: ');
                $sheet->setCellValue('I4',$reportes[0]['nombreUbicacion']. ' / '.$reportes[0]['nombreGrupo']);
                $sheet->getStyle('I4')->getFill()->setFillType(Style\Fill::FILL_SOLID);
                $sheet->getStyle('I4')->getFill()->getStartColor()->setRGB('FFFF01');
                
                // Tabla de datos
                $sheet->getStyle('C6:M6')->getBorders()->getAllBorders()->setBorderStyle(Style\Border::BORDER_THIN);
                $sheet->getStyle('C6:M6')->getFont()->setBold(true);
                $sheet->getStyle('C6:M6')->getAlignment()->setHorizontal(Style\Alignment::HORIZONTAL_CENTER);
                $sheet->setCellValue('C6', 'N°');
                $sheet->setCellValue('D6', 'Nombre');
                $sheet->setCellValue('E6', 'Grupo');
                $sheet->setCellValue('F6', 'Diurnas');
                $sheet->setCellValue('G6', 'Nocturnas');
                $sheet->setCellValue('H6', 'Total Extras');
                $sheet->setCellValue('I6', 'Diurnas');
                $sheet->setCellValue('J6', 'Nocturnas');
                $sheet->setCellValue('K6', 'Autorización');
                $sheet->setCellValue('L6', 'Firma');
                $sheet->setCellValue('M6', 'Observación');

                for($i=0;$i<$cantidad;$i++){
                    $sheet->getStyle('C'.($i+7).':M'.($i+7))->getBorders()->getAllBorders()->setBorderStyle(Style\Border::BORDER_THIN);
                    $sheet->getStyle('D'.($i+7))->getFill()->setFillType(Style\Fill::FILL_SOLID);
                    $sheet->getStyle('D'.($i+7))->getFill()->getStartColor()->setRGB('BFBFBF');
                    $sheet->setCellValue('C'.($i+7), $i+1);
                    $sheet->setCellValue('D'.($i+7), $reportes[$i]['nombres']. ' '.$reportes[$i]['apellidos']);
                    $sheet->setCellValue('E'.($i+7), $reportes[$i]['nombreGrupo']);
                    $sheet->setCellValue('F'.($i+7), $reportes[$i]['minutosDiurnosNormales']);
                    $sheet->setCellValue('G'.($i+7), $reportes[$i]['minutosNocturnosNormales']);
                    $sheet->setCellValue('H'.($i+7), "=SUM(F".($i+7).":G".($i+7).")");
                    $sheet->setCellValue('I'.($i+7), $reportes[$i]['minutosDiurnosAutorizados']);
                    $sheet->setCellValue('J'.($i+7), $reportes[$i]['minutosNocturnosAutorizados']);
                    $sheet->setCellValue('K'.($i+7), "=SUM(I".($i+7).":J".($i+7).")");
                }
                $sheet->mergeCells('C'.($cantidad+8).':D'.($cantidad+8));
                $sheet->getStyle('C'.($cantidad+8))->getFont()->setBold(true);
                $sheet->setCellValue('C'.($cantidad+8), 'Observaciones');
                $sheet->mergeCells('C'.($cantidad+9).':M'.($cantidad+10));
                $sheet->getStyle('C'.($cantidad+9).':M'.($cantidad+10))->getFill()->setFillType(Style\Fill::FILL_SOLID);
                $sheet->getStyle('C'.($cantidad+9).':M'.($cantidad+10))->getFill()->getStartColor()->setRGB('BFBFBF');
                $sheet->getStyle('C'.($cantidad+9).':M'.($cantidad+10))->getAlignment()->setHorizontal(Style\Alignment::HORIZONTAL_CENTER);
                $sheet->getStyle('C'.($cantidad+9).':M'.($cantidad+10))->getAlignment()->setVertical(Style\Alignment::VERTICAL_CENTER);

                header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                header('Content-Disposition: attachment;filename="myfile.xlsx"');
                header('Cache-Control: max-age=0');
                $writer = new Xlsx($spreadsheet);
                $writer->save('php://output');
                
            }else{
                $router->render('errores/error',[
                    'errores'=>$errores
                ]);
            }
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }

    }

    public static function actualizarMinutosAutorizados(Router $router){
        $token='';
        $query=parse_url($_SERVER['REQUEST_URI'],PHP_URL_QUERY);
        parse_str($query,$output);
        $existeToken=array_key_exists('token',$output);
        if($existeToken){
            $token=$output['token'];
        }
        $reporte=new Reportes($_POST);
        $reporte::VerificarToken($token);
        $errores=$reporte::getErrores();
        if(empty($errores)){
            $reporte->actualizarMinutosAutorizados();
        }else{
            $router->render('errores/error',[
                'errores'=>$errores
            ]);
        }
    }

}

?>