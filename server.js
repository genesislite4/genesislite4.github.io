const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // You can change this port as needed

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// POST route for form submission
app.post('/submit-form', (req, res) => {
    const { Name, Email, Message } = req.body;

    // Create a nodemailer transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Replace with your email provider's SMTP server
        port: 587, // Replace with the appropriate port for your email provider
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'your-email@example.com', // Your email address
            pass: 'your-email-password' // Your email password
        }
    });

    // Email message options
    const mailOptions = {
        from: Email,
        to: 'recipient@example.com', // Change this to the recipient's email address
        subject: 'New form submission',
        text: `Name: ${Name}\nEmail: ${Email}\nMessage: ${Message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('There was an error while sending the email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Thanks for getting in touch. We\'ll get back to you soon.');
        }
    });
});

// Serve index.html when accessing root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
