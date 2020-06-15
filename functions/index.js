const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');

var serviceAccount = require("../serviceAccountKey.json");
<<<<<<< HEAD

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nrc-7828-4ad7b.firebaseio.com/"
});

=======


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://desarrollo-web-5c200.firebaseio.com/"
});

<<<<<<< HEAD

const database =admin.database();

//========VARIABLES GLOBALES=========//
const dbPeople="persons";
const dbSkills='skills';
//========METODOS INTERNOS ========///
=======
>>>>>>> 1a5569ab04bb6bac623114d28bac559517d89f9f
const database = admin.database();

///========================= Variables globales ===================///
const dbPeople = "persons"; //Referencia al nodo en donde se van a guardar las personas
<<<<<<< HEAD
const dbSkills = "skills";
=======

>>>>>>> 1a5569ab04bb6bac623114d28bac559517d89f9f
///========================= Métodos internos ===================///
>>>>>>> 9df27c6a977d0b681c31e719300b9c17af0590e5
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
///SKILL
function createSkills(id,skill){
  database.ref(dbPeople).child(id).child(dbSkills).push(skill);
}

function deleteSkills(id,idSkill){
  database.ref(dbPeople).child(id).child(dbSkills).child(idSkill).remove();
}

function listSkill(id){
  return database.ref(dbPeople).child(id).child(dbSkills).once('value');
 ;
}

function updateSkills(id,idSkills, skill){
  database.ref(dbPeople).child(id).child(dbSkills).child(idSkills).set(skill);
}
function retrieveSkills(id,idSkills){
  return database.ref(dbPeople).child(id).child(dbSkills).child(idSkills).once('value');
}

<<<<<<< HEAD




//========FUNCIONES URL============///
app.post('/api/persons', function (req, res) {
  let varName = req.body['name'];
  let varAge = req.body['age'];
=======
<<<<<<< HEAD
///////////////////////////////////////////////////////////////////
function createSkills(skill){
  database.ref(dbSkills).push(skill);  
}

function retrieveSkills(id){
  return database.ref(dbSkills).child(id).once('value');
}

function updateSkills(id, skill){
  database.ref(dbSkills).child(id).set(skill);
}

function deleteSkills(id){
  database.ref(dbSkills).child(id).remove();
}

function listSkills(){
  return database.ref(dbSkills).once('value');
}

/////////////////////////////////////////////////////////////////
function listPersonsByAge(){

}

///========================= Funciones URLs ===================///
app.post('/api/persons', function (req, res) {
  let varName = req.body['name'];
  let varAge = req.body['age'];
=======
///========================= Funciones URLs ===================///
app.post('/api/persons', function (req, res) {
  let varName = req.body.name;
  let varAge = req.body.age;
>>>>>>> 1a5569ab04bb6bac623114d28bac559517d89f9f
>>>>>>> 9df27c6a977d0b681c31e719300b9c17af0590e5
  var person = {
    name : varName,
    age : varAge  };
  createPerson(person);
<<<<<<< HEAD
  return res.status(201).json({ message: "Success person was added.   :)" });
=======
  return res.status(201).json({ message: "Success person was added." });
<<<<<<< HEAD
});

app.get('/api/persons/:id', function(req, res){
  let varId = req.params.id;
  retrievePerson(varId).then(result => {
=======
>>>>>>> 9df27c6a977d0b681c31e719300b9c17af0590e5
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
  return res.status(200).json({ message: "Success person was updated.   :)" });
});

app.delete('/api/persons/:id',function(req, res){
  let varId = req.params.id;
  deletePerson(varId);
  return res.status(200).json({ message: "Success person was deleted.   -_-" });
});

app.get('/api/persons', function(req, res){
  listPersons().then(result => {
>>>>>>> 1a5569ab04bb6bac623114d28bac559517d89f9f
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});
<<<<<<< HEAD

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
=======

app.get('/api/person', function(req, res){
  let varId = req.query.id;
  retrievePerson(varId).then(result => {
>>>>>>> 1a5569ab04bb6bac623114d28bac559517d89f9f
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});
///=====CRUD SKILLS======////
app.post('/api/persons/:id/skills', function (req, res) {
 
  var skill = {
    name :req.body['name'],
    hours : req.body['hours'],
    date: req.body['date'],
    endorsed:req.body['endorsed']
  };
  createSkills(req.params.id,skill);
  return res.status(201).json({ message: "Success skill was added to person.   :)" });
});

<<<<<<< HEAD
//eliminar
app.delete('/api/persons/:id/skills/:idSkill',function(req, res){
  let varId=req.params.id;
  let varidSkill = req.params.idSkill;
  deleteSkills(varId, varidSkill);
  return res.status(200).json({ message: " Delete SKILLd.   -_-" });
});

//actualizar
app.put('/api/persons/:id/skills/:idSkills', function (req, res) {
  let varId=req.params.id;
  let varidSkills = req.params.idSkills;
  var skill = {
    name :req.body['name'],
    hours : req.body['hours'],
    date: req.body['date'],
    endorsed:req.body['endorsed']
  };
  updateSkills(varId,varidSkills, skill);
  return res.status(200).json({ message: "Se actualizo skills.   :)" });
});
//listar
app.get('/api/persons/:id/skills', function(req, res){
  listSkill(req.params.id).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
=======
<<<<<<< HEAD

app.get('/api/person', function(req, res){
  let varId = req.query.id;
  retrievePerson(varId).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});


//////////////////////////////////////////





=======
>>>>>>> 1a5569ab04bb6bac623114d28bac559517d89f9f
app.get('/api/', function (req, res) {
  res.send('Bienvenid@s a Cloud Functions de Desarrollo Web Avanzado NRC 7828')
>>>>>>> 9df27c6a977d0b681c31e719300b9c17af0590e5
});

//retrieve

app.get('/api/persons/:id/skills/:idSkills', function(req, res){
  let varId=req.params.id;
  let varIdSkills = req.params.idSkills;
  retrieveSkills(varId,varIdSkills).then(result => {
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});



exports.app = functions.https.onRequest(app);
