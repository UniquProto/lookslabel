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

//----------------------------------------

/**
 * get
 * returns json data from firestore
 */
router.get("/", (request, response) => {
	let uid = sessionstorage.getItem("uid");
	const webCamRef = profileRef.doc(uid).collection("Web Cam");
	// response.json(uid);
	webCamRef
		.get()
		.then((snapshot) => {
			let data = snapshot.docs.map((doc) => {
				let x = doc.data();

				return x;
			});
			return response.status(200).json(data);
		})
		.catch((err) => {
			err;
		});
});

/**
 * web cam route
 * post
 * clicks photo saves to cloud storage saves to data base
 */

router.post("/", (request, response) => {
	let uid = sessionstorage.getItem("uid");
	const data = request.body;
	const timestamp = new Date(fireStore.Timestamp.now().seconds * 1000);
	(date = timestamp.getDate()),
		(month = timestamp.getMonth()),
		(year = timestamp.getFullYear()),
		(hours = timestamp.getHours()),
		(minutes = timestamp.getMinutes());

	data.timestamp = `${date}/${month}/${year} || ${
		hours >= 12 ? hours - 12 : hours
	}:${minutes}`;
	console.log(data.timestamp);

	data._id = v4().split("-").pop();
	//----------------
	const webCamRef = profileRef.doc(uid).collection("Web Cam").doc(data._id);

	//converting data-url to image
	let imgString = data.image64.split(";base64,").pop();

	const bufferImg = Buffer.from(imgString, "base64");

	// Upload the image to the bucket
	const file = bucket.file(`${data._id}.png`);
	const file_stream = file.createWriteStream({
		contentType: "image/png",
		resumable: false,
	});
	file_stream.write(bufferImg, (err) => {
		if (err) {
			console.log(err);
		}
		//setting firestore image attribute to the url
		data.image64 = `https://storage.googleapis.com/spring-internship.appspot.com/${data._id}.png`;
		webCamRef.set(data); // can send to firestore
		console.log("upload finished");
	});
	file_stream.end();
	response.end();
});

module.exports = router;
