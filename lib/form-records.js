'use strict';

const znHttp = require('../../../../lib/zn-http');

const formatApiData = require('./format-api-data.js');

/**
 * Form Records
 *
 * @param {number} formId
 * @returns {Object}
 */
function formRecords(formId) {

	/**
	 * Get Form Record
	 *
	 * @param {number} id
	 * @returns {Object}
	 */
	function get(id) {

		return znHttp().get('/forms/' + formId + '/records/' + id)
			.then(formatApiData);

	}

	/**
	 * Update Form Record
	 *
	 * @param {number} id
	 * @returns {Object}
	 */
	function put(id, data, options) {

		return znHttp().put('/forms/' + formId + '/records/' + id, data, options)
			.then(formatApiData);

	}

	return {
		get,
		put
	};

};

module.exports = formRecords;
