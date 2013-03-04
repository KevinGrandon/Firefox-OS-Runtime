!function() {
    function convertDataURIToBinary(base64) {
        var raw = window.atob(base64);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));

        for (var i = 0; i < rawLength; i++) {
            array[i] = raw.charCodeAt(i);
        }
        return array;
    }

    function DeviceStorage(mediaType) {
        var blobs = [
            'iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAAABGdBTUEAALGPC/xhBQAABLFJREFUeF7t08EJA0EQA8F1/kHbDkL9GKjj3mIoej/vfZ+PQCDwD8tPYC6gKgKJQDI6z9/gOQFhEUgEktFzz8vBcwFhEUgEktF5/gbPCQiLQCKQjJ57Xg6eCwiLQCKQjM7zN3hOQFgEEoFk9NzzcvBcQFgEEoFkdJ6/wXMCwiKQCCSj556Xg+cCwiKQCCSj8/wNnhMQFoFEIBk997wcPBcQFoFEIBmd52/wnICwCCQCyei55+XguYCwCCQCyeg8f4PnBIRFIBFIRs89LwfPBYRFIBFIRuf5GzwnICwCiUAyeu55OXguICwCiUAyOs/f4DkBYRFIBJLRc8/LwXMBYRFIBJLRef4GzwkIi0AikIyee14OngsIi0AikIzO8zd4TkBYBBKBZPTc83LwXEBYBBKBZHSev8FzAsIikAgko+eel4PnAsIikAgko/P8DZ4TEBaBRCAZPfe8HDwXEBaBRCAZnedv8JyAsAgkAsnouefl4LmAsAgkAsnoPH+D5wSERSARSEbPPS8HzwWERSARSEbn+Rs8JyAsAolAMnrueTl4LiAsAolAMjrP3+A5AWERSASS0XPPy8FzAWERSASS0Xn+Bs8JCItAIpCMnnteDp4LCItAIpCMzvM3eE5AWAQSgWT03PNy8FxAWAQSgWR0nr/BcwLCIpAIJKPnnpeD5wLCIpAIJKPz/A2eExAWgUQgGT33vBw8FxAWgUQgGZ3nb/CcgLAIJALJ6Lnn5eC5gLAIJALJ6Dx/g+cEhEUgEUhGzz0vB88FhEUgEUhG5/kbPCcgLAKJQDJ67nk5eC4gLAKJQDI6z9/gOQFhEUgEktFzz8vBcwFhEUgEktF5/gbPCQiLQCKQjJ57Xg6eCwiLQCKQjM7zN3hOQFgEEoFk9NzzcvBcQFgEEoFkdJ6/wXMCwiKQCCSj556Xg+cCwiKQCCSj8/wNnhMQFoFEIBk997wcPBcQFoFEIBmd52/wnICwCCQCyei55+XguYCwCCQCyeg8f4PnBIRFIBFIRs89LwfPBYRFIBFIRuf5GzwnICwCiUAyeu55OXguICwCiUAyOs/f4DkBYRFIBJLRc8/LwXMBYRFIBJLRef4GzwkIi0AikIyee14OngsIi0AikIzO8zd4TkBYBBKBZPTc83LwXEBYBBKBZHSev8FzAsIikAgko+eel4PnAsIikAgko/P8DZ4TEBaBRCAZPfe8HDwXEBaBRCAZnedv8JyAsAgkAsnouefl4LmAsAgkAsnoPH+D5wSERSARSEbPPS8HzwWERSARSEbn+Rs8JyAsAolAMnrueTl4LiAsAolAMjrP3+A5AWERSASS0XPPy8FzAWERSASS0Xn+Bs8JCItAIpCMnnteDp4LCItAIpCMzvM3eE5AWAQSgWT03PNy8FxAWAQSgWR0nr/BcwLCIpAIJKPnnpeD5wLCIpAIJKPz/A2eExAWgUQgGT33vBw8FxAWgUQgGZ3nb/CcgLAIJALJ6Lnn5eC5gLAIJALJ6Dx/g+cEhEUgEUhGzz0vB88FhEUgEUhG5/kbPCcgLAKJQDJ67nk5eC4gLAKJQDI6z9/gOQFhEUgEktFzz8vBcwFhEUgEktF5/gaPCfwA7q7mjwJU3EEAAAAASUVORK5CYII='
        ];

        // eventemitter shim
        this.listeners = {};
        this.addEventListener = function(ev, fn) {
            this.listeners[ev] = this.listeners[ev] || [];
            this.listeners[ev].push(fn);
        };
        this.removeEventListener = function(ev, fn) {
            if (!this.listeners[ev]) return;
            this.listeners[ev].splice(this.listeners[ev].indexOf(fn), 1);
        };

        // interface DeviceStorage
        this.add = function(blob) {
            console.log('DeviceStorage.add');
        };

        this.addNamed = function(blob, name) {
            console.log('DeviceStorage.addNamed');
        };

        this.get = function(name) {
            var proxy = {};

            var blob = blobs[name.match(/^file(\d+)\.png$/)[1]];
            var decoded = new Blob([convertDataURIToBinary(blob)], { type: 'image/png' });
            decoded.name = name;
            decoded.lastModifiedDate = new Date();

            setTimeout(function() {
                proxy.result = decoded;
                proxy.onsuccess();
            });

            return proxy;
        };

        this.freeSpace = function() {
            var proxy = {};
            setTimeout(function() {
                proxy.result = 10000000;
                proxy.onsuccess();
            });
            return proxy;
        };

        this.getEditable = function(name) {
            console.log('DeviceStorage.getEditable');
        };

        this.delete = function(name) {
            console.log('DeviceStorage.delete');
        };

        this.enumerate = function() {
            console.log('DeviceStorage.enumerate');
            var cursor = new (function() {
                var self = this;

                this.ix = -1;
                this.results = {};

                this.__defineGetter__('result', function() {
                    console.log('DeviceStorage.enumerate.result', typeof self.results[self.ix]);
                    return self.results[self.ix];
                });

                this.continue = function() {
                    var ix = ++this.ix;
                    var blob = blobs[ix];
                    console.log('DeviceStorage.continue', ix);
                    if (!blob) return; // do we have to call something?

                    // decode the base64 blob to a normal Blob thingy
                    var decoded = new Blob([convertDataURIToBinary(blob)], { type: 'image/png' });
                    decoded.name = 'file' + ix + '.png';
                    decoded.lastModifiedDate = new Date();
                    this.results[ix] = decoded;

                    setTimeout(function() {
                        self.onsuccess();
                    });
                };
            })();

            // cursor should continue the first time automagically
            cursor.continue();

            return cursor;
        };

        this.enumerateEditable = function() {
            console.error('NotImplemented: DeviceStorage.enumerateEditable');
        };

        this.available = function() {
            var proxy = {};
            setTimeout(function() {
                proxy.onsuccess({ target: { result: 'available' } });
            });
            return proxy;
        };
    }

    var deviceStorages = {};

    var getDeviceStorage = function(mediaType) {
        if (!deviceStorages[mediaType]) {
            deviceStorages[mediaType] = new DeviceStorage(mediaType);
        }

        return deviceStorages[mediaType];
    };

    FFOS_RUNTIME.makeNavigatorShim('getDeviceStorage', getDeviceStorage);
}();
