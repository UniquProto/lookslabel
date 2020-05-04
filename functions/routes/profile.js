const router = require("express").Router();

var sessionstorage = require("sessionstorage");
const fireStore = require("@google-cloud/firestore");
const { v4 } = require("uuid");
const { Storage } = require("@google-cloud/storage");
//Firestore init--------------------------
var admin = require("firebase-admin");

const db = admin.firestore();
const storage = new Storage();
const bucket = storage.bucket("spring-internship.appspot.com");
//REFS
const profileRef = db.collection("User Profile");
let uid = sessionstorage.getItem("uid");

//----------------------------------------

//Creating A user profile
//TODO profile
router.post("/", (req, res) => {
	const profile = req.body;
	// req.session.uid = profile.uid;
	//session
	uid = profile.uid;
	sessionstorage.setItem("uid", uid);
	const docRef = profileRef.doc(profile.uid);
	const docObj = docRef.get().then((doc) => {
		return doc.data();
	});

	if (docRef.uid !== docObj.uid) {
		uid = profile.uid;
		profile.tags = docObj.tags;
		docRef.set(profile);
		res.end();
	} else {
		uid = profile.uid;
		res.end();
	}
});

module.exports = router;
