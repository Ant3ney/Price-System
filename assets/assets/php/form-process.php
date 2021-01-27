<?php

$errorMSG = "";

// NAME
if (empty($_POST["name"])) {
    $errorMSG = "Nom manquant! ";
} else {
    $name = $_POST["name"];
}

// VILLE
if (empty($_POST["ville"])) {
    $errorMSG .= "ville manquant! ";
} else {
    $ville = $_POST["ville"];
}

// EMAIL
if (empty($_POST["email"])) {
    $errorMSG .= "Email manquant! ";
} else {
    $email = $_POST["email"];
}


// Phone Number
if (empty($_POST["phone_number"])) {
    $errorMSG .= "Numero manquant! ";
} else {
    $phone_number = $_POST["phone_number"];
}

// TRAVAUX
if (empty($_POST["travaux"])) {
    $errorMSG .= "travaux manquant! ";
} else {
    $travaux = $_POST["travaux"];
}

// REVENU
if (empty($_POST["revenu"])) {
    $errorMSG .= "Revenu manquant!";
} else {
    $revenu = $_POST["revenu"];
}

// MESSAGE
if (empty($_POST["message"])) {
    $errorMSG .= "Message manquant! ";
} else {
    $message = $_POST["message"];
}


$EmailTo = "contact@gafra.fr";

$Subject = "Nouvelle demande de subvention";

// prepare email body text
$Body = "";
$Body .= "nom: ";
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
$Body .= $travaux;
$Body .= "\n";
$Body .= "Revenu: ";
$Body .= $revenu;
$Body .= "\n";
$Body .= "Messages: ";
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