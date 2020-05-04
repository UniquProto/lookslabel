getData();

const selfies = [];
//sorting data by time
document.getElementById("time").addEventListener("click", (event) => {
	sortData((a, b) => b.time - a.time);
});
//sorting data by landmark
document.getElementById("landmark").addEventListener("click", (event) => {
	sortData((a, b) => {
		if (b.landmark > a.landmark) return -1;
		else return 1;
	});
});
//value from event listener goes to this function (callback -> 'compare' parameter)
function sortData(compare) {
	for (let item of selfies) {
		item.elt.remove();
	}
	selfies.sort(compare);
	for (let item of selfies) {
		document.body.append(item.elt);
	}
}

async function getData() {
	const response = await fetch("/api/webcam");
	const data = await response.json(); //response.json is fetched here

	for (let item of data) {
		const root = document.createElement("p");
		const landmark = document.createElement("div");
		const geo = document.createElement("div");
		const date = document.createElement("div");
		const image = document.createElement("img");

		landmark.textContent = `landmark: ${item.landmark}`;
		geo.textContent = `${item.lat}°, ${item.lon}°`;
		const dateString = item.timestamp;
		date.textContent = dateString;
		image.src = item.image64;
		image.alt = "image unavilabe";
		//-----------------Todo: take this function outside of this function

		// const photos = document.createElement('input');
		// photos.setAttribute('type', 'file');
		// photos.multiple = true;
		// const submit = document.createElement('button');
		// submit.setAttribute('type', 'submit');
		// submit.innerText = 'Upload';

		// submit.addEventListener('click', () => {
		// 	const formData = new FormData();
		// 	console.log(item._id);
		// 	formData.append('_id', item._id);

		// 	for (let i = 0; i < photos.files.length; i++) {
		// 		formData.append('photos', photos.files[i]);
		// 	}
		// 	fetch('/api/multi-upload', {
		// 		method: 'POST',
		// 		body: formData,
		// 	})
		// 		.then((response) => response.json())
		// 		.then((result) => {
		// 			console.log('Success:', result);
		// 		})
		// 		.catch((error) => {
		// 			console.error('Error:', error);
		// 		});
		// });

		//-------------------

		root.append(landmark, geo, date, image);
		// console.log(item._id);
		selfies.push({
			elt: root,
			time: item.timestamp,
			landmark: item.landmark,
		});
		document.body.append(root);
	}
	console.log(data);
}
