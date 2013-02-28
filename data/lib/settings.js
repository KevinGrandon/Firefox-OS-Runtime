!function() {

	var defaultSettings = {
		'homescreen.manifestURL': 'http://homescreen.gaiamobile.org:8080/manifest.webapp',
		'ftu.manifestURL': 'http://communications.gaiamobile.org:8080/manifest.webapp',
		'phone.ring.keypad': true
	}

	function MockSettingsRequest() {
		
	}
	
	MockSettingsRequest.prototype = {
		addEventListener: function(type, callback) {
			console.log('Adding event listener for:', type, callback)
			if (type == 'success') {
				this.onsuccess = callback
			}
		}
	}

	function MockSettingsLock() {
		
	}

	MockSettingsLock.prototype = {
		get: function(prop) {
			console.log('Settings.lock.get', prop)

			var mockSettingsRequest = new MockSettingsRequest(prop)

			unsafeWindow.setTimeout(function() {
				console.log('Checking for :', prop, mockSettingsRequest.onsuccess)

				// Disable FTU popup for now
				if (prop == 'ftu.manifestURL') {
					mockSettingsRequest.onerror()
					return
				}

				if (mockSettingsRequest.onsuccess) {
					mockSettingsRequest.result = defaultSettings

					mockSettingsRequest.onsuccess()
				}
			})

			return mockSettingsRequest
		},
		set: function(obj) {
			for (var i in obj) {
				console.log('MockSettingsLock.set:', i, obj[i])
			}
		}
	}
	
	FFOS_RUNTIME.makeNavigatorShim('mozSettings', {
		addObserver: function() {
			console.log('adding observer!', arguments)
		},
		createLock: function() {
			console.log('creating lock!', arguments)
			return new MockSettingsLock()
		}
	}) 
}()