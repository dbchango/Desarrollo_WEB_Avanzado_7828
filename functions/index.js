const functions = require('firebase-functions');
const express = require('express');
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hola desde mi proyecto de Desarrollo WEB - NRC 7828");
});

app.get('/', function(req, res){
    res.send('Hello world')
})

exports.app = functions.https.onRequest(app);