"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polyfill = exports.debounce = exports.useMedia = exports.throttle = void 0;
exports.throttle = function (func, interval) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = false;
        };
        if (!timeout) {
            func.apply(context, args);
            timeout = true;
            setTimeout(later, interval);
        }
    };
};
exports.useMedia = function (query, listener) {
    // eslint-disable-next-line no-console
    if (!listener || typeof listener !== 'function')
        console.error('Must be a function');
    var matches = window.matchMedia(query).matches, media = window.matchMedia(query);
    media.addListener(listener);
    listener(media);
    return matches;
};
exports.debounce = function (func, interval) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, interval || 200);
    };
};
exports.polyfill = (function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
            var el = this;
            do {
                if (el.matches(s))
                    return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
})();
