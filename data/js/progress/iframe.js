/**
 * progress iframe control.
 *
 * It has for aim to control the progress dialog iframe.
 * 	- Add the iframe to the application page. The progressDialogPagemod
 * 	  will detect it and will control its DOM.
 * 	- Close the iframe.
 *
 * @copyright (c) 2015-present Bolt Softwares Pvt Ltd
 * @licence GNU Affero General Public License http://www.gnu.org/licenses/agpl-3.0.en.html
 */

// Open the progress dialog.
// Listen to the event : passbolt.progress.open-dialog
passbolt.message.on('passbolt.progress.open-dialog', function(title, goals) {
	var url = 'about:blank?passbolt=progressDialog&title=' + title + '&goals=' + goals;

	// Add the progress iframe.
	var $iframe = $('<iframe/>', {
		id: 'passbolt-iframe-progress-dialog',
		src: url,
		class: 'passbolt-plugin-dialog',
		frameBorder: 0
	});
	$iframe.appendTo('body');
});

// Close the progress dialog.
// Listen to the event : passbolt.progress.close-dialog
passbolt.message.on('passbolt.progress.close-dialog', function(wait) {
	setTimeout(function() {
		$('#passbolt-iframe-progress-dialog').fadeOut(300, function() {
			$(this).remove();
		});
	}, wait ? wait : 0);
});
