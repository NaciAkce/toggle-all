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
