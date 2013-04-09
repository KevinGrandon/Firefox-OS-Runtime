// Modules needed are `require`d, similar to CommonJS modules.
// In this case, creating a Widget that opens a new tab needs both the
// `widget` and the `tabs` modules.
var Widget = require('widget').Widget;
var tabs = require('tabs');


const {Cc, Ci, Cu} = require('chrome');

Cu.import('resource://gre/modules/PermissionPromptHelper.jsm');
Cu.import('resource://gre/modules/ContactService.jsm');

/**
 * Mappings of permissions we need to add to the chrome
 */
var permissionMap = {
  browser: ['browser', 'systemXHR', 'settings-read', 'geolocation', 'desktop-notification'],
  calendar: ['systemXHR', 'tcp-socket'],
  camera: ['camera'],
  communications: ['contacts-read', 'contacts-write', 'contacts-create', 'settings-read', 'settings-write'],
  email: ['contacts-read', 'contacts-write', 'desktop-notification', 'settings-read', 'settings-write', 'systemXHR', 'tcp-socket'],
  homescreen: ['systemXHR', 'tcp-socket', 'webapps-manage'],
  gallery: ['settings-read', 'device-storage:pictures-read', 'device-storage:pictures-write'],
  keyboard: ['settings-read', 'settings-write', 'keyboard'],
  system: ['webapps-manage'],
  sms: ['contacts-read', 'contacts-write', 'contacts-create']
};

/**
 * Adds permissions from mapping
 */
function addPermissions(app, perms) {
  var host = 'http://' + app + '.gaiamobile.org:8080';
  var perm = Cc['@mozilla.org/permissionmanager;1']
        .createInstance(Ci.nsIPermissionManager);
  var ios = Cc['@mozilla.org/network/io-service;1']
        .getService(Ci.nsIIOService);
  uri = ios.newURI(host, null, null);

  for (var i = 0, eachPerm; eachPerm = perms[i]; i++) {
    perm.add(uri, eachPerm, 1);
  }
}

// Add permissions
for (var i in permissionMap) {
  addPermissions(i, permissionMap[i]);
}

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

var data = require('sdk/self').data;
var pluginPanel =  require("sdk/panel").Panel({
  width: 300,
  height: 200,
  contentURL: data.url("panel/main.html"),
  contentScriptFile: data.url("panel/main.js")
});

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

    panel: pluginPanel
  });
};

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
pluginPanel.on('show', function() {
  pluginPanel.port.emit("show");
});
 
// Listen for messages called "install-app" coming from the content script.
pluginPanel.port.on('install-app', function () {
  console.log('Installing application.');

  Cu.import('resource://gre/modules/Services.jsm');
  let win = Services.wm.getMostRecentWindow('navigator:browser');

  let fp = Cc['@mozilla.org/filepicker;1'].createInstance(Ci.nsIFilePicker);
  fp.init(win, 'Select a Web Application Manifest', Ci.nsIFilePicker.modeOpen);
  fp.appendFilter('Webapp Manifest', '*.webapp');
  fp.appendFilters(Ci.nsIFilePicker.filterAll);

  let ret = fp.show();
  if (ret == Ci.nsIFilePicker.returnOK || ret == Ci.nsIFilePicker.returnReplace) {
    let manifestFile = fp.file.path;
    console.log('Selected manifest ' + manifestFile);

    // Insert data into profile/webapps/webapps.json
    let currProfD = Services.dirsvc.get("ProfD", Ci.nsIFile);
    let profileDir = currProfD.path;

    Cu.import("resource://gre/modules/Webapps.jsm");
    var reg = DOMApplicationRegistry;

    /*
    let ioFile = require('sdk/io/file');
    let webappsFilePath = profileDir + '/webapps/webapps.json';
    let webappsJsonContent = ioFile.read(webappsFilePath);
    */

    let newAppId = Date.now() + '.gaiamobile.org';
    let app = {
      receipt: null,
      installTime: Date.now(),
      appStatus: 3,
      localId: reg._nextLocalId(),
      removable: true,
      installerAppId: 0,
      installerIsBrowser: false,
      installState: 'installed',
      downloading: false,
      readyToApplyDownload: false,
      origin: 'http://' + newAppId + ':8080',
      installOrigin: 'http://' + newAppId + ':8080',
      manifestURL: 'http://' + newAppId + ':8080/manifest.webapp',
      basePath: profileDir + '/webapps',
      id: newAppId
    };

    reg.webapps[newAppId] = app;

    reg._readManifests([{ id: newAppId }], function(result) {
      let manifest = result[0].manifest;

      reg._saveApps(function() {
        console.log('All Apps Saved!')

        app.manifest = manifest;

        reg.broadcastMessage("Webapps:Install:Return:OK",
          { app: app,
           oid: 'null',
           requestID: 'null'
        });
        delete app.manifest;

        reg.broadcastMessage("Webapps:AddApp", {id: newAppId, app: app});
      });
    });
  }
  pluginPanel.hide();
});




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
