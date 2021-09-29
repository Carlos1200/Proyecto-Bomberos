<?php

$dominioPermitido = "http://localhost:3000";
header("Access-Control-Allow-Origin: $dominioPermitido");
header("Access-Control-Allow-Headers: content-type");
<<<<<<< HEAD
header("Access-Control-Allow-Methods: OPTIONS,GET,PUT,POST,DELETE");
=======
header("Access-Control-Allow-Methods: GET,POST");
header("Access-Control-Allow-Credentials: true");
>>>>>>> main
header("Content-Type: application/json");