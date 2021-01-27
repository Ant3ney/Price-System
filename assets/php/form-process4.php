<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Nom manquant! ";
} else {
    $name = $_POST["name"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email manquant! ";
} else {
    $email = $_POST["email"];
}

// VILLE
if (empty($_POST["ville"])) {
    $errorMSG .= "ville manquant! ";
} else {
    $ville = $_POST["ville"];
}


// Phone Number
if (empty($_POST["phone_number"])) {
    $errorMSG .= "Numero manquant! ";
} else {
    $phone_number = $_POST["phone_number"];
}


// TRAVAU
if (empty($_POST["travau"])) {
    $errorMSG .= "travaux manquant! ";
} else {
    $travau = $_POST["travau"];
}

// subvention
if (empty($_POST["subvention"])) {
    $errorMSG .= "subvention manquant!";
} else {
    $subvention = $_POST["subvention"];
}

// actuel
if (empty($_POST["actuel"])) {
    $errorMSG .= "actuel manquant!";
} else {
    $actuel = $_POST["actuel"];
}


// finition
if (empty($_POST["finition"])) {
    $errorMSG .= "finition manquant!";
} else {
    $finition = $_POST["finition"];
}


// surface
if (empty($_POST["surface"])) {
    $errorMSG .= "surface manquant!";
} else {
    $surface = $_POST["surface"];
}


// delai
if (empty($_POST["delai"])) {
    $errorMSG .= "delai manquant!";
} else {
    $delai = $_POST["delai"];
}


// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message manquant! ";
} else {
    $message = $_POST["message"];
}


$EmailTo = "contact@gafra.fr";

$Subject = "Nouvelle demande de devis 24H";

// prepare email body text
$Body = "";
$Body .= "Nom: ";
$Body .= $name;
$Body .= "\n";
$Body .= "Ville: ";
$Body .= $ville;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $email;
$Body .= "\n";
$Body .= "Phone Number: ";
$Body .= $phone_number;
$Body .= "\n";
$Body .= "Travaux: ";
$Body .= $travau;
$Body .= "\n";

$Body .= "Subvention: ";
$Body .= $subvention;
$Body .= "\n";

$Body .= "Actuel: ";
$Body .= $actuel;
$Body .= "\n";

$Body .= "Finition: ";
$Body .= $finition;
$Body .= "\n";

$Body .= "Surface: ";
$Body .= $surface;
$Body .= "\n";

$Body .= "Delai: ";
$Body .= $delai;
$Body .= "\n";

$Body .= "Message: ";
$Body .= $message;
$Body .= "\n";

// send email
$success = mail($EmailTo, $Subject, $Body);

// redirect to success page
if ($success && $errorMSG == ""){
   echo "success";
}else{
    if($errorMSG == ""){
        echo "Something went wrong :(";
    } else {
        echo $errorMSG;
    }
}

?>