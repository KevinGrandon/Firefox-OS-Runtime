!function() {
	// Set session storage so system/js/application.js fetches all apps
	unsafeWindow.sessionStorage.setItem('webapps-registry-ready', true)
	
	function cloneManifest(manifest) {
		return JSON.parse(JSON.stringify(manifest))
	}
	
	function MockAppInstance(manifestUrl, manifest) {
	
		var origin = manifestUrl.match(/\/\/(.*?):/)[1]
	
		this.manifestURL = manifestUrl
		this.origin = 'http://' + origin + ':8080'
		this.manifest = manifest
	}
	
	MockAppInstance.prototype = {
		launch: function(entrypoint) {
			unsafeWindow.console.log('MockAppInstance.launch', entrypoint)
	
			var launchPath
			if (entrypoint && this.manifest.entry_points[entrypoint]) {
				launchPath = this.manifest.entry_points[entrypoint].launch_path
			} else {
				launchPath = this.manifest.launch_path
			}

			var eventDetail = {
				detail: {
					type: 'webapps-launch',
					manifestURL: this.manifestURL,
					url: this.origin + launchPath,
					isActivity: false
				}
			}

			// If we're on the homescreen, post to the system app
			if (/homescreen.gaiamobile.org/.test(location.href)) {
				  parent.postMessage({
				  	action: 'dispatchMessage',
				  	payload: eventDetail
				  }, "http://system.gaiamobile.org:8080");
			} else {
				var evtObject = new CustomEvent("mozChromeEvent", eventDetail)
				unsafeWindow.dispatchEvent(evtObject)
			}
		}
	}
	
	FFOS_RUNTIME.makeNavigatorShim('mozApps', {
		mgmt: {
			oninstall: function() {
				console.log('mgmt.oninstall called');
			},
			onuninstall: function() {
				console.log('mgmt.onuninstall called')
			},
			getAll: function() {
				console.log('mgmt.getAll called')
				var scope = {}
				setTimeout(function() {
	
					var allApps = []
					for (var i in FFOS_RUNTIME_MANIFESTS) {
	
						// Handle multiple entry points
						if (FFOS_RUNTIME_MANIFESTS[i].entry_points) {
							for (var entry in FFOS_RUNTIME_MANIFESTS[i].entry_points) {
	
								var manifest = cloneManifest(FFOS_RUNTIME_MANIFESTS[i])
								var entryPoint = FFOS_RUNTIME_MANIFESTS[i].entry_points[entry]
	
								for (var override in entryPoint) {
									manifest[override] = entryPoint[override]
								}
	
								 allApps.push(
									new MockAppInstance(i, manifest)
								)
							}
						} else {
							// Make a clone of the manifest
							var manifest = cloneManifest(FFOS_RUNTIME_MANIFESTS[i])
							allApps.push(
								new MockAppInstance(i, manifest)
							)
						}
					}
	
					scope.onsuccess({
						target: {
							result: allApps
						}
					})
				})
				return scope
			}
		}
	})
}()
