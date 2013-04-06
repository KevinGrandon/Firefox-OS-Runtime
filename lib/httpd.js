var PORT = 9090;
var BASEPATH = '/Users/kevin/workspace/gaia';
var APP_DIR = 'apps';

var ioFile = require('sdk/io/file');
var { startServerAsync } = require('sdk/test/httpd');
var srv = startServerAsync(PORT, BASEPATH);

function handleRequest(path, request, response) {

  //Set response headers
  response.setStatusLine(request.httpVersion, 200, 'OK');

  // Write content from file
  var app = request.host.match(/(.*?)\./)[1];
  var fullPath = BASEPATH + '/' + APP_DIR + '/' + app + path;

  // Handle shared/ rewrite
  if (path.indexOf('shared') === 0) {
    fullPath = BASEPATH + '/shared/' + path;
  }

  console.log('App, path: ', app, fullPath);

  var fileContent = ioFile.read(fullPath, 'b');

  response.write(fileContent);
}

srv.registerErrorHandler(404, function(request, response) {
  handleRequest(request.path, request, response);
});

srv.registerPathHandler('/', function(request, response) {
  handleRequest('/index.html', request, response);
});


// Get all apps and add identities
// TODO: Dynamically populate these
var apps = [
  'calendar',
  'email',
  'homescreen',
  'system'
];

apps.forEach(function(app) {
  srv.identity.add('http', app + '.gaiamobile.org', PORT);
});

require('sdk/system/unload').when(function cleanup() {
  srv.stop(function() {
  });
});
