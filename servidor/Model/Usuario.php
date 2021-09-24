<?php

class Usuario extends ActiveRecord{

    protected static $tabla = 'Usuarios';
    protected static $columnasDB=['idUsuario','NombreUsuario','tipoUsuario','contra'];

    public $idUsuario;
    public $NombreUsuario;
    public $tipoUsuario;
    public $contra;

    public function __construct($args=[])
    {
        $this->idUsuario=$argc['idUsuario']??null;
        $this->NombreUsuario=$argc['NombreUsuario']??'';
        $this->tipoUsuario=$argc['tipoUsuario']??'';
        $this->contra=$argc['contra']??'';
    }
  
}