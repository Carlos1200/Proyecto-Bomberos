<?php

class Usuario extends ActiveRecord{

    protected static $tabla = 'Usuarios';
    protected static $columnasDB=['NombreUsuario','tipoUsuario','contra'];

    public $NombreUsuario;
    public $tipoUsuario;
    public $contra;

    public function __construct($args=[])
    {
        $this->NombreUsuario=$argc['NombreUsuario']??'';
        $this->tipoUsuario=$argc['tipoUsuario']??'';
        $this->contra=$argc['contra']??'';
    }
  
}