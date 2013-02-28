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
	},

	/**
	 * Sends an event to the system frame
	 * This is frame independent, and can be triggered from the system app itself
	 * @param {Object} The e.detail object passed to the event
	 */
	sendFrameEvent: function(data) {

		var eventDetail = {
			detail: data
		}

		var targetFrame
		if (/system.gaiamobile.org/.test(location.href)) {
			targetFrame = window
			var evtObject = new CustomEvent("mozChromeEvent", eventDetail)
			unsafeWindow.dispatchEvent(evtObject)

			return
		}

		targetFrame = parent

		targetFrame.postMessage({
			action: 'dispatchMessage',
			payload: eventDetail
		}, "http://system.gaiamobile.org:8080")

	}
}
var debug = FFOS_RUNTIME.debug

/**
 * Special System App message behavior
 */
 if (/system.gaiamobile.org/.test(location.href)) {

 	/**
 	 * Handle messages for mozChromeEvent from iframes
 	 */
	window.addEventListener('message', function(e) {

		if (e.data.action == 'dispatchMessage') {
			FFOS_RUNTIME.getAppWindow(function(win) {
				var evtObject = new CustomEvent("mozChromeEvent", e.data.payload)
				win.dispatchEvent(evtObject)			
			})
		}
	})
}

/**
 * Handle keydown special cases
 */
window.addEventListener('keydown', function(e) {
	if (e.keyCode == 36) {
		FFOS_RUNTIME.sendFrameEvent({
			type: 'home-button-press'
		})
	}
})

/**
 * Handle keyup special cases
 */
window.addEventListener('keyup', function(e) {
	if (e.keyCode == 36) {
		FFOS_RUNTIME.sendFrameEvent({
			type: 'home-button-release'
		})
	}
})

FFOS_RUNTIME.getAppWindow(function(win) {
	/**
	 * Adds a nextPaintListener 
	 * Proxies to setTimeout
	 **/
	win.HTMLIFrameElement.prototype.addNextPaintListener = function(callback) {
		setTimeout(callback, 100)
	}

	/**
	 * Remove the nextPaintListener 
	 **/
	win.HTMLIFrameElement.prototype.removeNextPaintListener = function(callback) {
		
	}
})