const utils = require("./utils/utils.js");
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const app = express(); // For rest API Calls
app.use(cors({
  origin: true,
}));

// GET REQUESTS
app.get("/", async (request, response) => {
  const snapshot = await db.collection("users").get();
  const users = [];
  snapshot.forEach((doc) => {
    users.push(utils.unpack.unpack(doc));
  });

  response.status(200).send(JSON.stringify(users));
});

app.get("/:id", async (request, response) => {
  const projects = await db.collection("projects").get();
  const user = await db.collection("users").doc(request.params.id).get();
  const matchedProjects = utils.match.match(user, projects);

  response.status(200).send(JSON.stringify(matchedProjects));
});

// POST REQUESTS
app.post("/userprofile/", (request, response) => {

});

// DELETE REQUESTS
app.delete("/", (request, response) => {

});

// PUT REQUESTS
app.put("/", (request, response) => {

});

exports.user = functions.https.onRequest(app);
