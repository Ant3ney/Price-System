<?php

$errorMSG = "";


// Phone Number
if (empty($_POST["phone_number"])) {
    $errorMSG .= "Numero manquant! ";
} else {
    $phone_number = $_POST["phone_number"];
}


$EmailTo = "contact@gafra.fr";

$Subject = "Nouvelle demande de rappel telephonique";

// prepare email body text
$Body = "";

$Body .= "Phone Number: ";
$Body .= $phone_number;
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