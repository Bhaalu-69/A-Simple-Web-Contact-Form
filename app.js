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
    emailSubject: String,
    message: String,
});
Contact = mongoose.model('Contact', contactSchema);

// Serve static files from the "public" directory
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/index.html');
});

app.post('/', async (req, res) => {
    const { fullName, email, mobileNumber, emailSubject, message } = req.body;
    console.log(fullName, email);
    const newContact = new Contact({
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
        emailSubject: emailSubject,
        message: message,
    });

    await newContact.save();
    res.send("Ok!")
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});