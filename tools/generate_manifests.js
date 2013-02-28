/**
 * This file generates the /data/manifests.js file
 * To run:
 *  - Place in the root of your gaia/ directory
 *  - Run: node generate_manifests.js
 *  - Overwrite the /data/manifests.js file with the newly generated one
 */

var fs = require('fs')
var root = __dirname + '/../../gaia/apps'
var appIcons = []
var manifestContent = 'var FFOS_RUNTIME_MANIFESTS = {}' + "\n\n"

var apps = fs.readdirSync(root)

// Crummy - running into cross-domain issues maybe, so override the icons
var defaultIcon = 'http://homescreen.gaiamobile.org:8080/style/images/default.png'

for (var i = 0, app; app = apps[i]; i++) {

    var appDir = root + '/' + app
	var manifestPath = root + '/' + app + '/manifest.webapp'

	if (!fs.existsSync(manifestPath)) { continue }

	console.log('Processing app: ', app)  

	var manifestFile = fs.readFileSync(manifestPath, 'utf-8')
	var manifestObj = JSON.parse(manifestFile)

	// Override icons until we figure out how to proxy
	if (manifestObj.icons && manifestObj.icons['60']) {
		manifestObj.icons['60'] = defaultIcon
	}

	/*
	if (manifestObj.entry_points) {
		for (var key in manifestObj.entry_points) {
			if (manifestObj.entry_points[key].icons && manifestObj.entry_points[key].icons['60']) {
				manifestObj.entry_points[key].icons['60'] = defaultIcon
			}
		}
	}
	*/
	manifestFile = JSON.stringify(manifestObj)

	manifestContent += 'FFOS_RUNTIME_MANIFESTS[\'http://' + app + '.gaiamobile.org:8080/manifest.webapp\'] = ' + manifestFile + "\n\n"
}

fs.writeFileSync(__dirname + '/manifests.js', manifestContent, 'utf-8')
