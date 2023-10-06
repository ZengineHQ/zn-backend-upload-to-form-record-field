'use strict';

const $getPluginClientId = require('@zenginehq/backend-get-plugin/get-client-id');

const downloadFile = require('./lib/download-file');

const uploadToFormRecord = require('./lib/upload-to-form-record');

const deleteLocalFile = require('./lib/delete-local-file');

/**
 * Upload File to Form Record Field
 *
 * @param {Object} options
 * @param {string} options.baseUrl - API Base URL
 * @param {string} options.namespace - Plugin Namespace
 * @param {number} options.clientId - OAuth Client Id
 * @param {number} options.formId
 * @param {number} options.recordId
 * @param {number} options.fieldId
 * @param {number} options.filePath - Local Path or Remote Url to File
 * @param {number} options.fileName - Upload Filename
 * @param {boolean} options.isComplete - Is the record complete ?
 */
async function uploadToFormRecordField(options) {

	const {
		baseUrl = 'https://api.zenginehq.com/v1',
		namespace,
		formId,
		recordId,
		fieldId,
		filePath,
		fileName,
		isComplete
	} = options;

	let {
		clientId
	} = options;

	if ((!clientId && !namespace) || !formId || !recordId || !fieldId || !filePath || !fileName) {
		throw new Error('Missing required params');
	}

	// Get Client Id from Namespace
	if (!clientId) {
		clientId = await $getPluginClientId(namespace);
	}

	if (!clientId) {
		throw new Error('Plugin must be `offline` mode and have an OAuth 2 client id');
	}

	let localPath = filePath;

	// Download Remote Url to Local File
	if (filePath.substring(0, 4) === 'http') {
		localPath = await downloadFile(filePath);
	}

	// Cleanup Local File
	function cleanup() {

		if (localPath !== filePath) {
			return deleteLocalFile(localPath);
		}

		return true;

	}

	try {

		// Upload File and Save to Record
		await uploadToFormRecord({
			baseUrl,
			clientId,
			formId,
			recordId,
			fieldId,
			filePath: localPath,
			fileName,
			isComplete
		});

	}
	catch (e) {

		// Still Cleanup if Upload Fails
		cleanup();

		throw e;

	}

	cleanup();

	return true;

}

module.exports = uploadToFormRecordField;
