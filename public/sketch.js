let uid = null;

firebase.auth().onAuthStateChanged(async function (user) {
	if (user) {
		const profile = {
			name: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
		};
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(profile),
		};

		try {
			await fetch("/api/profile", options);
		} catch (error) {
			console.log(error);
		}
		// console.log(res);
	} else {
		uid = null;
		window.location.replace("auth.html");
	}
});
function logOut() {
	firebase.auth().signOut();
}

function setup() {
	noCanvas();
	const video = createCapture(VIDEO);
	video.size(160, 120);
	let lat, lon;
	const button = document.getElementById("submit");
	button.addEventListener("click", async (event) => {
		const landmark = document.getElementById("landmark").value;
		video.loadPixels();
		const image64 = video.canvas.toDataURL();
		const uid = firebase.auth().currentUser.uid;
		const data = { lat, lon, landmark, image64, uid };
		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		try {
			await fetch("/api/webcam", options);
		} catch (error) {
			console.log(error);
		}
	});

	if ("geolocation" in navigator) {
		console.log("geolocation available");
		navigator.geolocation.getCurrentPosition((position) => {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			console.log(lat, lon);
			document.getElementById("latitude").textContent = lat;
			document.getElementById("longitude").textContent = lon;
		});
	} else {
		console.log("geolocation not available");
	}
}
//------------------------------------------------------
