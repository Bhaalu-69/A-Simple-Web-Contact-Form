// Import necessary modules
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Import configuration file for the database connection
const config = require('./config.json'); // for databaseConnectionString

// Main function to establish a connection to MongoDB
main().catch(err => console.log(err));

async function main() {
    // Establishes connection to MongoDB
    await mongoose.connect(config.databaseConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

// Define the schema for the 'Contact' model
const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    mobileNumber: Number,
    optionChosen: String,
    message: String,
});

// Create a 'Contact' model
let Contact = mongoose.model('Contact', contactSchema);

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
    res.status(200).render('confirm', {
        fullNameField: req.body.fullName,
        emailField: req.body.email,
        mobileNumberField: req.body.mobileNumber,
        messageField: req.body.message,
        optionChosenField: req.body.optionChosen,
    });
});

// Handle POST request to save form input to the database
app.post('/confirm', (req, res) => {
    // Extract form input data
    const { fullName, email, mobileNumber, optionChosen, message } = req.body;

    // Create a new 'Contact' document
    const newContact = new Contact({
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
        optionChosen: optionChosen,
        message: message,
    });

    // Save the new 'Contact' document to the database
    newContact.save()
        .then(() => {
            res.status(200).render('succesful'); // Render the 'successful' template
        })
        .catch(error => {
            console.log(error);
        });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Website live on port ${port}`);
});