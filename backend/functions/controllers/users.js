const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const lib = require("./utils/match");

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
    const id = doc.id;
    const data = doc.data;
    users.push({
      id,
      ...data,
    });
  });

  response.status(200).send(JSON.stringify(users));
});

app.get("/:id", async (request, response) => {
  const projects = await db.collection("projects").get();
  const user = db.collection("users").doc(request.params.id).get();
  const matchedProjects = lib.match(user, projects);

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
