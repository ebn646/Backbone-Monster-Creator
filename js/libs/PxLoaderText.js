/*global PxLoader: true, define: true */ 

// PxLoader plugin to load text files
// requires jquery and eventbus

function PxLoaderText(url, tags, priority) {

    var self = this,
        loader = null;

    this.url = url;
    this.data = '';
    this.tags = tags;
    this.priority = priority;

    // 

    this.dispatcher = new EventBusInstance();
    this.readyState = '';

    var onReadyStateChange = function() {
        if (this.readyState === 'complete') {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    var onLoad = function() {
        self.dispatcher.dispatchEvent("success");
        removeEventHandlers();
        self.readyState = 'complete';
        loader.onLoad(self);
    };

    var onError = function() {
        self.dispatcher.dispatchEvent("error");
        removeEventHandlers();
        self.readyState = 'error';
        loader.onError(self);
    };

    var removeEventHandlers = function() {
        self.unbind('load', onLoad);
        self.unbind('readystatechange', onReadyStateChange);
        self.unbind('error', onError);
    };

    this.start = function(pxLoader) {

        // we need the loader ref so we can notify upon completion
        loader = pxLoader;

        // NOTE: Must add event listeners before the src is set. We
        // also need to use the readystatechange because sometimes
        // load doesn't fire when an image is in the cache.
        self.bind('load', onLoad);
        self.bind('readystatechange', onReadyStateChange);
        self.bind('error', onError);
        self.readyState = '';

        $.ajax({
            url: url,
            data: {},
            success: function(data, textStatus, jqXHR){
                if(textStatus == "success" || textStatus == "notmodified"){ 
                    self.data = data;
                    onLoad(); 
                }
                else { onError(); }
            }
        });
    };

    // called by PxLoader to check status of image (fallback in case
    // the event listeners are not triggered).
    this.checkStatus = function() {
        if (self.readyState == 'complete') {
            removeEventHandlers();
            loader.onLoad(self);
        }
    };

    // called by PxLoader when it is no longer waiting
    this.onTimeout = function() {
        removeEventHandlers();
        if (self.readyState == 'complete') {
            loader.onLoad(self);
        } else {
            loader.onTimeout(self);
        }
    };

    // returns a name for the resource that can be used in logging
    this.getName = function() {
        return url;
    };

    // cross-browser event binding
    this.bind = function(eventName, eventHandler) {
        if (self.dispatcher.addEventListener) {
            self.dispatcher.addEventListener(eventName, eventHandler, false);
        }
    };

    // cross-browser event un-binding
    this.unbind = function(eventName, eventHandler) {
        if (self.dispatcher.removeEventListener) {
            self.dispatcher.removeEventListener(eventName, eventHandler, false);
        }
    };

}

// add a convenience method to PxLoader for adding an image
PxLoader.prototype.addFile = function(url, tags, priority) {
    var textLoader = new PxLoaderText(url, tags, priority);
    this.add(textLoader);

    // return the img element to the caller
    return textLoader.data;
};

// AMD module support
if (typeof define === 'function' && define.amd) {
    define('PxLoaderText', [], function() {
        return PxLoaderText;
    });
}