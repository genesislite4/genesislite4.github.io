const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Set up body parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Define a route to handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    const dataString = `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.inquiry}\n\n`;

    // Write form data to a text file
    const filePath = '/Users/toneanmorgan/Downloads/genesis.txt';
    fs.appendFile(filePath, dataString, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            res.status(500).send('Error writing to file');
        } else {
            console.log('Form data written to file');
            // Redirect the user to the specified HTML page
            res.redirect('/Users/toneanmorgan/Downloads/contact/index.html');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
