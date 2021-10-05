<?php

function conectarDB(){
    $con = new PDO("sqlsrv:Server=VELAR;Database=DB_CuerpoDeBomberos");

    if(!$con){
        echo "No se pudo conectar a la base de datos";
        echo "\nPDO::errorInfo():\n";
        print_r($con->errorInfo());
        exit;
    }

    return $con;
}