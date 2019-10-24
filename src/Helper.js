export const throttle = (func, interval) => {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = false;
        };
        if (!timeout) {
            func.apply(context, args);
            timeout = true;
            setTimeout(later, interval);
        }
    };
};

export const useMedia = (query, listener) => {
    // eslint-disable-next-line no-console
    if (!listener || typeof listener !== 'function') console.error('Must be a function');

    const matches = window.matchMedia(query).matches,
        media = window.matchMedia(query);

    media.addListener(listener);
    listener(media);

    return matches;
};

export const debounce = (func, interval) => {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, interval || 200);
    };
};

export const polyfill = (function() {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }
})();
