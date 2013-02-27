FFOS_RUNTIME = {
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