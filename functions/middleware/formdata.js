const Busboy = require("busboy");
const os = require("os");
const fs = require("fs");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();
const bucket = storage.bucket("spring-internship.appspot.com");

exports.filesUpload = function (req, res, next) {
	// See https://cloud.google.com/functions/docs/writing/http#multipart_data
	const busboy = new Busboy({
		headers: req.headers,
		limits: {
			// Cloud functions impose this restriction anyway
			fileSize: 60 * 1024 * 1024,
		},
	});

	const fields = {};
	const files = [];
	const fileWrites = [];
	// Note: os.tmpdir() points to an in-memory file system on GCF
	// Thus, any files in it must fit in the instance's memory.
	const tmpdir = os.tmpdir();

	busboy.on("field", (key, value) => {
		// You could do additional deserialization logic here, values will just be
		// strings
		fields[key] = value;
	});

	busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
		const filepath = path.join(tmpdir, filename);
		console.log(
			`Handling file upload field ${fieldname}: ${filename} (${filepath})`
		);
		const remoteStream = bucket.file(filename).createWriteStream({
			metadata: { contentType: mimetype },
		});
		file.pipe(remoteStream);

		fileWrites.push(
			new Promise((resolve, reject) => {
				file.on("end", () => remoteStream.end());
				remoteStream.on("finish", () => {
					// TODO can I push this file withoud writing in function?
					files.push({
						fieldname,
						originalname: filename,
						encoding,
						mimetype,
					});
					resolve();
				});

				remoteStream.on("error", reject);
			})
		);
	});

	busboy.on("finish", () => {
		Promise.all(fileWrites)
			.then(() => {
				req.body = fields;
				req.files = files;
				next();
				return;
			})
			.catch(next);
	});

	busboy.end(req.rawBody);
};
