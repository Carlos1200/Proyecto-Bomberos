<?php
namespace MVC;

$dominioPermitido = "http://localhost:3000";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");