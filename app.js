// Import necessary modules
const firebase = require('./firebase-credentials.js');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the Pug template engine
app.set('view engine', 'pug'); // Sets PUG as the template engine
app.set('views', './views');

// Serve static files from the 'static' directory
app.use(express.static('static'));

// Define a route for the homepage
app.get('/', (req, res) => {
    res.status(200).render('home'); // Render the 'home' template
});

// Handle POST request when the form is submitted
app.post('/', (req, res) => {
    // Render the 'confirm' template with form data
    res.status(200).render('confirm', {
        fullNameField: req.body.fullName,
        emailField: req.body.email,
        mobileNumberField: req.body.mobileNumber,
        optionChosenField: req.body.optionChosen,
        messageField: req.body.message,
    });
});

// Handle POST request to save form input to the database
app.post('/confirm', (req, res) => {

    // Extract form input data
    const { fullName, email, mobileNumber, optionChosen, message } = req.body;

    const locationInDatabase = firebase.database().ref('FormEntries');
    const newEntryRef = locationInDatabase.push(); // Generate a new unique key

    let entryData = {
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
        optionChosen: optionChosen,
        message: message,
    };

    // Save the form data to Firebase database
    newEntryRef.set(entryData, (err) => {
        if (!err) {
            res.status(200).render('successful'); // Render the 'successful' template
        } else {
            console.error('\nError writing to Firebase: ', err);
        }
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Website live on port ${port}`);
});
