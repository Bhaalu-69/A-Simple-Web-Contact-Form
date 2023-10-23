const firebase = require('firebase');

// Fill the following credentials
const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: "",
	measurementId: ""
};
firebase.initializeApp(firebaseConfig);

module.exports = firebase;