/* eslint-disable prettier/prettier */
import { throttle, useMedia, debounce } from './Helper';
const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);

let transitionCollapse = false,
    transitionExpand = false,
    enterLocked = false,
    leaveLocked = false,
    setMedia = null;


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


const animationExist = (item) => {
    const prop = window.getComputedStyle(item.value, null);
    const duration = prop.getPropertyValue('transition-duration');
    const property = prop.getPropertyValue('transition-property');
    console.log('property', property);
    return item.type === 'drop' && duration !== '0s';
};

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
const isTabActive = (item, target, splitselectorToggle) => item === target || item === $(target.getAttribute(splitselectorToggle));

/**
 * Item Object
 * @param {String} type
 * @param {Node} value
 * @param {String} role
 * @param {String} toggleActiveClass
 * @return {Object}.....Item Object
 */
const createElementObject = (type, value, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate) => {
    const isActive = value.classList.contains(toggleActiveClass);
    const animate = value.hasAttribute(selectorAnimate) ? value.getAttribute(selectorAnimate) : false;

    return {
        type: type,
        value: value,
        role: role ? role : 'default',
        active: isActive,
        isAnimateHeight: type === 'drop' && animate === 'height',
        isAnimate: type === 'drop' && animate === 'default',
        eventType: eventType,
        tabActive: role === 'tab' && isActive && isTabActive(value, target, splitselectorToggle)
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
const getGrouped = (target, toggleActiveClass, group, role, splitselectorToggle, splitselectorGroup, eventType, next, selectorAnimate) => {

    return [].slice
        .call($$(`[${splitselectorGroup}="${group}"]`))
        .filter(e => e !== target && e.classList.contains(toggleActiveClass))
        .reduce((obj, item) => {
            const dropItem = next ? getNextSibling(item, item.getAttribute(splitselectorToggle)) : $(item.getAttribute(splitselectorToggle)),
                toggle = createElementObject('toggle', item, role, toggleActiveClass, eventType, target, splitselectorToggle),
                drop = createElementObject('drop', dropItem, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate);
            return [...obj, toggle, drop];
        }, []);
};

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
const getToggles = (target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, splitselectorBack) => {
    return next
        ? [createElementObject('toggle', target, role, toggleActiveClass, eventType, target, splitselectorToggle)]
        : [].slice
            .call($$(`[${splitselectorToggle}="${selector}"]`))
            .map(toggle => createElementObject('toggle', toggle, role, toggleActiveClass, eventType, target, splitselectorToggle));
};

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
const getDrops = (target, toggleActiveClass, selector, role, next, splitselectorToggle, eventType, selectorAnimate) => next
    ? [createElementObject('drop', getNextSibling(target, selector), role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate)]
    : [].slice.call($$(selector)).map(drop => {
        return createElementObject('drop', drop, role, toggleActiveClass, eventType, target, splitselectorToggle, selectorAnimate);
    });


/**
* 
* @param {Array} items 
* @param {String} toggleShowClass 
* @param {String} toggleActiveClass 
*/
const animateDefault = (item, toggleShowClass, toggleActiveClass, eventType) => {

    const transitionExist = animationExist(item);

    const collapseSection = (item) => {
        if (!transitionExist) return removeAll(item);

        if (item.role === 'tab') {
            item.value.classList.remove(toggleShowClass);
            item.value.classList.remove(toggleActiveClass);

        } else {
            item.value.addEventListener('transitionend', transitionEndCollapse);
            item.value.classList.remove(toggleShowClass);
            transitionCollapse = true;

        }
    };

    function transitionEndCollapse(event) {
        item.value.removeEventListener('transitionend', transitionEndCollapse);
        item.value.classList.remove(toggleActiveClass);
        transitionCollapse = false;

    };

    const removeAll = (item) => {
        item.value.classList.remove(toggleShowClass);
        item.value.classList.remove(toggleActiveClass);
        transitionCollapse = false;
    };

    function expandSection(item) {
        if (!transitionExist) return addAll(item);
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
        item.value.removeEventListener('transitionend', transitionEndExpand);
        transitionExpand = false;
        item.value.enterLocked = false;
    };

    const addAll = (item) => {
        item.value.classList.add(toggleActiveClass);
        item.value.classList.add(toggleShowClass);
        transitionExpand = false;

    };

    if (eventType === enter || (eventType !== enter && !item.active)) {
        expandSection(item, toggleShowClass, toggleActiveClass);
    } else if (eventType === leave || (eventType !== enter && item.active)) {
        collapseSection(item, toggleShowClass, toggleActiveClass);
    }

};

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
            const transitionExist = animationExist(item);
            window.requestAnimationFrame(function () {
                if (transitionExist) {
                    item.value.addEventListener('transitionend', transitionEndCollapse);
                } else {
                    endCollapse(item.value);
                }
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
        const transitionExist = animationExist(item);
        transitionExist ? item.value.addEventListener('transitionend', transitionEndExpand) : endExpand(item.value);
    }

    function transitionEndExpand(event) {
        event.target.removeEventListener('transitionend', transitionEndExpand);
        endExpand(event.target);
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
 * @param {Node} item 
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
 * @param {Node} target 
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


const tab = (item) => (event) => {
    const previousElement = document.activeElement;
    // Show the modal and overlay
    const focusable = [].slice.call(item.value.querySelectorAll(focusableAll));
    const firstItem = focusable[0];
    const lastItem = focusable[focusable.length - 1];

    console.log(focusable, event);
    if (event.keyCode === 9) {
        if (event.shiftKey) {
            if (document.activeElement === firstItem) {
                event.preventDefault();
                lastItem.focus();
            }
        } else {
            if (document.activeElement === lastItem) {
                event.preventDefault();
                firstItem.focus();
            }
        }
    } else if (event.keyCode === 27) {
        close(item);
    }
};

const focusableAll = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary';

let focusableBreadcrumb = {};

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
    callbackToggle: false,

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
        callbackToggle,
        splitselectorToggle = selectorToggle.replace(/\[|\]/g, ''),
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

    let allHoverElements = [],
        activeElement,
        tHandler = null,
        eventType = null,
        isActive = null;

    const body = $('body'),

        isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;


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
        document.removeEventListener('click', clickHandler, false);

        if (onHover && isActive) {
            allHoverElements.map(item => {
                mouseEvents.map(type => {
                    item.removeEventListener(type, mouseHandler);
                });
                item.querySelector(selectorToggle).removeEventListener('keydown', keyHandler);
            });
        }
    };

    const events = () => {
        document.addEventListener('click', clickHandler, false);
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
        console.log(event.type)
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
        if (eventType === 'mouseover' && event.target.parentElement.hasAttribute(splitselectorHover)) return;

        if (!event.target.closest(selectorToggle) && !event.target.closest(selectorBack)) {
            closeActiveGlobal(event);
            return;
        };
        event.preventDefault();
        if (transitionExpand || transitionCollapse) return;

        toggleItems(event);
    };


    function mouseHandler(event) {
        if (!event.target.matches(selectorHover)) return;
        if (event.type === enter) {
            this.enterLocked = true;
        }
        if (!this.enterLocked && event.type === enter) return;
        const eventTarget = getEventTarget(event.target, event.type, selectorToggle);
        toggleItems(eventTarget);

    };

    const handleMouseEvent = (eventType) => {

        if (eventType === 'touchstart') {
            allHoverElements.map(function (item) {
                item.removeEventListener(enter, mouseHandler, false);
                item.removeEventListener(leave, mouseHandler, false);
                item.querySelector(selectorToggle).removeEventListener('keydown', keyHandler);
            });
        }

        if (eventType === 'mouseover') {
            allHoverElements.map(function (item) {
                item.addEventListener(enter, mouseHandler, false);
                item.addEventListener(leave, mouseHandler, false);
                item.querySelector(selectorToggle).addEventListener('keydown', keyHandler);
            });

        }
    };

    const keyHandler = (event) => {
        if (event.keyCode !== ENTER_KEY_CODE) return;
        x
        if (transitionExpand || transitionCollapse) return;
        event.preventDefault();
        toggleItems(event);
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

        for (let item of allElements) {
            reduceToggle(item, toggleCollapseClass, toggleActiveClass, eventType);
        }

    };

    const reduceToggle = (item, toggleCollapseClass, toggleActiveClass, eventType) => {
        const { isAnimateHeight, isAnimate, tabActive } = item;

        if (isAnimateHeight) {
            animateHeight(item, toggleCollapseClass, toggleActiveClass);
        } else if (isAnimate) {
            animateDefault(item, toggleShowClass, toggleActiveClass, eventType);

        } else {
            item.active ? close(item) : open(item);

        }
    };

    const open = item => {
        callbackOpen && callbackOpen(item);
        console.log('open');

        item.role === 'tooltip' && setPosition(item);
        item.value.classList.add(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', true);
        // if (item.type === 'drop' && item.role !== 'tab' && item.role !== 'accordion') {
        //     const id = Date.now();
        //     item.value.setAttribute('data-toggle-id', id);
        //     focusableBreadcrumb[id] = item.value;
        //     item.value.addEventListener('keydown', tab(item));
        //     console.log(focusableBreadcrumb);
        // }
    };

    const close = item => {
        callbackClose && callbackClose(item);

        console.log('close');
        item.value.classList.remove(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', false);

        // if (item.type === 'drop' && item.role !== 'tab' && item.role !== 'accordion') {
        //     const id = item.value.getAttribute('data-toggle-id');
        //     item.value.removeEventListener('keydown', tab);
        //     delete focusableBreadcrumb[id];
        //     item.value.removeAttribute('data-toggle-id', id);

        //     console.log(focusableBreadcrumb);
        // }

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
