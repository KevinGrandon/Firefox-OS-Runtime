function TextDecoder() {

}
TextDecoder.prototype = {
  decode: function(unitArr) {
    var convert = '';
    for (var i = 0; i < unitArr.byteLength; i++) {
      convert += String.fromCharCode(unitArr[i]);
    }
    return convert;
  }
};


const {Cc, Ci, Cu} = require('chrome');

Cu.import('resource://gre/modules/Services.jsm');

var permissionTable = {};
Cu.import('resource://gre/modules/PermissionsTable.jsm', permissionTable);

let currProfD = Services.dirsvc.get('ProfD', Ci.nsIFile);
let profileDir = currProfD.path;

let appsDir = Cc['@mozilla.org/file/local;1']
                .createInstance(Ci.nsILocalFile);
appsDir.initWithPath(profileDir + '/webapps/');

let files = appsDir.directoryEntries;
let apps = [];
while (files.hasMoreElements()) {
  let file = files.getNext().QueryInterface(Ci.nsILocalFile);
  if (file.isDirectory()) {
    apps.push(file.leafName);
  }
}

Cu.import('resource://gre/modules/osfile.jsm');
function nextManifest() {
  if (!apps.length) {
    return;
  }

  let app = apps.shift();
  let decoder = new TextDecoder();

  let filePromise = OS.File.read(profileDir + '/webapps/' + app + '/manifest.webapp');
  filePromise = filePromise.then(
    function onSuccess(array) {
      let manifest = decoder.decode(array);
      addPermissions({
          id: app,
          manifest: manifest
        },
        nextManifest
      );
    },
    nextManifest // onError
  );
}
nextManifest();

function addPermissions(app, callback) {
  manifest = JSON.parse(app.manifest);
  let permissions = manifest.permissions;

  if (!permissions) {
    callback();
    return;
  }

  let newPermNames = [];
  for (let permName in permissions) {
    let expandedPermNames = permissionTable.expandPermissions(
      permName,
      permissions[permName].access
    );

    newPermNames = newPermNames.concat(expandedPermNames);
  }

  // Write permissions
  newPermNames.forEach(function(permission) {
    var host = 'http://' + app.id + ':8080';
    var perm = Cc['@mozilla.org/permissionmanager;1']
          .createInstance(Ci.nsIPermissionManager);
    var ios = Cc['@mozilla.org/network/io-service;1']
          .getService(Ci.nsIIOService);
    uri = ios.newURI(host, null, null);

    perm.add(uri, permission, 1);
  });

  callback();
}
