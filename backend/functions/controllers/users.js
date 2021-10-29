const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")


const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const app = express(); //For rest API Calls
app.use(cors({origin: true}));

//GET REQUESTS
app.get('/', async (request, response) => {
  const snapchot = await db.collection("users").get();
  let users = [];
  snapshot.forEach(doc =>{
    let id = doc.id;
    let data = doc.data;
    users.push({id, ...data});
  });

  res.status(200).send(JSON.stringify(users));
});

//POST REQUESTS
app.post('/userprofile/', (request, response) => {

});

//DELETE REQUESTS
app.delete('/', (request, response) => {

});

//PUT REQUESTS
app.put('/', (request, response) => {

});
