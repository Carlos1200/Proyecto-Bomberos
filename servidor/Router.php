<?php

namespace MVC;

class Router{

    public $rutasGET=[];
    public $rutasPOST=[];

    public function get($url,$fn){
        $ruta=$_ENV['HOST'];
        $this->rutasGET[$ruta.$url]=$fn;
    }
    public function post($url,$fn){
        $ruta=$_ENV['HOST'];
        $this->rutasPOST[$ruta.$url]=$fn;
    }
    
    public function comprobarRutas(){
        $urlActual= $_SERVER['REQUEST_URI']??'/';
        $metodo =$_SERVER['REQUEST_METHOD'];
        $path=parse_url($urlActual)['path'];

        if($metodo==="GET"){
            $fn = $this->rutasGET[$path]??null;
        }else{
            $fn = $this->rutasPOST[$path]??null;
        }

        if($fn){
            //La URL existe
            call_user_func($fn, $this);
        }else{
            echo "Pagina No Encontrada";
        }
    }

    public function render($view, $datos=[]){

        foreach($datos as $key => $value){
            $$key=$value;
        }

        include __DIR__."/Views/$view.php";
    }

}