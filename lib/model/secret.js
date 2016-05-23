/**
 * Secret model.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

const { defer } = require('sdk/core/promise');
var Validator = require('../vendors/validator');
var Config = require("./config");
var Request = require("sdk/request").Request;
var __ = require("sdk/l10n").get;

/**
 * The class that deals with secrets.
 */
var Secret = function() {
};

/**
 * Validate secret fields individually
 * @param field
 * @param value
 * @returns {boolean}
 * @private
 */
Secret.prototype.__validate = function(field, value) {
	switch (field) {
		case 'data':
			if(Validator.isNull(value)) {
				throw new Error(__('This information is required'))
			}
			break;
		default :
			throw new Error(__('No validation defined for field: ' + field));
			break;
	}
	return true;
};

/**
 * Validate a secret, and return fields with errors in case of failure.
 *
 * @param secret
 * @param fields
 */
Secret.prototype.validate = function(secret, fields) {
	if (fields == undefined) {
		fields = ['data'];
	}

	var errors = [];
	for (var i in fields) {
		var fieldName = fields[i];
		try {
			this.__validate(fieldName, secret[fieldName]);
		} catch(e) {
			var fieldError = {};
			fieldError[fieldName] = e.message;
			errors.push(fieldError);
		}
	}

	if (errors.length > 0) {
		// Return exception with details in validationErrors.
		var e = new Error(__('secret could not be validated'));
		// Add validation errors to the error object.
		e.validationErrors = errors;
		throw e;
	}

	return secret;
};

// Exports the Secret object.
exports.Secret = Secret;