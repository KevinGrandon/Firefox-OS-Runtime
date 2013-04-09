// Modules needed are `require`d, similar to CommonJS modules.
// In this case, creating a Widget that opens a new tab needs both the
// `widget` and the `tabs` modules.
var Widget = require('widget').Widget;
var tabs = require('tabs');


const {Cc, Ci, Cu} = require('chrome');

Cu.import('resource://gre/modules/PermissionPromptHelper.jsm');
Cu.import('resource://gre/modules/ContactService.jsm');

require('permissions');

// Need to disable ipc.security for the browser app.
var prefs = Cc['@mozilla.org/preferences-service;1']
  .getService(Ci.nsIPrefBranch);
prefs.setBoolPref('network.disable.ipc.security', true);

// Need to enable TCP Socket for email
prefs.setBoolPref('dom.mozTCPSocket.enabled', true);

// Disable HTTP caching for now
// This makes working with the system app much easier, due to the iframe caching issue
var prefs = Cc['@mozilla.org/preferences-service;1']
        .getService(Ci.nsIPrefBranch);
prefs.setBoolPref('network.http.use-cache', false);

/**
 * Returns a PageMod definition for a domain and set of files
 */
function getDefinition(domain, files) {

  var data = require('sdk/self').data;

  for (var i = 0, iLen = files.length; i < iLen; i++) {
    files[i] = data.url(files[i]);
  }

  return {
    include: [domain],
    contentScriptFile: files,
    contentScriptWhen: 'start',
    attachTo: ['existing', 'top', 'frame']
  };
}


function injectContent() {
  var PageMod = require('sdk/page-mod').PageMod;

  // Global includes
  PageMod(getDefinition(
    '*.gaiamobile.org',
    [
      'ffos_runtime.js',
      'hardware.js',
      'lib/activity.js',
      'lib/apps.js',
      'lib/bluetooth.js',
      'lib/cameras.js',
      'lib/getdevicestorage.js',
      'lib/idle.js',
      'lib/keyboard.js',
      'lib/mobile_connection.js',
      'lib/power.js',
      'lib/set_message_handler.js',
      'lib/settings.js',
      'lib/wifi.js'
    ]
  ));

  // App specific includes
  PageMod(getDefinition(
    '*.communications.gaiamobile.org',
    [
      'workloads/contacts.js'
    ]
  ));

    PageMod(getDefinition(
    '*.sms.gaiamobile.org',
    [
      'workloads/contacts.js'
    ]
  ));

  PageMod(getDefinition(
    '*.fm.gaiamobile.org',
    [
      'apps/fm.js'
    ]
  ));

  PageMod(getDefinition(
    '*.homescreen.gaiamobile.org',
    [
      'apps/homescreen.js'
    ]
  ));

  PageMod(getDefinition(
    '*.calendar.gaiamobile.org',
    [
      'lib/alarm.js'
    ]
  ));

  PageMod({
    include: ['*.system.gaiamobile.org'],
    onAttach: function(worker) {
      resizeToDevice();
    },
    attachTo: ['existing', 'top', 'frame']
  });
}
injectContent();

exports.main = function() {

  var enabled = false;

  var button = new Widget({
    // Mandatory string used to identify your widget in order to
    // save its location when the user moves it in the browser.
    // This string has to be unique and must not be changed over time.
    id: 'ffos-runtime-widget-1',

    // A required string description of the widget used for
    // accessibility, title bars, and error reporting.
    label: 'FFOS Runtime Active',


    // An optional string URL to content to load into the widget.
    // This can be local content or remote content, an image or
    // web content. Widgets must have either the content property
    // or the contentURL property set.
    //
    // If the content is an image, it is automatically scaled to
    // be 16x16 pixels.
    content: 'FFOS Runtime Active',

    width: 130,

    // Add a function to trigger when the Widget is clicked.
    onClick: function(event) {

    }
  });
};


/**
 * Resize the window to be similar to a device size
 */
function resizeToDevice() {

  var height = 600;
  var width = 320;

  var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);
  var navBrowser = mediator.getMostRecentWindow('navigator:browser');
  navBrowser.window.resizeTo(
    width,
    height
  );
}
