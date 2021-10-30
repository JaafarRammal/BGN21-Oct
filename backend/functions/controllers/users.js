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

app.get("/:id", async (request, response) => {
  const projects = await db.collection("projects").get();
  const user = await db.collection("users").doc(request.params.id).get();
  const matchedProjects = utils.match.match(user, projects);

  response.status(200).send(JSON.stringify(matchedProjects));
});

app.put("/like/:id/:projectId", async (request, response) => {
  const packedUser = await db.collection("users").doc(request.params.id).get();
  const packedProject = await db.collection("projects")
      .doc(request.params.projectId).get();
  const user = utils.unpack.unpack(packedUser);
  const project = utils.unpack.unpack(packedProject);
  const updatedLists = utils.like.like(user, project);
  console.log(updatedLists);
  db.collection("users").doc(user.id).update({
    "likedProjects": updatedLists[0],
  });
  db.collection("projects").doc(project.id).update({
    "likedBy": updatedLists[1],
  });
  response.status(201).send();
});

app.put("/dislike/:id/:projectId", async (request, response) => {
  const packedUser = await db.collection("users").doc(request.params.id).get();
  const packedProject = await db.collection("projects")
      .doc(request.params.projectId).get();
  const user = utils.unpack.unpack(packedUser);
  const project = utils.unpack.unpack(packedProject);
  const updatedLists = utils.like.dislike(user, project);
  db.collection("users").doc(user.id).update({
    "likedProjects": updatedLists[0],
  });
  db.collection("projects").doc(project.id).update({
    "likedBy": updatedLists[1],
  });
  response.status(201).send();
});

exports.user = functions.https.onRequest(app);
