'use strict';

const fs = require('fs');

const request = require('request');

const mime = require('mime-types');

/**
 * Upload File
 *
 * @param {Object} options
 * @param {string} options.baseUrl
 * @param {number} options.clientId
 * @param {number} options.formId
 * @param {number} options.fieldId
 * @param {string} options.filePath
 * @param {string} options.fileName
 * @returns {Promise<string>} File hash
 */
function uploadFile(options) {

	const {
		baseUrl,
		clientId,
		formId,
		fieldId,
		filePath,
		fileName
	} = options;

	if (!baseUrl || !clientId || !formId || !fieldId || !filePath || !fileName) {
		throw new Error('Missing required params');
	}

	const url = `${baseUrl}/forms/${formId}/uploads?client_id=${clientId}`;

	const upload = fs.createReadStream(filePath);

	const contentType = mime.lookup(fileName) || 'application/octet-stream';

	const data = {
		fieldId: fieldId,
		file: {
			value: upload,
			options: {
				filename: fileName,
				contentType: contentType
			}
		}
	};

	return new Promise(function(resolve, reject) {

		request.post({
			url: url,
			formData: data
		}, function(err, httpResponse, body) {

			if (err) {
				reject(err);
			}

			const jsonData = JSON.parse(body);

			if (!jsonData.data || !jsonData.data.hash) {
				reject(jsonData);
			}

			resolve(jsonData.data.hash);

		});

	});

}

module.exports = uploadFile;
