const functions = require('firebase-functions');
const express = require('express');
const app = express();
const admin = require('firebase-admin');

var serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://desarrollo-web-5c200.firebaseio.com"
});

const database = admin.database();

//========VARIABLES GLOBALES=========//
const dbPeople="persons";
const dbSkills='skills';
//========METODOS INTERNOS ========///
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





//========FUNCIONES URL============///
app.post('/api/persons', function (req, res) {
  let varName = req.body['name'];
  let varAge = req.body['age'];
  var person = {
    name : varName,
    age : varAge  };
  createPerson(person);
  return res.status(201).json({ message: "Success person was added.   :)" });
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
      return res.status(200).json(result); 
    }
  ).catch(err => console.log(err));
});

app.get('/api/person', function(req, res){
  let varId = req.query.id;
  retrievePerson(varId).then(result => {
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
