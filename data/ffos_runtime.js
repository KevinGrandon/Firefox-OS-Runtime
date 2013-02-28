FFOS_RUNTIME = {

	/**
	 * This is so we have a single entry-point for the APP window
	 * This is needed as the interface to unsafeWindow may be changing soon
	 */
	getAppWindow: function(callback) {
		callback(unsafeWindow)
	},

	/**
	 * Proxies console.log statements to the app window
	 */
	debug: function() {
		var args = Array.slice(arguments)

		this.getAppWindow(function(win) {
			win.console.log.apply(win.console, args)
		})
	},

	makeNavigatorShim: function(property, definition) {
		try {
			unsafeWindow.navigator.__defineGetter__(property, function(){
				return definition
			})
		} catch(e) {
			alert('Error intializing shim (' + property + '): ' + e)
		}
	}
}
var debug = FFOS_RUNTIME.d

/**
 * Special System App message behavior
 */
 if (/system.gaiamobile.org/.test(location.href)) {

 	/**
 	 * Handle messages for mozChromeEvent from iframes
 	 */
	window.addEventListener('message', function(e) {
		if (e.data.action == 'dispatchMessage') {
			var evtObject = new CustomEvent("mozChromeEvent", e.data.payload)
			unsafeWindow.dispatchEvent(evtObject)
		}
	})
}

/**
 * Handle keypresses
 */
window.addEventListener('keypress', function(e) {

	if (e.keyCode == 36) {
		var targetFrame
		if (/system.gaiamobile.org/.test(location.href)) {
			targetFrame = window
		} else {
			targetFrame = parent
		}

		var eventDetail = {
			detail: {
				type: 'home-button-press'
			}
		}

		targetFrame.postMessage({
			action: 'dispatchMessage',
			payload: eventDetail
		}, "http://system.gaiamobile.org:8080")

		setTimeout(function() {
			var eventDetail = {
				detail: {
					type: 'home-button-release'
				}
			}

			targetFrame.postMessage({
				action: 'dispatchMessage',
				payload: eventDetail
			}, "http://system.gaiamobile.org:8080")
		}, 200)
	}
})

/**
 * Proxies mozSystem XMLHttpRequest
 * This is currently a work-around because system XHR does not work to get icons
 */
 /*
var defaultXHR = unsafeWindow.XMLHttpRequest
function XHRProxy(config) {
	console.log('XMLHTTP REQ CONSTRUCTOR')
	this.responseType = null
	this.config = config

	this.onreadystatechange = function() {}
	this.onerror = function() {}
}

XHRProxy.prototype = {
	open: function(method, resource) {

		this.resource = resource
		this.method = method

		// Proxy icons
		if (/icons\/60/.test(this.resource)) {
			
		}
		
		unsafeWindow.setTimeout(function() {
			var xhr = new defaultXHR(this.config)
			xhr.open(this.method, this.resource, true)
			if (this.responseType)
				xhr.responseType = this.responseType
			xhr.onreadystatechange = this.onreadystatechange
			xhr.onerror = this.onerror
			xhr.send(this.sendData)
		}.bind(this))
	},
	send: function(sendData) {
		this.sendData = sendData
	}
}

unsafeWindow.XMLHttpRequest = function(config) {

	console.log('XMLHttpRequest:', config)

	if (config && config.mozSystem) {
		return new XHRProxy(config)
	} else {
		return new defaultXHR(config)
	}
}
*/

/**
 * Adds a nextPaintListener 
 * Proxies to setTimeout
 **/
unsafeWindow.HTMLIFrameElement.prototype.addNextPaintListener = function(callback) {
	setTimeout(callback, 100)
}

/**
 * Remove the nextPaintListener 
 **/
unsafeWindow.HTMLIFrameElement.prototype.removeNextPaintListener = function(callback) {
	
}