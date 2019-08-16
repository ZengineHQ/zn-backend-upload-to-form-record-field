'use strict';

const fs = require('fs');

const request = require('request');

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

	return new Promise(function(resolve, reject) {

		const file = fs.createWriteStream(filePath);

		request
			.get(fileUrl, function(err) {

				if (err) {
					reject(err);
				}

				resolve(filePath);

			})
			.pipe(file);

	});

}

module.exports = downloadFile;
