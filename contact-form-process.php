<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    if (!empty($email)) {
        $file = '/Users/toneanmorgan/Downloads/genesis.txt';
        file_put_contents($file, $email . PHP_EOL, FILE_APPEND | LOCK_EX);
        echo "Thank you for subscribing!";
    } else {
        echo "Please enter a valid email address.";
    }
}
?>
