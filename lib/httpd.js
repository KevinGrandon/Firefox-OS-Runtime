var PORT = 8080;
var BASEPATH = '/Users/kevin/Documents/workspace/gaia';

var { startServerAsync } = require("sdk/test/httpd");
var srv = startServerAsync(PORT, BASEPATH);

srv.registerPathHandler("/", function(request, response) {

  //Set response headers
  response.setStatusLine(request.httpVersion, 200, "OK");

  // Write content from file
  var app = request.host.match(/(.*?)\./)[1];
  var path = request.path;
  if (path == '/') {
    path = '/index.html';
  }
  path = BASEPATH + path;

  console.log('App, path: ', app, path);


  /*
  let fileStream = file.open(filePath, 'w');
  fileStream.write(content);
  fileStream.close();
   */
  response.write("Hello world!\n");
  //response.finish();
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
