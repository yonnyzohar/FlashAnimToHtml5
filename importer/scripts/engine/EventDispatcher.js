class EventDispatcher {
    constructor() {
        this._listeners = {}
    }
    addEventListener(eventName, func) {
        var _listeners = this._listeners;
        if (typeof _listeners[eventName] === "undefined") {
            _listeners[eventName] = [];
        }

        if (_listeners[eventName].indexOf(func) == -1) {
            _listeners[eventName].push(func);
        } else {
            // alert("FUNCTION ALREDY EXISTS!")
        }


    }

    dispatchEvent(eventName) {

        var _listeners = this._listeners;
        if (_listeners[eventName] instanceof Array) {
            var listeners = _listeners[eventName];
            var func = null;
            for (var i = 0, len = listeners.length; i < len; i++) {
                func = listeners[i];
                if (func) {
                    trace("firing " + eventName);
                    func.call(this, this);
                } else {
                    var bob = 5;
                }


            }
        }
    }

    removeEventListener(eventName, func) {
        var _listeners = this._listeners;
        if (_listeners[eventName] instanceof Array) {
            var listeners = _listeners[eventName];

            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === func) {
                    listeners.splice(i, 1);
                    trace("REMOVED LISTENER!!");
                    break;
                }
            }
        }
    }
}