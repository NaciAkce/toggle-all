/* eslint-disable prettier/prettier */
import { throttle, useMedia, polyfill } from './Helper';
const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);

let transitionCollapse = false,
    transitionExpand = false,
    setMedia = null,
    allHoverElements = [],
    activeElements,
    tHandler = null,
    eventType = null,
    isActive = null,
    tabbableBreadcrumb = [],
    previousElement,
    focusable = null;

const ENTER_KEY_CODE = 'Enter',
    UP_KEY_CODE = 'ArrowDown',
    DOWN_KEY_CODE = 'ArrowUp',
    TAB_KEY_CODE = 'Tab',
    SHIFT_KEY_CODE = 16,
    ESCAPE_KEY_CODE = 'Escape';


const focusableAll = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary';

/**
 *
 * @param {Object} code
 * @return {Boolean}...
 */
const keyEvents = ({ code }) => code === UP_KEY_CODE || code === DOWN_KEY_CODE || code === TAB_KEY_CODE || code === ESCAPE_KEY_CODE || code === SHIFT_KEY_CODE;

/**
 *
 * @param {Object} mq
 */
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

/**
 *
 * @param {Function} handleMouseEvent
 */
const detectMouse = (handleMouseEvent) => event => {
    if (
        (eventType !== null &&
            eventType === event.pointerType &&
            (isActive && eventType === 'touch')) ||
        (!isActive && eventType === 'mouse')
    ) return;

    eventType = isActive ? 'touch' : event.pointerType;
    handleMouseEvent(eventType);

    document.removeEventListener('pointerover', tHandler, false);
};

const checkEvent = () => {
    document.addEventListener('pointerover', tHandler, false);

};

/**
 *
 * @param {String} selectorHover
 * @param {String} onnHoverMediaQuery
 * @param {Function} matchMedia
 * @param {Function} handleMouseEvent
 */
function handleHover(selectorHover, onnHoverMediaQuery, matchMedia, handleMouseEvent) {
    allHoverElements = [].slice.call($$(selectorHover));
    tHandler = throttle(detectMouse(handleMouseEvent), 100);
    checkEvent();
    setMedia = useMedia(onnHoverMediaQuery, matchMedia);
    if (setMedia) {
        isActive = true;
    }
}

/**
 *
 * @param {Node} item
 */
const animationExist = (item) => {
    const prop = window.getComputedStyle(item.value, null);
    const duration = prop.getPropertyValue('transition-duration');
    const property = prop.getPropertyValue('transition-property');

    return {
        exist: item.type === 'drop' && duration !== '0s',
        animation: property
    };
};

/**
 * @param  {HTMLElement} elem .....The element to check
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
 * @param  {EventTarget} elem     The element
 * @param  {String} selector The selector to match against
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
 * @param {HTMLElement} item
 * @param {HTMLElement} target
 * @param {String} splitselectorToggle
 * @return {Boolean}....
 */
const isTabActive = (item, target, splitselectorToggle) => item === target || item === $(target.getAttribute(splitselectorToggle));

/**
 * Item Object
 * @param {String} type
 * @param {HTMLElement} value
 * @param {String} role
 * @param {String} toggleActiveClass
 * @return {Object}.....Item Object
 */
const createElementObject = (type, value, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate) => {
    const isActive = value.classList.contains(toggleActiveClass);
    const animate = value.hasAttribute(selectorAnimate) ? value.hasAttribute(selectorAnimate) : false;

    return {
        type: type,
        value: value,
        role: role ? role : 'default',
        active: isActive,
        isAnimate: type === 'drop' && animate,
        eventType: eventType,
        tabActive: role === 'tab' && isActive && isTabActive(value, target, splitselectorToggle)
    };
};

/**
 * Get Grouped
 * @param {HTMLElement} target
 * @param {String} toggleActiveClass
 * @param {String} selectorAnimate
 * @param {String} group
 * @param {String} role
 * @param {String} splitselectorToggle
 * @param {String} splitselectorGroup
 * @return {Array}
 */
const getGrouped = (target, toggleActiveClass, group, role, splitselectorToggle, splitselectorGroup, eventType, next, selectorAnimate) => {

    return [].slice
        .call($$(`[${splitselectorGroup}="${group}"]`))
        .filter(e => e !== target && e.classList.contains(toggleActiveClass))
        .reduce((obj, item) => {
            const dropItem = next ? getNextSibling(item, item.getAttribute(splitselectorToggle)) : $(item.getAttribute(splitselectorToggle)),
                toggle = createElementObject('toggle', item, role, toggleActiveClass, eventType, target, splitselectorToggle, null),
                drop = createElementObject('drop', dropItem, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate);
            return [...obj, toggle, drop];
        }, []);
};

/**
 * Get Toggles
 * @param {HTMLElement} target
 * @param {String} toggleActiveClass
 * @param {String} selector
 * @param {String} role
 * @param {String} splitselectorToggle
 * @return {Array}
 */
const getToggles = (target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, splitselectorBack) => {
    return next
        ? [createElementObject('toggle', target, role, toggleActiveClass, eventType, target, splitselectorToggle, null)]
        : [].slice
            .call($$(`[${splitselectorToggle}="${selector}"]`))
            .map(toggle => createElementObject('toggle', toggle, role, toggleActiveClass, eventType, target, splitselectorToggle, null));
};

/**
 * Get Drops
 * @param {EventTarget} target
 * @param {String} toggleActiveClass
 * @param {String} selectorAnimate
 * @param {String} selector
 * @param {String} role
 * @return {Array}
 */
const getDrops = (target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, selectorAnimate) => next
    ? [createElementObject('drop', getNextSibling(target, selector), role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate)]
    : [].slice.call($$(selector)).map(drop => {
        return createElementObject('drop', drop, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate);
    });


/**
*
* @param {Object} item
* @param {String} toggleShowClass
* @param {String} toggleActiveClass
*/
const animateDefault = (item, toggleShowClass, toggleActiveClass, eventType, toggleCurrentClass, body) => {

    /**
     *
     * @param {Object} item
     */
    const collapseSection = (item) => {

        if (item.role === 'tab') {
            item.value.classList.remove(toggleShowClass);
            item.value.classList.remove(toggleActiveClass);

        } else {
            item.value.setAttribute('data-toggle-hidden', true);
            item.role === 'overlay' && removeBodyClass(body);

            item.value.addEventListener('transitionend', transitionEndCollapse);
            item.value.classList.remove(toggleShowClass);
            transitionCollapse = true;

        }
    };

    /**
     *
     * @param {Event} event
     */
    function transitionEndCollapse(event) {
        item.value.removeEventListener('transitionend', transitionEndCollapse);
        item.value.classList.remove(toggleActiveClass);
        transitionCollapse = false;

    };

    /**
     *
     * @param {Object} item
     */
    function expandSection(item) {
        transitionExpand = true;
        item.value.removeAttribute('data-toggle-hidden', true);
        item.role === 'overlay' && addBodyClass(body);

        window.requestAnimationFrame(function () {
            item.value.classList.add(toggleActiveClass);
            window.requestAnimationFrame(function () {
                item.value.classList.add(toggleShowClass);
                item.value.addEventListener('transitionend', transitionEndExpand);
            });
        });

    }

    /**
     *
     *
     * @param {Event} event
     */
    function transitionEndExpand(event) {
        item.value.removeEventListener('transitionend', transitionEndExpand);
        transitionExpand = false;
        item.value.enterLocked = false;
        if (tabbableBreadcrumb.length > 0 && checkTabbable(item)) {
            createFocusable(toggleCurrentClass);
        }
    };

    if (eventType === enter || (eventType !== enter && !item.active)) {
        expandSection(item);
    } else if (eventType === leave || (eventType !== enter && item.active)) {
        collapseSection(item);
    }
};

/**
 *
 * @param {Object} item
 * @param {String} toggleCollapseClass
 * @param {String} toggleActiveClass
 */
const animateHeight = (item, toggleCollapseClass, toggleActiveClass, toggleCurrentClass) => {
    const collapseSection = item => {
        transitionCollapse = true;
        const sectionHeight = item.value.scrollHeight;
        item.value.setAttribute('data-toggle-hidden', true);

        window.requestAnimationFrame(function () {
            item.value.style.height = sectionHeight + 'px';
            item.value.classList.add(toggleCollapseClass);
            window.requestAnimationFrame(function () {
                item.value.addEventListener('transitionend', transitionEndCollapse);
                item.value.style.height = 0 + 'px';
            });
        });

    };

    function expandSection(item) {
        transitionExpand = true;
        item.value.classList.add(toggleActiveClass);
        item.value.classList.add(toggleCollapseClass);
        const sectionHeight = item.value.scrollHeight;
        item.value.style.height = sectionHeight + 'px';
        item.value.removeAttribute('data-toggle-hidden', true);
        item.value.addEventListener('transitionend', transitionEndExpand);
    }

    function transitionEndExpand(event) {
        event.target.removeEventListener('transitionend', transitionEndExpand);
        endExpand(event.target);
        if (tabbableBreadcrumb.length > 0 && checkTabbable(item)) {
            createFocusable(toggleCurrentClass);
        }
    }

    function transitionEndCollapse(event) {
        event.target.removeEventListener('transitionend', transitionEndCollapse);
        endCollapse(event.target);
    }

    const endCollapse = (item) => {
        item.classList.remove(toggleCollapseClass);
        item.classList.remove(toggleActiveClass);
        item.style.height = null;
        transitionCollapse = false;
    };

    const endExpand = (item) => {
        item.classList.remove(toggleCollapseClass);
        item.style.height = null;
        transitionExpand = false;
    };

    if (item.active) {
        return collapseSection(item);
    } else {
        return expandSection(item);
    }
};

/**
 *
 * @param {String} selector
 * @return {String}
 */
const splitSelector = (selector) => selector.replace(/\[|\]/g, '');

/**
 *
 * @param {Object} item
 */
const setPosition = (item) => {
    if (item.type === 'toggle') return;
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
};

const { enter, leave, end } = window.PointerEvent ? {
    end: 'pointerup',
    enter: 'pointerenter',
    leave: 'pointerleave'
} : {
        end: 'touchend',
        enter: 'mouseenter',
        leave: 'mouseleave'
    };
const mouseEvents = [enter, leave];

/**
 *
 * @param {HTMLElement} target
 * @param {String} type
 * @param {String} selectorToggle
 */
const getEventTarget = (target, type, selectorToggle) => {
    const item = target.querySelector(selectorToggle);
    return {
        item: item,
        type: type
    };
};

/**
 *
 * @param {Node} item
 * @param {String} splitselectorValidate
 * @param {String} toggleErrorClass
 */
const checkValidity = (item, splitselectorValidate, toggleErrorClass) => {
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

/**
 *
 * @param {Node} el
 */
const isHidden = function isVisible(el) {
    var style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden'
        && (el.parentElement ? isVisible(el.parentElement) : true);
};

/**
 *
 * @param {Object} item
 * @param {Node} target
 */
const addTabbable = (item, target, tab, toggleCurrentClass) => {

    tabbableBreadcrumb.forEach(item => item.element.classList.contains(toggleCurrentClass) && item.element.classList.remove(toggleCurrentClass));

    if (tabbableBreadcrumb.length > 0 && !tabbableBreadcrumb[0].element.contains(target)) {

        for (var i = 0; i < tabbableBreadcrumb.length; i++) {
            tabbableBreadcrumb.pop();
        }

    }

    if (!item.active) {
        const obj = {
            active: target,
            element: item.value
        };

        tabbableBreadcrumb.push(obj);

    } else if (item.active) {

        for (var i = 0; i < tabbableBreadcrumb.length; i++) {
            if (tabbableBreadcrumb[i].element === item.value) {
                tabbableBreadcrumb.length === 1 && tabbableBreadcrumb[0].element.removeEventListener('keydown', tab);
                tabbableBreadcrumb.splice(i, 1);
                break;
            }
        }

    }

};

/**
 *
 * @param {String} toggleCurrentClass
 */
const createFocusable = (toggleCurrentClass) => {
    const tabLength = tabbableBreadcrumb.length;
    tabbableBreadcrumb[tabLength - 1].element.classList.add(toggleCurrentClass);

    focusable = [].slice.call(tabbableBreadcrumb[0].element.querySelectorAll(focusableAll)).filter(e => isHidden(e));
    focusable.unshift(tabbableBreadcrumb[0].active);

    if (tabLength === 1) {
        focusable[1].focus();
    }
};

/**
 * Check if element tabbable to add to breadcrumb
 *
 * @param {Node} item
 * @param {String} eventType
 */

const checkTabbable = (item, eventType = item.eventType) => (eventType === 'click' || eventType === 'keydown') && item.type === 'drop' && item.role !== 'tab' && item.role !== 'accordion';


const addBodyClass = (body) => body.classList.add('is--overlay');
const removeBodyClass = (body) => body.classList.remove('is--overlay');

const defaultConfig = {
    selectorToggle: '[data-toggle]',
    selectorTogglePrevent: '[data-toggle-prevent]',
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
    toggleCurrentClass: 'is--current',
    onHover: false,
    onMediaQuery: '(max-width: 992px)',
    disableIfMedia: '[data-toggle-media]',
    disableIfNotMedia: '[data-toggle-not-media]',
    stopVideo: true,
    callbackOpen: false,
    callbackClose: false,
    callbackToggle: false,

};

const Toggle = (userSettings = {}) => {
    const {
        selectorToggle,
        selectorTogglePrevent,
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
        toggleCurrentClass,
        onHover,
        onMediaQuery,
        disableIfMedia,
        disableIfNotMedia,
        stopVideo,
        callbackOpen,
        callbackClose,
        callbackToggle,
        splitselectorToggle = selectorToggle.replace(/\[|\]/g, ''),
        splitselectorTogglePrevent = selectorTogglePrevent.replace(/\[|\]/g, ''),
        splitselectorValidate = selectorValidate.replace(/\[|\]/g, ''),
        splitselectorGroup = selectorGroup.replace(/\[|\]/g, ''),
        splitselectorAnimate = selectorAnimate.replace(/\[|\]/g, ''),
        splitselectorHover = selectorHover.replace(/\[|\]/g, ''),
        splitselectorRole = selectorRole.replace(/\[|\]/g, ''),
        splitselectorBack = selectorBack.replace(/\[|\]/g, '')
    } = {
        ...defaultConfig,
        ...userSettings
    };

    const body = $('body'),

        isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

    const init = () => {

        destroy();

        isiOS && body.classList.add('is--ios');

        if (onHover) {
            handleHover(selectorHover, onMediaQuery, matchMedia, handleMouseEvent);
        }

        events();

    };

    const destroy = () => {
        isiOS && body.classList.remove('is--ios');
        document.removeEventListener('click', clickHandler, false);
        document.removeEventListener('keydown', keyHandler, false);

        if (onHover && isActive) {
            allHoverElements.map(item => {
                mouseEvents.map(type => {
                    item.removeEventListener(type, mouseHandler);
                });
            });
        }
    };

    const events = () => {
        document.addEventListener('click', clickHandler, false);
        document.addEventListener('keydown', keyHandler, false);

    };

    const returnClick = (event) => eventType === 'mouse' && event.target.closest(selectorToggle) && event.target.closest(selectorToggle).parentElement.hasAttribute(splitselectorHover) || (event.target.closest(disableIfMedia) && isActive) || (event.target.closest(disableIfNotMedia) && !isActive);

    const clickHandler = (event) => {

        if (returnClick(event)) return;

        if (!event.target.closest(selectorToggle) && !event.target.closest(selectorBack)) {
            closeActiveGlobal(event);
            return;
        }
        event.preventDefault();
        if (transitionExpand || transitionCollapse) return;

        toggleItems(event);
    };

    const returnMouse = (event) => !event.target.matches(selectorHover) || (event.target.closest(disableIfMedia) && isActive) || (event.target.closest(disableIfNotMedia) && !isActive);

    function mouseHandler(event) {
        if (returnMouse(event)) return;

        if (event.type === enter) {
            this.enterLocked = true;
        }
        if (!this.enterLocked && event.type === enter) return;
        const eventTarget = getEventTarget(event.target, event.type, selectorToggle, toggleActiveClass);
        if (eventTarget.active) return;

        toggleItems(eventTarget);

    }

    const handleMouseEvent = (eventType) => {

        if (eventType === 'touch') {
            allHoverElements.map(function (item) {
                item.removeEventListener(enter, mouseHandler, false);
                item.removeEventListener(leave, mouseHandler, false);

            });
        }

        if (eventType === 'mouse') {
            allHoverElements.map(function (item) {
                item.addEventListener(enter, mouseHandler, false);
                item.addEventListener(leave, mouseHandler, false);
            });

        }
    };

    const returnKey = (event) => !event.target.closest(selectorToggle) || !event.target.closest(selectorHover) || event.code !== ENTER_KEY_CODE || (event.target.closest(disableIfMedia) && isActive) || (event.target.closest(disableIfNotMedia) && !isActive);

    const keyHandler = (event) => {
        if (transitionExpand || transitionCollapse) return;
        if (returnKey(event) && !keyEvents(event)) return;
        previousElement = document.activeElement;
        if (!returnKey(event)) {
            event.preventDefault();
            toggleItems(event);
        } else if (keyEvents(event)) {
            tabbableBreadcrumb.length > 0 && tab(event);
        }
        return;

    };

    const toggleItems = event => {

        const target = event.target ? event.target.closest(selectorToggle) || event.target.closest(selectorBack).parentNode.parentNode.querySelector(selectorToggle) : event.item;
        const eventType = event.type ? event.type : false;
        callbackToggle && callbackToggle(target);

        const selector = target.getAttribute(splitselectorToggle),

            group = target.getAttribute(splitselectorGroup),
            role = target.getAttribute(splitselectorRole),
            next = target.closest(selectorNext),
            allGrouped = group ? getGrouped(target, toggleActiveClass, group, role, splitselectorToggle, splitselectorGroup, eventType, next, splitselectorAnimate) : [],
            allToggles = getToggles(target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, splitselectorBack),
            allDrops = getDrops(target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, splitselectorAnimate),
            allElements = [...allGrouped, ...allToggles, ...allDrops];

        if (allToggles[0].tabActive) return;

        const hasToValidate = allElements.filter(item => item.active && item.type === 'drop' && item.value.hasAttribute(splitselectorValidate));

        if (hasToValidate) {
            const isValid = checkValidity(hasToValidate, splitselectorValidate, toggleErrorClass);
            if (isValid) return;
        }

        for (let i = 0; i < allElements.length; i++) {
            reduceToggle(allElements[i], toggleCollapseClass, toggleActiveClass, eventType, target);
        }

    };

    const reduceToggle = (item, toggleCollapseClass, toggleActiveClass, eventType, target) => {
        const { isAnimate } = item,
            { exist, animation } = animationExist(item),
            isAnimateHeight = animation.match(/height/gi);

        const tabbable = checkTabbable(item, eventType);

        if (tabbable) {
            addTabbable(item, target, tab, toggleCurrentClass);
        }

        if (isAnimate && isAnimateHeight) {
            animateHeight(item, toggleCollapseClass, toggleActiveClass, toggleCurrentClass);
        } else if (isAnimate && exist) {
            animateDefault(item, toggleShowClass, toggleActiveClass, eventType, toggleCurrentClass, body);
        } else {
            item.active ? close(item) : open(item);

        }
    };

    const open = item => {
        callbackOpen && callbackOpen(item);

        item.role === 'tooltip' && setPosition(item);
        item.role === 'overlay' && addBodyClass(body);
        item.value.classList.add(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', true);
        item.type === 'drop' && item.value.removeAttribute('data-toggle-hidden', true);

        if (tabbableBreadcrumb.length > 0 && checkTabbable(item)) {
            createFocusable(toggleCurrentClass);
        }
    };

    const close = item => {
        callbackClose && callbackClose(item);

        item.role === 'overlay' && removeBodyClass(body);

        item.value.classList.remove(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', false);
        item.type === 'drop' && item.value.setAttribute('data-toggle-hidden', true);

    };

    /**
   *
   * @param {Event} event
   */
    const tab = (event) => {
        previousElement = document.activeElement;

        const parentItem = {
            item: tabbableBreadcrumb[0].active,
            type: event.type
        };

        const firstItem = focusable[1];
        const lastItem = focusable[focusable.length - 1];

        if (event.code === TAB_KEY_CODE) {
            if (event.shiftKey) {
                if (document.activeElement === firstItem) {
                    toggleItems(parentItem);
                }
            } else {
                if (document.activeElement === lastItem) {
                    toggleItems(parentItem);
                }
            }
            // } else if (event.code === UP_KEY_CODE && document.activeElement === firstItem) {
            //     event.preventDefault();
            //     lastItem.focus();

            // } else if (event.code === DOWN_KEY_CODE && document.activeElement === lastItem) {
            //     event.preventDefault();
            //     firstItem.focus();
        } else if (event.code === ESCAPE_KEY_CODE) {
            focusable[0].focus();
            toggleItems(parentItem);
        }
    };

    const closeActiveGlobal = event => {
        const groupGlobal = [].slice.call($$(`${selectorGlobal}.${toggleActiveClass}`));

        if (groupGlobal.length === 0) return;

        if (event.target.closest(groupGlobal[0].getAttribute(splitselectorToggle)) !== null) return;

        const getToggleTarget = groupGlobal.map(item => $(`${item.getAttribute(splitselectorToggle)}.${toggleActiveClass}`));

        groupGlobal.forEach(item => item.classList.remove(toggleActiveClass));
        getToggleTarget.forEach(item => {
            if (item === null) return;
            item.classList.remove(toggleActiveClass);
            item.classList.contains(toggleShowClass) && item.classList.remove(toggleShowClass);
        });
    };

    init();

};

export default Toggle;
