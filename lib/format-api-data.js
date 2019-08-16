'use strict';

/**
 * Format Api Data
 *
 * @param {Object} response
 * @returns {Object[]}
 */
function formatApiData(response) {

	const body = response.getBody();

	return body.data || [];

}

module.exports = formatApiData;
