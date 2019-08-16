'use strict';

const uploadFile = require('./upload-file');

const saveRecord = require('./save-record');

/**
 * Upload File to Form Record
 *
 * @param {Object} options
 * @param {string} options.baseUrl
 * @param {number} options.clientId
 * @param {number} options.formId
 * @param {number} options.recordId
 * @param {number} options.fieldId
 * @param {number} options.filePath
 * @param {number} options.fileName
 * @returns {Promise<Object>}
 */
async function uploadToFormRecord(options) {

	const {
		baseUrl,
		clientId,
		formId,
		recordId,
		fieldId,
		filePath,
		fileName
	} = options;

	const hash = await uploadFile({
		baseUrl,
		clientId,
		formId,
		fieldId,
		filePath,
		fileName
	});

	let data = {};

	data['field' + fieldId] = hash;

	return saveRecord({
		formId,
		recordId,
		data
	});

}

module.exports = uploadToFormRecord;
