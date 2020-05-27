const functions = require('firebase-functions');
const firebase = require('firebase-admin'); //Todo el SDK de Firebase => Acceso a Realtime Database
const express = require('express');
const app = express();

var firebaseConfig = {
    apiKey: "AIzaSyCIQtc0SQbVFf-uws8g5LaTj67cD-9RC9Y",
    authDomain: "nrc-7828-348e6.firebaseapp.com",
    databaseURL: "https://nrc-7828-348e6.firebaseio.com",
    projectId: "nrc-7828-348e6",
    storageBucket: "nrc-7828-348e6.appspot.com",
    messagingSenderId: "15131983374",
    appId: "1:15131983374:web:548f1f6b82b985946f865f"
  };


firebase.initializeApp(firebaseConfig);
//firebase.initializeApp(functions.config().firebase);

const database = firebase.database();

///========================= Variables globales ===================///
const dbPeople = "people"; //Referencia al nodo en donde se van a guardar las personas

///========================= Métodos internos ===================///
function createPerson(person){
  database.ref(dbPeople).push(person);  
}

///========================= Funciones URLs ===================///
app.get('/createPerson', function (req, res) {
  let varName = req.query.name;
  let varAge = req.query.age;
  var person = {
    name : varName,
    age : varAge  };
  createPerson(person);
  return res.json(person);
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

app.get('/', function (req, res) {
  res.send('Bienvenid@s a Desarrollo Web Avanzado NRC 7828')
})

exports.app = functions.https.onRequest(app);
