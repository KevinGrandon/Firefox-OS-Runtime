// Modules needed are `require`d, similar to CommonJS modules.
// In this case, creating a Widget that opens a new tab needs both the
// `widget` and the `tabs` modules.
var Widget = require("widget").Widget
var tabs = require('tabs')


const {Cc,Ci} = require("chrome")

/**
 * Adds cross-domain XHR
 */
function addXHRPermission(app) {
	var host = 'http://' + app + '.gaiamobile.org:8080';
	var perm = Cc["@mozilla.org/permissionmanager;1"]
				.createInstance(Ci.nsIPermissionManager)
	var ios = Cc["@mozilla.org/network/io-service;1"]
				.getService(Ci.nsIIOService)
	uri = ios.newURI(host, null, null)
	perm.add(uri, 'systemXHR', 1)
	perm.add(uri, 'tcp-socket', 1)
}

// Add cross-domain XHR for all apps that need it
['calendar', 'email', 'homescreen'].forEach(addXHRPermission)


// Email permissions
var host = 'http://email.gaiamobile.org:8080';
var perm = Cc["@mozilla.org/permissionmanager;1"]
            .createInstance(Ci.nsIPermissionManager)
var ios = Cc["@mozilla.org/network/io-service;1"]
            .getService(Ci.nsIIOService)
uri = ios.newURI(host, null, null)
perm.add(uri, 'systemXHR', 1)
perm.add(uri, 'tcp-socket', 1)

function injectContent() {
	var data = require("sdk/self").data;
	require('sdk/page-mod').PageMod({
		include: ["*.gaiamobile.org"],
		contentScriptFile: [
			data.url("manifests.js"),
			data.url("ffos_runtime.js"),
			data.url("lib/apps.js"),
			data.url("lib/bluetooth.js"),
			data.url("lib/idle.js"),
			data.url("lib/keyboard.js"),
			data.url("lib/mobile_connection.js"),
			data.url("lib/power.js"),
			data.url("lib/set_message_handler.js"),
			data.url("lib/settings.js"),
			data.url("lib/wifi.js")
		],
		contentScriptWhen: "start",
		attachTo: ['existing', 'top', 'frame']
	});
}
injectContent()

exports.main = function() {
	
	var enabled = false

	var button = new Widget({
		// Mandatory string used to identify your widget in order to
		// save its location when the user moves it in the browser.
		// This string has to be unique and must not be changed over time.
		id: "ffos-runtime-widget-1",

		// A required string description of the widget used for
		// accessibility, title bars, and error reporting.
		label: "FFOS Runtime Active",


		// An optional string URL to content to load into the widget.
		// This can be local content or remote content, an image or
		// web content. Widgets must have either the content property
		// or the contentURL property set.
		//
		// If the content is an image, it is automatically scaled to
		// be 16x16 pixels.
		content: "FFOS Runtime Active",

		width: 130,

		// Add a function to trigger when the Widget is clicked.
		onClick: function(event) {

		}
	});
};
