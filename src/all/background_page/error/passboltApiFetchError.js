/**
 * Network error
 *
 * @copyright (c) 2019 Passbolt SA
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

class PassboltApiFetchError extends Error {
  constructor(message, data) {
    super(message);
    this.data = data || {};
    this.name = 'PassboltApiFetchError';
  }
}

exports.PassboltApiFetchError = PassboltApiFetchError;
