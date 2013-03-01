// Modules needed are `require`d, similar to CommonJS modules.
// In this case, creating a Widget that opens a new tab needs both the
// `widget` and the `tabs` modules.
var Widget = require("widget").Widget
var tabs = require('tabs')


const {Cc,Ci} = require("chrome")

/**
 * Mappings of permissions we need to add to the chrome
 */
var permissionMap = {
	calendar: ['systemXHR', 'tcp-socket'],
	camera: ['camera'],
	communications: ['contacts-read', 'contacts-write', 'contacts-create', 'settings-read', 'settings-write'],
	email: ['systemXHR', 'tcp-socket'],
	homescreen: ['systemXHR', 'tcp-socket', 'webapps-manage'],
	gallery: ['settings-read', 'device-storage:pictures-read', 'device-storage:pictures-write'],
	keyboard: ['settings-read', 'settings-write', 'keyboard'],
	system: ['webapps-manage']
}

/**
 * Adds permissions from mapping
 */
function addPermissions(app, perms) {
	var host = 'http://' + app + '.gaiamobile.org:8080';
	var perm = Cc["@mozilla.org/permissionmanager;1"]
				.createInstance(Ci.nsIPermissionManager)
	var ios = Cc["@mozilla.org/network/io-service;1"]
				.getService(Ci.nsIIOService)
	uri = ios.newURI(host, null, null)

	for (var i=0, eachPerm; eachPerm = perms[i]; i++) {
		perm.add(uri, eachPerm, 1)
	}
}

// Add permissions
for (var i in permissionMap) {
	addPermissions(i, permissionMap[i])	
}

// We need to disable caching
// By default firefox will cache iframes, and we don't want that
// Disabling this for now, the real fix should be in httpd.js
/*
var prefs = Cc["@mozilla.org/preferences-service;1"]
				.getService(Ci.nsIPrefBranch)
prefs.setBoolPref("network.http.use-cache", false);
*/

function injectContent() {
	var data = require("sdk/self").data;
	require('sdk/page-mod').PageMod({
		include: ["*.gaiamobile.org"],
		contentScriptFile: [
			data.url("ffos_runtime.js"),
			data.url("hardware.js"),

			data.url("lib/activity.js"),
			data.url("lib/apps.js"),
			data.url("lib/bluetooth.js"),
			data.url("lib/cameras.js"),
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
	})

	require('sdk/page-mod').PageMod({
		include: ["*.homescreen.gaiamobile.org"],
		contentScriptFile: [
			data.url("apps/homescreen.js")
		],
		contentScriptWhen: "start",
		attachTo: ['existing', 'top', 'frame']
	})

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
	})
}
