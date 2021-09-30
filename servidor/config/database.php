<?php


function conectarDB(){
    $server=$_ENV['SERVER'];
    $DB=$_ENV['DB'];
    $con = new PDO("sqlsrv:Server=$server;Database=$DB");

    if(!$con){
        echo "No se pudo conectar a la base de datos";
        echo "\nPDO::errorInfo():\n";
        print_r($con->errorInfo());
        exit;
    }

    return $con;
}