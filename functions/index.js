const functions = require('firebase-functions');
const express = require('express');
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hola desde mi proyecto de Desarrollo WEB - NRC 7828");
});

var firebaseConfig = {
    apiKey: "AIzaSyCVdID4onZ8AxgvLjKMDRpQB4Els_v5_C0",
    authDomain: "nrc-7828-4ad7b.firebaseapp.com",
    databaseURL: "https://nrc-7828-4ad7b.firebaseio.com",
    projectId: "nrc-7828-4ad7b",
    storageBucket: "nrc-7828-4ad7b.appspot.com",
    messagingSenderId: "959394624946",
    appId: "1:959394624946:web:3c8068af9e4ab51ac820ab"
  };

app.get('/', function(req, res){
    res.send('Hello world')
})

exports.app = functions.https.onRequest(app);

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

