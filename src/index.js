/* eslint-disable prettier/prettier */
import { throttle, useMedia } from './Helper';
const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);

let start, end;
let transitionCollapse = false,
    transitionExpand = false,
    setMedia = null;

const mouseEvents = ['mouseenter', 'mouseleave'];

const ENTER_KEY_CODE = 13;

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

/** 
 * @param  {Node}.......The element to check
 * @return {Object}     A set of booleans for each side of the element
 */
const isOutOfViewport = function (elem) {
    const bounding = elem.getBoundingClientRect();

    let out = {};

    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;

    return out;

};

/**
 * @param  {Node}   elem     The element
 * @param  {String} selector The selector to match against
 * @return {Node}            The sibling
 */
const getNextSibling = function (elem, selector) {
    let sibling = elem.nextElementSibling;

    if (!selector) return sibling;

    while (sibling) {
        if (sibling.matches(selector)) return sibling;
        sibling = sibling.nextElementSibling;
    }
};

/**
 * Return true if active tab is clicked
 * @param {Node} item
 * @param {Node} target
 * @param {String} splitselectorToggle
 * @return {Boolean}....
 */
const isTabActive = (item, target, splitselectorToggle) => item.value === target || item.value === $(target.getAttribute(splitselectorToggle));

/**
 * Item Object
 * @param {String} type
 * @param {Node} value
 * @param {String} role
 * @param {String} toggleActiveClass
 * @return {Object}.....Item Object
 */
const createElementObject = (type, value, role, toggleActiveClass, selectorAnimate, active) => {
    return {
        type: type,
        value: value,
        role: role ? role : 'default',
        active: active !== null && value.classList.contains(toggleActiveClass) ? false : value.classList.contains(toggleActiveClass),
        animate: value.hasAttribute(selectorAnimate) ? value.getAttribute(selectorAnimate) : false
    };
};

/**
 * Get Grouped
 * @param {Node} target 
 * @param {String} toggleActiveClass 
 * @param {String} selectorAnimate 
 * @param {String} group 
 * @param {String} role 
 * @param {String} splitselectorToggle 
 * @param {String} splitselectorGroup 
 * @return {Array}
 */
const getGrouped = (target, toggleActiveClass, selectorAnimate, group, role, splitselectorToggle, splitselectorGroup, active, next) => [].slice
    .call($$(`[${splitselectorGroup}="${group}"]`))
    .filter(e => e !== target && e.classList.contains(toggleActiveClass))
    .reduce((obj, item, index, array) => {
        const dropItem = next ? getNextSibling(item, item.getAttribute(splitselectorToggle)) : $(item.getAttribute(splitselectorToggle)),
            toggle = createElementObject('toggle', item, role, toggleActiveClass, null, active = null),
            drop = createElementObject('drop', dropItem, role, toggleActiveClass, selectorAnimate, active = null);
        return [...obj, toggle, drop];
    }, []);

/**
 * Get Toggles
 * @param {Node} target 
 * @param {String} toggleActiveClass 
 * @param {String} selector 
 * @param {String} role 
 * @param {String} selectorNext 
 * @param {String} splitselectorToggle 
 * @return {Array}
 */
const getToggles = (target, toggleActiveClass, selector, role, next, splitselectorToggle, active) => next
    ? [createElementObject('toggle', target, role, toggleActiveClass, null, active)]
    : [].slice
        .call($$(`[${splitselectorToggle}="${selector}"]`))
        .map(toggle => createElementObject('toggle', toggle, role, toggleActiveClass, null, active));

/**
 * Get Drops
 * @param {Node} target 
 * @param {String} toggleActiveClass 
 * @param {String} selectorAnimate 
 * @param {String} selector 
 * @param {String} role 
 * @param {String} selectorNext 
 * @return {Array}
 */
const getDrops = (target, toggleActiveClass, selectorAnimate, selector, role, next, active) => next
    ? [createElementObject('drop', getNextSibling(target, selector), role, toggleActiveClass, selectorAnimate, active)]
    : [].slice.call($$(selector)).map(drop => {
        return createElementObject('drop', drop, role, toggleActiveClass, selectorAnimate, active);
    });

/**
 * 
 * @param {Node} item 
 * @param {String} toggleCollapseClass 
 * @param {String} toggleActiveClass 
 */
const animateHeight = (item, toggleCollapseClass, toggleActiveClass) => {
    const collapseSection = item => {
        transitionCollapse = true;
        const sectionHeight = item.value.scrollHeight;
        window.requestAnimationFrame(function () {
            item.value.style.height = sectionHeight + 'px';
            item.value.classList.add(toggleCollapseClass);
            window.requestAnimationFrame(function () {
                item.value.style.height = 0 + 'px';
                item.value.addEventListener('transitionend', transitionEndCollapse);
            });
        });

    };

    function expandSection(item) {
        transitionExpand = true;
        item.value.classList.add(toggleActiveClass);
        item.value.classList.add(toggleCollapseClass);
        const sectionHeight = item.value.scrollHeight;
        item.value.style.height = sectionHeight + 'px';
        item.value.addEventListener('transitionend', transitionEndExpand);
    }

    function transitionEndExpand(event) {
        event.target.removeEventListener('transitionend', transitionEndExpand);
        event.target.classList.remove(toggleCollapseClass);
        event.target.style.height = null;
        transitionExpand = false;
    }

    function transitionEndCollapse(event) {
        event.target.classList.remove(toggleCollapseClass);
        event.target.removeEventListener('transitionend', transitionEndCollapse);
        event.target.classList.remove(toggleActiveClass);
        event.target.style.height = null;
        transitionCollapse = false;
    }

    if (item.active) {
        return collapseSection(item);
    } else {
        return expandSection(item);
    }
};

/**
 * 
 * @param {Node} item 
 * @param {String} toggleShowClass 
 * @param {String} toggleActiveClass 
 */
const animateDefaultCollapse = (item, toggleShowClass, toggleActiveClass) => {
    const collapseSection = item => {
        if (item.role === 'tab') {
            item.value.classList.remove(toggleShowClass);
            item.value.classList.remove(toggleActiveClass);

        } else {
            transitionCollapse = true;
            item.value.classList.remove(toggleShowClass);
            item.value.addEventListener('transitionend', transitionEndCollapse);
        }

    };

    function transitionEndCollapse(event) {
        event.target.removeEventListener('transitionend', transitionEndCollapse);
        event.target.classList.remove(toggleActiveClass);
        transitionCollapse = false;
    }
    collapseSection(item);
};

/**
 * 
 * @param {Node} item 
 * @param {String} toggleShowClass 
 * @param {String} toggleActiveClass 
 */
const animateDefaultExpand = (item, toggleShowClass, toggleActiveClass) => {

    function expandSection(item) {
        transitionExpand = true;
        window.requestAnimationFrame(function () {
            item.value.classList.add(toggleActiveClass);
            window.requestAnimationFrame(function () {
                item.value.classList.add(toggleShowClass);
                item.value.addEventListener('transitionend', transitionEndExpand);
            });
        });
    }

    function transitionEndExpand(event) {
        event.target.removeEventListener('transitionend', transitionEndExpand);
        transitionExpand = false;
    }
    expandSection(item);
};

/**
 * 
 * @param {String} selector
 * @return {String} 
 */
const splitSelector = (selector) => selector.replace(/\[|\]/g, '');

/**
 * 
 * @param {Node} item 
 */
const setPosition = (item) => {
    if (item.type === 'toggle') return;
    window.requestAnimationFrame(function () {
        item.value.setAttribute('style', 'position: absolute; visibility: hidden; display: block; pointer-events: none');
        item.value.classList.remove('is--position-bottom', 'is--position-top', 'is--position-left', 'is--position-right');

        const position = isOutOfViewport(item.value);

        item.value.removeAttribute('style');

        if (position.top) {
            item.value.classList.add('is--position-bottom');
            item.value.classList.remove('is--position-top');
        }

        if (position.bottom) {
            item.value.classList.add('is--position-top');
            item.value.classList.remove('is--position-bottom');
        }

        if (position.left) {
            item.value.classList.add('is--position-left');
            item.value.classList.remove('is--position-right');
        }

        if (position.right) {
            item.value.classList.add('is--position-right');
            item.value.classList.remove('is--position-left');
        }

    });

};

/**
 * 
 * @param {Node} target 
 * @param {String} type 
 * @param {String} selectorToggle 
 */
const getEventTarget = (target, type, selectorToggle, toggleActiveClass) => {
    // console.log(target.querySelector(selectorToggle), target.querySelector(selectorToggle).classList.contains(toggleActiveClass), type, type === 'mouseenter');
    const item = target.querySelector(selectorToggle);
    return {
        item: item,
        active: type === 'mouseenter' ? true : null
    };
};

const defaultConfig = {
    selectorToggle: '[data-toggle]',
    selectorGlobal: '[data-toggle-global]',
    selectorGroup: '[data-toggle-group]',
    selectorValidate: '[data-toggle-validate]',
    selectorRole: '[data-toggle-role]',
    selectorBack: '[data-toggle-back]',
    selectorNext: '[data-toggle-next]',
    selectorAnimate: '[data-toggle-animate]',
    selectorHover: '[data-toggle-hover]',
    toggleActiveClass: 'is--active',
    toggleErrorClass: 'is--error',
    toggleCollapseClass: 'is--collapsing',
    toggleShowClass: 'is--show',
    onHover: false,
    onnHoverMediaQuery: '(max-width: 992px)',
    stopVideo: true,
    callbackOpen: false,
    callbackClose: false,
    callbackToggle: false
};

const Toggle = (userSettings = {}) => {
    const {
        selectorToggle,
        selectorGlobal,
        selectorGroup,
        selectorValidate,
        selectorRole,
        selectorBack,
        selectorNext,
        selectorAnimate,
        selectorHover,
        toggleActiveClass,
        toggleErrorClass,
        toggleCollapseClass,
        toggleShowClass,
        onHover,
        onnHoverMediaQuery,
        stopVideo,
        callbackOpen,
        callbackClose,
        callbackToggle
    } = {
        ...defaultConfig,
        ...userSettings
    };

    let toggles = [].slice.call($$(selectorToggle)),
        allHoverElements = [],
        activeElement,
        tHandler = null,
        eventType = null,
        isActive = null;

    const body = $('body'),
        isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false,
        splitselectorToggle = selectorToggle.replace(/\[|\]/g, ''),
        splitselectorValidate = selectorValidate.replace(/\[|\]/g, ''),
        splitselectorGroup = selectorGroup.replace(/\[|\]/g, ''),
        splitselectorAnimate = selectorAnimate.replace(/\[|\]/g, ''),
        splitselectorHover = selectorHover.replace(/\[|\]/g, ''),
        splitselectorRole = selectorRole.replace(/\[|\]/g, '');

    const init = () => {

        destroy();

        isiOS && body.classList.add('is--ios');

        if (onHover) {
            allHoverElements = [].slice.call($$(selectorHover));
            tHandler = throttle(detectMouse, 100);
            checkEvent();
            setMedia = useMedia(onnHoverMediaQuery, matchMedia);
            if (setMedia) {
                isActive = true;
            }
        }

        events();

    };

    const destroy = () => {
        isiOS && body.classList.remove('is--ios');
        document.removeEventListener('click', clickHandler);
        body.removeEventListener('click', closeActiveGlobal);
        if (onHover && isActive) {
            allHoverElements.map(item => {
                mouseEvents.map(type => {
                    item.removeEventListener(type, mouseHandler);
                });
                item.removeEventListener('keydown', keyHandler);
            });
        }
    };

    const events = () => {
        document.addEventListener('click', clickHandler);
        body.addEventListener('click', closeActiveGlobal);
    };

    const matchMedia = (mq) => {
        const matches = mq.matches;

        if (
            matches &&
            (isActive === false || isActive === null)
        ) {
            isActive = true;
            checkEvent();
        }
        if (!matches && (isActive === true || isActive === null)) {
            isActive = false;
            checkEvent();
        }

    };

    const detectMouse = event => {
        // remove event bindings, so it only runs once
        if (
            (eventType !== null &&
                eventType === event.type &&
                (isActive && eventType === 'touchstart')) ||
            (!isActive && eventType === event.type)
        )
            return;

        eventType = isActive ? 'touchstart' : event.type;
        handleMouseEvent(eventType);

        [('touchstart', 'mouseover')].map(function (events) {
            document.removeEventListener(events, tHandler, false);
        });
    };

    const checkEvent = () => {
        ['touchstart', 'mouseover'].map(function (events) {
            document.addEventListener(events, tHandler, false);
        });
    };

    const clickHandler = (event) => {

        start = performance.now();
        if (eventType === 'mouseover' && event.target.parentElement.hasAttribute(splitselectorHover)) return;
        if (!event.target.closest(selectorToggle) && !event.target.closest(selectorBack)) return;

        event.preventDefault();
        if (transitionExpand || transitionCollapse) return;

        toggleItems(event);
    };

    const handleMouseEvent = (eventType) => {

        if (eventType === 'touchstart') {
            allHoverElements.map(item => {
                mouseEvents.map(type => {
                    item.removeEventListener(type, mouseHandler);
                });
                item.removeEventListener('keydown', keyHandler);
            });
        }

        if (eventType === 'mouseover') {
            allHoverElements.map(item => {
                mouseEvents.map(type => {
                    item.addEventListener(type, mouseHandler);
                });
                item.addEventListener('keydown', keyHandler);
            });

        }
    };

    const mouseHandler = (event) => {
        if (!event.target.matches(selectorHover)) return;

        if (transitionExpand || transitionCollapse) return;

        const eventTarget = getEventTarget(event.target, event.type, selectorToggle, toggleActiveClass);

        toggleItems(eventTarget);
    };

    // TODO: Own KeyHAndler
    const keyHandler = (event) => {
        if (event.keyCode !== ENTER_KEY_CODE) return;
        event.preventDefault();
        if (transitionExpand || transitionCollapse) return;

        toggleItems(event);
    };

    const toggleItems = event => {

        const target = event.target ? event.target.closest(selectorToggle) : event.item;
        const active = event.active ? event.active : null;
        callbackToggle && callbackToggle(target);

        const selector = target.getAttribute(splitselectorToggle),
            group = target.getAttribute(splitselectorGroup),
            role = target.getAttribute(splitselectorRole),
            next = target.closest(selectorNext),
            allGrouped = group ? getGrouped(target, toggleActiveClass, splitselectorAnimate, group, role, splitselectorToggle, splitselectorGroup, active, next) : [],
            allToggles = getToggles(target, toggleActiveClass, selector, role, next, splitselectorToggle, active),
            allDrops = getDrops(target, toggleActiveClass, splitselectorAnimate, selector, role, next, active),
            allElements = [...allGrouped, ...allToggles, ...allDrops],
            elementsBehaviour = toggleBehaviour(allElements, target);

        allElements.forEach((item, index) => {
            const isActive = item.active;
            const { isAnimateHeight, isAnimate, tabActive } = elementsBehaviour[index];
            if (tabActive) return;
            if (isActive) {
                const isValid = checkValidity(item);
                if (isValid) return;
            }

            if (isAnimateHeight) {
                animateHeight(item, toggleCollapseClass, toggleActiveClass);
            } else if (isAnimate) {
                item.active ? animateDefaultCollapse(item, toggleShowClass, toggleActiveClass) : animateDefaultExpand(item, toggleShowClass, toggleActiveClass);
            } else {
                item.active ? close(item) : open(item);
            }
        });

    };

    const toggleBehaviour = (all, target) => {
        return all.map(item => ({
            isAnimateHeight: item.type === 'drop' && item.animate === 'height',
            isAnimate: item.type === 'drop' && item.animate === 'default',
            tabActive: item.role === 'tab' && item.active && isTabActive(item, target, splitselectorToggle)
        }));
    };

    const open = item => {
        callbackOpen && callbackOpen(item);

        item.role === 'tooltip' && setPosition(item);
        item.value.classList.add(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', true);

    };

    const close = item => {
        callbackClose && callbackClose(item);

        item.value.classList.remove(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', false);

    };

    const checkValidity = item => {
        var form =
            item.type === 'drop' && item.value.hasAttribute(splitselectorValidate)
                ? item.value.querySelectorAll('[required]')
                : false;

        if (!form) return false;

        if (form) {
            const arrOfInputs = [].slice.call(form),
                checkUnValid = arrOfInputs.filter(item => !item.checkValidity()),
                valid = checkUnValid.length !== 0 ? valid : false;

            if (valid) {
                valid[0].focus();
                valid[0].classList.add(toggleErrorClass);
                setTimeout(() => {
                    const ElementPosition = valid[0].getBoundingClientRect().top;
                    window.scrollBy({ top: ElementPosition, left: 0, behavior: 'smooth' });
                }, 250);
                return true;
            } else {
                form.forEach(
                    item => item.classList.contains(toggleErrorClass) && item.classList.remove(toggleErrorClass)
                );
                return false;
            }
        }
    };

    const closeActiveGlobal = event => {
        const groupGlobal = [].slice.call($$(`${selectorGlobal}.${toggleActiveClass}`));

        if (groupGlobal.length === 0) return;

        if (
            event.target.closest(`${selectorGlobal}.${toggleActiveClass}`) !== null ||
            event.target.closest(groupGlobal[0].getAttribute(splitselectorToggle)) !== null
        )
            return;

        const getToggleTarget = groupGlobal.map(item => $(item.getAttribute(splitselectorToggle)));

        groupGlobal.forEach(item => item.classList.remove(toggleActiveClass));
        getToggleTarget.forEach(item => {
            item.classList.remove(toggleActiveClass);
            item.classList.contains(toggleShowClass) && item.classList.remove(toggleShowClass);
        });
    };

    init();
};

export default Toggle;
