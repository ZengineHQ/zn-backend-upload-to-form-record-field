'use strict';

const fs = require('fs');

const https = require('https');

const uuidv4 = require('uuid/v4');

/**
 * Download Remote File
 *
 * @param {string} fileUrl
 * @returns {Promise<string>} Local file path
 */
function downloadFile(fileUrl) {

	// Random Local Filename
	const filePath = '/tmp/' + uuidv4();

	const file = fs.createWriteStream(filePath);

	return new Promise((resolve, reject) => {
		https.get(fileUrl, function (response) {
			response.pipe(file);
		}).on('error', function (err) {
			reject(err);
		});

		file.on('finish', function () {
			resolve(filePath);
		});
	});

}

module.exports = downloadFile;
