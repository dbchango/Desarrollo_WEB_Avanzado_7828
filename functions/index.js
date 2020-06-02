const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://desarrollo-web-5c200.firebaseio.com/"
});

const database = admin.database();

///========================= Variables globales ===================///
const dbPeople = "persons"; //Referencia al nodo en donde se van a guardar las personas

///========================= Métodos internos ===================///
function createPerson(person){
  database.ref(dbPeople).push(person);  
}

function retrievePerson(id){
  return database.ref(dbPeople).child(id).once('value');
}

function updatePerson(id, person){
  database.ref(dbPeople).child(id).set(person);
}

function deletePerson(id){
  database.ref(dbPeople).child(id).remove();
}

function listPersons(){
  return database.ref(dbPeople).once('value');
}

///========================= Funciones URLs ===================///
app.post('/api/persons', function (req, res) {
  let varName = req.body.name;
  let varAge = req.body.age;
  var person = {
    name : varName,
    age : varAge  
  };
  createPerson(person);
  return res.status(201).json({ message: "Success person was added." });
});

app.get('/api/persons/:id', function(req, res){
  let varId = req.params.id;
  retrievePerson(varId).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});

app.put('/api/persons/:id', function (req, res) {
  let varId = req.params.id;
  let varName = req.body['name'];
  let varAge = req.body['age'];
  var person = {
    name : varName,
    age : varAge  };
  updatePerson(varId, person);
  return res.status(200).json({ message: "Success person was updated." });
});

app.delete('/api/persons/:id',function(req, res){
  let varId = req.params.id;
  deletePerson(varId);
  return res.status(200).json({ message: "Success person was deleted." });
});

app.get('/api/persons', function(req, res){
  listPersons().then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.get('/api/person', function(req, res){
  let varId = req.query.id;
  retrievePerson(varId).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});

app.get('/api/', function (req, res) {
  res.send('Bienvenid@s a Cloud Functions de Desarrollo Web Avanzado NRC 7828')
});

exports.app = functions.https.onRequest(app);
