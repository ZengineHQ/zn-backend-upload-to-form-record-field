'use strict';

const fs = require('fs');

/**
 * Delete Local File
 *
 * @param {string} localPath
 * @returns {boolean}
 */
function deleteLocalFile(localPath) {

	if (fs.existsSync(localPath)) {

		// Suppress Errors
		try {
			fs.unlinkSync(localPath);
		}
		catch (e) {
			return false;
		}

	}

	return true;

}

module.exports = deleteLocalFile;
