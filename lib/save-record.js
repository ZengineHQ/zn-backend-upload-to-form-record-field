'use strict';

const formRecords = require('./form-records');

/**
 * Save Record
 *
 * @param {Object} options
 * @param {number} options.formId
 * @param {number} options.recordId
 * @param {Object} options.data
 * @returns {Promise<Object>}
 */
async function saveRecord(options) {

	const {
		formId,
		recordId,
		data
	} = options;

	const form = formRecords(formId);

	const record = await form.get(recordId);

	// Keep Draft Record as Draft
	if (!record.isComplete) {

		data.isComplete = false;

		data.validate = false;

	}

	// Save If Not Modified
	return form.put(recordId, data, {
		headers: {
			'X-If-ObjectVersion-Matches': record.objectVersion
		}
	});

}

module.exports = saveRecord;
