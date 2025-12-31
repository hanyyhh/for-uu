<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "lezharhany@gmail.com";
    $subject = "New Student Registration - IPIATE";
    
    $message = "Registration Details:\n\n";
    foreach ($_POST as $key => $value) {
        $message .= "$key: $value\n";
    }
    
    $headers = "From: " . $_POST['email'];
    
    if (mail($to, $subject, $message, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Message could not be sent.";
    }
}
?>