<?php
if (isset($_POST['email'])) {
    // EDIT THE FOLLOWING TWO LINES:
    $email_to = "toneanmorgan@gmail.com";
    $email_subject = "New form submission";



    // validation expected data exists
    if (!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['inquiry'])) {
        problem('We are sorry, but there appears to be a problem with the form you submitted.');
    }

    $name = $_POST['name']; // required
    $email = $_POST['email']; // required
    $inquiry = $_POST['inquiry']; // required

    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';



    $string_exp = "/^[A-Za-z .'-]+$/";



    $email_message = "Form details below.\n\n";
    $email_message .= "Name: " . clean_string($name) . "\n";
    $email_message .= "Email: " . clean_string($email) . "\n";
    $email_message .= "Inquiry: " . clean_string($inquiry) . "\n";

    // create email headers
    $headers = 'From: ' . $email . "\r\n" .
               'Reply-To: ' . $email . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send email
    if (@mail($email_to, $email_subject, $email_message, $headers)) {
        // Save to genesis.txt
        save_to_file($name, $email, $inquiry);
        
        // Redirect after sending email
        header("Location: thankyou.html");
        exit; // Make sure to exit after redirection
    } else {
        // Handle email sending failure
        echo "Failed to send email. Please try again later.";
    }
}

function clean_string($string) {
    $bad = array("content-type", "bcc:", "to:", "cc:", "href");
    return str_replace($bad, "", $string);
}

function save_to_file($name, $email, $inquiry) {
    $file = 'genesis.txt';
    $current = file_get_contents($file);
    $current .= "Name: " . $name . "\n";
    $current .= "Email: " . $email . "\n";
    $current .= "Inquiry: " . $inquiry . "\n\n";
    file_put_contents($file, $current);
}
?>
