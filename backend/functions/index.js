const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors")

const app = express(); //For rest API Calls
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


//GET REQUESTS
app.get('/', (request, response) => {

});

//POST REQUESTS
app.post('/', (request, response) => {

});

//DELETE REQUESTS
app.delete('/', (request, response) => {

});

//PUT REQUESTS
app.put('/', (request, response) => {

});
