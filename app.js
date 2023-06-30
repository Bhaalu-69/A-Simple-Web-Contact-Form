const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const config = require('./config.json'); // for databaseConnectionString

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

app.set('view engine', 'pug');
app.set('views', './views');
app.set(express.static('static'));

app.get('/', (req, res) => {
    res.status(200).render('home');
});

app.post('/', (req, res) => {
    res.status(200).render('confirm', { 
        fullNameField : req.body.fullName,
        emailField : req.body.email,
        mobileNumberField : req.body.mobileNumber,
        messageField : req.body.message,
        optionChosenField : req.body.optionChosen,
     });
});

// Taking form-input and saving it to database
app.post('/confirm', (req, res) => {
    const { fullName, email, mobileNumber, optionChosen, message } = req.body;
    const newContact = new Contact({
        fullName: fullName,
        email: email,
        mobileNumber: mobileNumber,
        optionChosen: optionChosen,
        message: message,
    });

    newContact.save()
        .then(() => {
            res.status(200).render('succesful');
        })
        .catch(error => {
            console.log(error);
        });
});

app.listen(port, () => {
    console.log(`Website live on port ${port}`);
});