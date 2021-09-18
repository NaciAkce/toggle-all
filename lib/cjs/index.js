"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
var Helper_1 = require("./Helper");
var $ = function (element) { return document.querySelector(element); };
var $$ = function (elements) { return document.querySelectorAll(elements); };
var transitionCollapse = false, transitionExpand = false, setMedia = null, allHoverElements = [], activeElements, tHandler = null, eventType = null, isActive = null, tabbableBreadcrumb = [], previousElement, focusable = null;
var ENTER_KEY_CODE = 'Enter', UP_KEY_CODE = 'ArrowDown', DOWN_KEY_CODE = 'ArrowUp', TAB_KEY_CODE = 'Tab', SHIFT_KEY_CODE = 16, ESCAPE_KEY_CODE = 'Escape';
var focusableAll = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary';
/**
 *
 * @param {Object} code
 * @return {Boolean}...
 */
var keyEvents = function (_a) {
    var code = _a.code;
    return code === UP_KEY_CODE ||
        code === DOWN_KEY_CODE ||
        code === TAB_KEY_CODE ||
        code === ESCAPE_KEY_CODE ||
        code === SHIFT_KEY_CODE;
};
/**
 *
 * @param {Object} mq
 */
var matchMedia = function (mq) {
    var matches = mq.matches;
    if (matches && (isActive === false || isActive === null)) {
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
var detectMouse = function (handleMouseEvent) { return function (event) {
    if ((eventType !== null &&
        eventType === event.pointerType &&
        isActive &&
        eventType === 'touch') ||
        (!isActive && eventType === 'mouse'))
        return;
    eventType = isActive ? 'touch' : event.pointerType;
    handleMouseEvent(eventType);
    document.removeEventListener('pointerover', tHandler, false);
}; };
var checkEvent = function () {
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
    tHandler = Helper_1.throttle(detectMouse(handleMouseEvent), 100);
    checkEvent();
    setMedia = Helper_1.useMedia(onnHoverMediaQuery, matchMedia);
    if (setMedia) {
        isActive = true;
    }
}
/**
 *
 * @param {Node} item
 */
var animationExist = function (item) {
    var prop = window.getComputedStyle(item.value, null);
    var duration = prop.getPropertyValue('transition-duration');
    var property = prop.getPropertyValue('transition-property');
    return {
        exist: item.type === 'drop' && duration !== '0s',
        animation: property,
    };
};
/**
 * @param  {HTMLElement} elem .....The element to check
 * @return {Object}     A set of booleans for each side of the element
 */
var isOutOfViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    var out = {};
    out.top = bounding.top < 0;
    out.left = bounding.left < 0;
    out.bottom =
        bounding.bottom >
            (window.innerHeight || document.documentElement.clientHeight);
    out.right =
        bounding.right >
            (window.innerWidth || document.documentElement.clientWidth);
    out.any = out.top || out.left || out.bottom || out.right;
    out.all = out.top && out.left && out.bottom && out.right;
    return out;
};
/**
 * @param  {EventTarget} elem     The element
 * @param  {String} selector The selector to match against
 */
var getNextSibling = function (elem, selector) {
    var sibling = elem.nextElementSibling;
    if (!selector)
        return sibling;
    while (sibling) {
        if (sibling.matches(selector))
            return sibling;
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
var isTabActive = function (item, target, splitselectorToggle) {
    return item === target || item === $(target.getAttribute(splitselectorToggle));
};
/**
 * Item Object
 * @param {String} type
 * @param {HTMLElement} value
 * @param {String} role
 * @param {String} toggleActiveClass
 * @return {Object}.....Item Object
 */
var createElementObject = function (type, value, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate) {
    var isActive = value.classList.contains(toggleActiveClass);
    var animate = value.hasAttribute(selectorAnimate)
        ? value.hasAttribute(selectorAnimate)
        : false;
    return {
        type: type,
        value: value,
        role: role ? role : 'default',
        active: isActive,
        isAnimate: type === 'drop' && animate,
        eventType: eventType,
        tabActive: role === 'tab' &&
            isActive &&
            isTabActive(value, target, splitselectorToggle),
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
var getGrouped = function (target, toggleActiveClass, group, role, splitselectorToggle, splitselectorGroup, eventType, next, selectorAnimate) {
    return [].slice
        .call($$("[" + splitselectorGroup + "=\"" + group + "\"]"))
        .filter(function (e) { return e !== target && e.classList.contains(toggleActiveClass); })
        .reduce(function (obj, item) {
        var dropItem = next
            ? getNextSibling(item, item.getAttribute(splitselectorToggle))
            : $(item.getAttribute(splitselectorToggle)), toggle = createElementObject('toggle', item, role, toggleActiveClass, eventType, target, splitselectorToggle, null), drop = createElementObject('drop', dropItem, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate);
        return __spread(obj, [toggle, drop]);
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
var getToggles = function (target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, splitselectorBack) {
    return next
        ? [
            createElementObject('toggle', target, role, toggleActiveClass, eventType, target, splitselectorToggle, null),
        ]
        : [].slice
            .call($$("[" + splitselectorToggle + "=\"" + selector + "\"]"))
            .map(function (toggle) {
            return createElementObject('toggle', toggle, role, toggleActiveClass, eventType, target, splitselectorToggle, null);
        });
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
var getDrops = function (target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, selectorAnimate) {
    return next
        ? [
            createElementObject('drop', getNextSibling(target, selector), role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate),
        ]
        : [].slice.call($$(selector)).map(function (drop) {
            return createElementObject('drop', drop, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate);
        });
};
/**
 *
 * @param {Object} item
 * @param {String} toggleShowClass
 * @param {String} toggleActiveClass
 */
var animateDefault = function (item, toggleShowClass, toggleActiveClass, eventType, toggleCurrentClass, body) {
    /**
     *
     * @param {Object} item
     */
    var collapseSection = function (item) {
        if (item.role === 'tab') {
            item.value.classList.remove(toggleShowClass);
            item.value.classList.remove(toggleActiveClass);
        }
        else {
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
    }
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
    }
    if (eventType === enter || (eventType !== enter && !item.active)) {
        expandSection(item);
    }
    else if (eventType === leave || (eventType !== enter && item.active)) {
        collapseSection(item);
    }
};
/**
 *
 * @param {Object} item
 * @param {String} toggleCollapseClass
 * @param {String} toggleActiveClass
 */
var animateHeight = function (item, toggleCollapseClass, toggleActiveClass, toggleCurrentClass) {
    var collapseSection = function (item) {
        transitionCollapse = true;
        var sectionHeight = item.value.scrollHeight;
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
        var sectionHeight = item.value.scrollHeight;
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
    var endCollapse = function (item) {
        item.classList.remove(toggleCollapseClass);
        item.classList.remove(toggleActiveClass);
        item.style.height = null;
        transitionCollapse = false;
    };
    var endExpand = function (item) {
        item.classList.remove(toggleCollapseClass);
        item.style.height = null;
        transitionExpand = false;
    };
    if (item.active) {
        return collapseSection(item);
    }
    else {
        return expandSection(item);
    }
};
/**
 *
 * @param {String} selector
 * @return {String}
 */
var splitSelector = function (selector) { return selector.replace(/\[|\]/g, ''); };
/**
 *
 * @param {Object} item
 */
var setPosition = function (item) {
    if (item.type === 'toggle')
        return;
    item.value.setAttribute('style', 'position: absolute; visibility: hidden; display: block; pointer-events: none');
    item.value.classList.remove('is--position-bottom', 'is--position-top', 'is--position-left', 'is--position-right');
    var position = isOutOfViewport(item.value);
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
var getPointerEvents = function () {
    if (window.PointerEvent) {
        return {
            end: 'pointerup',
            enter: 'pointerenter',
            leave: 'pointerleave',
        };
    }
    else {
        return {
            end: 'touchend',
            enter: 'mouseenter',
            leave: 'mouseleave',
        };
    }
};
var _a = getPointerEvents(), enter = _a.enter, leave = _a.leave, end = _a.end;
var mouseEvents = [enter, leave];
/**
 *
 * @param {HTMLElement} target
 * @param {String} type
 * @param {String} selectorToggle
 */
var getEventTarget = function (target, type, selectorToggle) {
    var item = target.querySelector(selectorToggle);
    return {
        item: item,
        type: type,
    };
};
/**
 *
 * @param {Node} item
 * @param {String} splitselectorValidate
 * @param {String} toggleErrorClass
 */
var checkValidity = function (item, splitselectorValidate, toggleErrorClass) {
    var form = item.type === 'drop' && item.value.hasAttribute(splitselectorValidate)
        ? item.value.querySelectorAll('[required]')
        : false;
    if (!form)
        return false;
    if (form) {
        var arrOfInputs = [].slice.call(form), checkUnValid = arrOfInputs.filter(function (item) { return !item.checkValidity(); }), valid_1 = checkUnValid.length !== 0 ? valid_1 : false;
        if (valid_1) {
            valid_1[0].focus();
            valid_1[0].classList.add(toggleErrorClass);
            setTimeout(function () {
                var ElementPosition = valid_1[0].getBoundingClientRect().top;
                window.scrollBy({
                    top: ElementPosition,
                    left: 0,
                    behavior: 'smooth',
                });
            }, 250);
            return true;
        }
        else {
            form.forEach(function (item) {
                return item.classList.contains(toggleErrorClass) &&
                    item.classList.remove(toggleErrorClass);
            });
            return false;
        }
    }
};
/**
 *
 * @param {Node} el
 */
var isHidden = function isVisible(el) {
    var style = window.getComputedStyle(el);
    return (style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        (el.parentElement ? isVisible(el.parentElement) : true));
};
/**
 *
 * @param {Object} item
 * @param {Node} target
 */
var addTabbable = function (item, target, tab, toggleCurrentClass) {
    tabbableBreadcrumb.forEach(function (item) {
        return item.element.classList.contains(toggleCurrentClass) &&
            item.element.classList.remove(toggleCurrentClass);
    });
    if (tabbableBreadcrumb.length > 0 &&
        !tabbableBreadcrumb[0].element.contains(target)) {
        for (var i = 0; i < tabbableBreadcrumb.length; i++) {
            tabbableBreadcrumb.pop();
        }
    }
    if (!item.active) {
        var obj = {
            active: target,
            element: item.value,
        };
        tabbableBreadcrumb.push(obj);
    }
    else if (item.active) {
        for (var i = 0; i < tabbableBreadcrumb.length; i++) {
            if (tabbableBreadcrumb[i].element === item.value) {
                tabbableBreadcrumb.length === 1 &&
                    tabbableBreadcrumb[0].element.removeEventListener('keydown', tab);
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
var createFocusable = function (toggleCurrentClass) {
    var tabLength = tabbableBreadcrumb.length;
    tabbableBreadcrumb[tabLength - 1].element.classList.add(toggleCurrentClass);
    focusable = [].slice
        .call(tabbableBreadcrumb[0].element.querySelectorAll(focusableAll))
        .filter(function (e) { return isHidden(e); });
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
var checkTabbable = function (item, eventType) {
    if (eventType === void 0) { eventType = item.eventType; }
    return (eventType === 'click' || eventType === 'keydown') &&
        item.type === 'drop' &&
        item.role !== 'tab' &&
        item.role !== 'accordion';
};
var addBodyClass = function (body) { return body.classList.add('is--overlay'); };
var removeBodyClass = function (body) { return body.classList.remove('is--overlay'); };
var defaultConfig = {
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
var Toggle = function (userSettings) {
    if (userSettings === void 0) { userSettings = {}; }
    var _a = __assign(__assign({}, defaultConfig), userSettings), selectorToggle = _a.selectorToggle, selectorTogglePrevent = _a.selectorTogglePrevent, selectorGlobal = _a.selectorGlobal, selectorGroup = _a.selectorGroup, selectorValidate = _a.selectorValidate, selectorRole = _a.selectorRole, selectorBack = _a.selectorBack, selectorNext = _a.selectorNext, selectorAnimate = _a.selectorAnimate, selectorHover = _a.selectorHover, toggleActiveClass = _a.toggleActiveClass, toggleErrorClass = _a.toggleErrorClass, toggleCollapseClass = _a.toggleCollapseClass, toggleShowClass = _a.toggleShowClass, toggleCurrentClass = _a.toggleCurrentClass, onHover = _a.onHover, onMediaQuery = _a.onMediaQuery, disableIfMedia = _a.disableIfMedia, disableIfNotMedia = _a.disableIfNotMedia, stopVideo = _a.stopVideo, callbackOpen = _a.callbackOpen, callbackClose = _a.callbackClose, callbackToggle = _a.callbackToggle, _b = _a.splitselectorToggle, splitselectorToggle = _b === void 0 ? selectorToggle.replace(/\[|\]/g, '') : _b, _c = _a.splitselectorTogglePrevent, splitselectorTogglePrevent = _c === void 0 ? selectorTogglePrevent.replace(/\[|\]/g, '') : _c, _d = _a.splitselectorValidate, splitselectorValidate = _d === void 0 ? selectorValidate.replace(/\[|\]/g, '') : _d, _e = _a.splitselectorGroup, splitselectorGroup = _e === void 0 ? selectorGroup.replace(/\[|\]/g, '') : _e, _f = _a.splitselectorAnimate, splitselectorAnimate = _f === void 0 ? selectorAnimate.replace(/\[|\]/g, '') : _f, _g = _a.splitselectorHover, splitselectorHover = _g === void 0 ? selectorHover.replace(/\[|\]/g, '') : _g, _h = _a.splitselectorRole, splitselectorRole = _h === void 0 ? selectorRole.replace(/\[|\]/g, '') : _h, _j = _a.splitselectorBack, splitselectorBack = _j === void 0 ? selectorBack.replace(/\[|\]/g, '') : _j;
    var body = $('body'), isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;
    var init = function () {
        destroy();
        isiOS && body.classList.add('is--ios');
        if (onHover) {
            handleHover(selectorHover, onMediaQuery, matchMedia, handleMouseEvent);
        }
        events();
    };
    var destroy = function () {
        isiOS && body.classList.remove('is--ios');
        document.removeEventListener('click', clickHandler, false);
        document.removeEventListener('keydown', keyHandler, false);
        if (onHover && isActive) {
            allHoverElements.map(function (item) {
                mouseEvents.map(function (type) {
                    item.removeEventListener(type, mouseHandler);
                });
            });
        }
    };
    var events = function () {
        document.addEventListener('click', clickHandler, false);
        document.addEventListener('keydown', keyHandler, false);
    };
    var returnClick = function (event) {
        return (eventType === 'mouse' &&
            event.target.closest(selectorToggle) &&
            event.target
                .closest(selectorToggle)
                .parentElement.hasAttribute(splitselectorHover)) ||
            (event.target.closest(disableIfMedia) && isActive) ||
            (event.target.closest(disableIfNotMedia) && !isActive);
    };
    var clickHandler = function (event) {
        if (returnClick(event))
            return;
        if (!event.target.closest(selectorToggle) &&
            !event.target.closest(selectorBack)) {
            closeActiveGlobal(event);
            return;
        }
        event.preventDefault();
        if (transitionExpand || transitionCollapse)
            return;
        toggleItems(event);
    };
    var returnMouse = function (event) {
        return !event.target.matches(selectorHover) ||
            (event.target.closest(disableIfMedia) && isActive) ||
            (event.target.closest(disableIfNotMedia) && !isActive);
    };
    function mouseHandler(event) {
        if (returnMouse(event))
            return;
        if (event.type === enter) {
            this.enterLocked = true;
        }
        if (!this.enterLocked && event.type === enter)
            return;
        var eventTarget = getEventTarget(event.target, event.type, selectorToggle, toggleActiveClass);
        if (eventTarget.active)
            return;
        toggleItems(eventTarget);
    }
    var handleMouseEvent = function (eventType) {
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
    var returnKey = function (event) {
        return !event.target.closest(selectorToggle) ||
            !event.target.closest(selectorHover) ||
            event.code !== ENTER_KEY_CODE ||
            (event.target.closest(disableIfMedia) && isActive) ||
            (event.target.closest(disableIfNotMedia) && !isActive);
    };
    var keyHandler = function (event) {
        if (transitionExpand || transitionCollapse)
            return;
        if (returnKey(event) && !keyEvents(event))
            return;
        previousElement = document.activeElement;
        if (!returnKey(event)) {
            event.preventDefault();
            toggleItems(event);
        }
        else if (keyEvents(event)) {
            tabbableBreadcrumb.length > 0 && tab(event);
        }
        return;
    };
    var toggleItems = function (event) {
        var target = event.target
            ? event.target.closest(selectorToggle) ||
                event.target
                    .closest(selectorBack)
                    .parentNode.parentNode.querySelector(selectorToggle)
            : event.item;
        var eventType = event.type ? event.type : false;
        callbackToggle && callbackToggle(target);
        var selector = target.getAttribute(splitselectorToggle), group = target.getAttribute(splitselectorGroup), role = target.getAttribute(splitselectorRole), next = target.closest(selectorNext), allGrouped = group
            ? getGrouped(target, toggleActiveClass, group, role, splitselectorToggle, splitselectorGroup, eventType, next, splitselectorAnimate)
            : [], allToggles = getToggles(target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, splitselectorBack), allDrops = getDrops(target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, splitselectorAnimate), allElements = __spread(allGrouped, allToggles, allDrops);
        console.log('toggle', allToggles);
        if (allToggles[0].tabActive)
            return;
        var hasToValidate = allElements.filter(function (item) {
            return item.active &&
                item.type === 'drop' &&
                item.value.hasAttribute(splitselectorValidate);
        });
        if (hasToValidate) {
            var isValid = checkValidity(hasToValidate, splitselectorValidate, toggleErrorClass);
            if (isValid)
                return;
        }
        for (var i = 0; i < allElements.length; i++) {
            reduceToggle(allElements[i], toggleCollapseClass, toggleActiveClass, eventType, target);
        }
    };
    var reduceToggle = function (item, toggleCollapseClass, toggleActiveClass, eventType, target) {
        var isAnimate = item.isAnimate, _a = animationExist(item), exist = _a.exist, animation = _a.animation, isAnimateHeight = animation.match(/height/gi);
        var tabbable = checkTabbable(item, eventType);
        if (tabbable) {
            addTabbable(item, target, tab, toggleCurrentClass);
        }
        if (isAnimate && isAnimateHeight) {
            animateHeight(item, toggleCollapseClass, toggleActiveClass, toggleCurrentClass);
        }
        else if (isAnimate && exist) {
            animateDefault(item, toggleShowClass, toggleActiveClass, eventType, toggleCurrentClass, body);
        }
        else {
            item.active ? close(item) : open(item);
        }
    };
    var open = function (item) {
        callbackOpen && callbackOpen(item);
        item.role === 'tooltip' && setPosition(item);
        item.role === 'overlay' && addBodyClass(body);
        item.value.classList.add(toggleActiveClass);
        item.type === 'toggle' &&
            item.value.setAttribute('aria-expanded', true);
        item.type === 'drop' &&
            item.value.removeAttribute('data-toggle-hidden', true);
        if (tabbableBreadcrumb.length > 0 && checkTabbable(item)) {
            createFocusable(toggleCurrentClass);
        }
    };
    var close = function (item) {
        callbackClose && callbackClose(item);
        item.role === 'overlay' && removeBodyClass(body);
        item.value.classList.remove(toggleActiveClass);
        item.type === 'toggle' &&
            item.value.setAttribute('aria-expanded', false);
        item.type === 'drop' &&
            item.value.setAttribute('data-toggle-hidden', true);
    };
    /**
     *
     * @param {Event} event
     */
    var tab = function (event) {
        previousElement = document.activeElement;
        var parentItem = {
            item: tabbableBreadcrumb[0].active,
            type: event.type,
        };
        var firstItem = focusable[1];
        var lastItem = focusable[focusable.length - 1];
        if (event.code === TAB_KEY_CODE) {
            if (event.shiftKey) {
                if (document.activeElement === firstItem) {
                    toggleItems(parentItem);
                }
            }
            else {
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
        }
        else if (event.code === ESCAPE_KEY_CODE) {
            focusable[0].focus();
            toggleItems(parentItem);
        }
    };
    var closeActiveGlobal = function (event) {
        var groupGlobal = [].slice.call($$(selectorGlobal + "." + toggleActiveClass));
        if (groupGlobal.length === 0)
            return;
        if (event.target.closest(groupGlobal[0].getAttribute(splitselectorToggle)) !== null)
            return;
        var getToggleTarget = groupGlobal.map(function (item) {
            return $(item.getAttribute(splitselectorToggle) + "." + toggleActiveClass);
        });
        groupGlobal.forEach(function (item) { return item.classList.remove(toggleActiveClass); });
        getToggleTarget.forEach(function (item) {
            if (item === null)
                return;
            item.classList.remove(toggleActiveClass);
            item.classList.contains(toggleShowClass) &&
                item.classList.remove(toggleShowClass);
        });
    };
    init();
};
exports.default = Toggle;
