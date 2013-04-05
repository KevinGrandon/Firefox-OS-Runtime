var PORT = 8080;
var BASEPATH = '/Users/kevin/Documents/workspace/gaia/apps';

var ioFile = require('sdk/io/file');
var { startServerAsync } = require('sdk/test/httpd');
var srv = startServerAsync(PORT, BASEPATH);

function handleRequest(path, request, response) {

  //Set response headers
  response.setStatusLine(request.httpVersion, 200, "OK");

  // Write content from file
  var app = request.host.match(/(.*?)\./)[1];
  path = BASEPATH + '/' + app + path;
  console.log('App, path: ', app, path);

  var fileContent = ioFile.read(path);

  response.write(fileContent);
}

srv.registerErrorHandler(404, function(request, response) {
  handleRequest(request.path, request, response);
});

srv.registerPathHandler("/", function(request, response) {
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

require("sdk/system/unload").when(function cleanup() {
  srv.stop(function() {
  })
});
