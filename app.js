const config = require('./config.json');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

main().catch(err => console.log(err));
let Contact;
async function main() {
    await mongoose.connect(config.databaseConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

const contactSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    mobileNumber: Number,
    optionChosen: String,
    message: String,
});
Contact = mongoose.model('Contact', contactSchema);

// Serve static files from the "public" directory
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/home.html');
});

app.post('/', async (req, res) => {
    const { fullName, email, mobileNumber, optionChosen, message } = req.body;
    const newContact = new Contact({
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
        optionChosen: optionChosen,
        message: message,
    });

    await newContact.save()
        .then(() => {
            res.status(200).send("Ok!");
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`Website live on port ${port}`);
});