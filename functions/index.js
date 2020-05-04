const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
//-----------
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });
//-----------

//middlewares
app.use(cors());
app.use(express.static("../public"));
app.use(express.json({ limit: "50mb" }));

//profile route
const profile = require("./routes/profile");
app.use("/api/profile", profile);

// webcam route
const webCam = require("./routes/webCam");
app.use("/api/webcam", webCam);

//Pics upload route
const picsUpload = require("./routes/picsUpload");
app.use("/api/upload", picsUpload);

//Listening
exports.app = functions.https.onRequest(app);
