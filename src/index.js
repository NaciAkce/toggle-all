/* eslint-disable prettier/prettier */

const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);

let start, end;
let transitionCollapse = false,
    transitionExpand = false;

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

/*!
 * @param  {Node}  elem The element to check
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
const createElementObject = (type, value, role, toggleActiveClass, selectorAnimate) => ({
    type: type,
    value: value,
    role: role ? role : 'default',
    active: value.classList.contains(toggleActiveClass),
    animate: value.hasAttribute(selectorAnimate) ? value.getAttribute(selectorAnimate) : false
});

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
const getGrouped = (target, toggleActiveClass, selectorAnimate, group, role, splitselectorToggle, splitselectorGroup) => [].slice
    .call($$(`[${splitselectorGroup}="${group}"]`))
    .filter(e => e !== target && e.classList.contains(toggleActiveClass))
    .reduce((obj, item) => {
        const dropItem = $(item.getAttribute(splitselectorToggle)),
            toggle = createElementObject('toggle', item, role, toggleActiveClass),
            drop = createElementObject('drop', dropItem, role, toggleActiveClass, selectorAnimate);
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
const getToggles = (target, toggleActiveClass, selector, role, next, splitselectorToggle) => next
    ? [createElementObject('toggle', target, role, toggleActiveClass)]
    : [].slice
        .call($$(`[${splitselectorToggle}="${selector}"]`))
        .map(toggle => createElementObject('toggle', toggle, role, toggleActiveClass));

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
const getDrops = (target, toggleActiveClass, selectorAnimate, selector, role, next) => next
    ? [createElementObject('drop', getNextSibling(target, selector), role, toggleActiveClass, selectorAnimate)]
    : [].slice.call($$(selector)).map(drop => {
        return createElementObject('drop', drop, role, toggleActiveClass, selectorAnimate);
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
const animateDefault = (item, toggleShowClass, toggleActiveClass) => {
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

    function transitionEndCollapse(event) {
        event.target.removeEventListener('transitionend', transitionEndCollapse);
        event.target.classList.remove(toggleActiveClass);
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
 * @param {String} selector
 * @return {String} 
 */
const splitSelector = (selector) => selector.replace(/\[|\]/g, '');

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

const defaultConfig = {
    selectorToggle: '[data-toggle]',
    selectorGlobal: '[data-toggle-global]',
    selectorGroup: '[data-toggle-group]',
    selectorValidate: '[data-toggle-validate]',
    selectorRole: '[data-toggle-role]',
    selectorBack: '[data-toggle-back]',
    selectorNext: '[data-toggle-next]',
    selectorAnimate: '[data-toggle-animate]',
    toggleActiveClass: 'is--active',
    toggleErrorClass: 'is--error',
    toggleCollapseClass: 'is--collapsing',
    toggleShowClass: 'is--show',
    onHover: false,
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
        toggleActiveClass,
        toggleErrorClass,
        toggleCollapseClass,
        toggleShowClass,
        onHover,
        stopVideo,
        callbackOpen,
        callbackClose,
        callbackToggle
    } = {
        ...defaultConfig,
        ...userSettings
    };

    let toggles = [].slice.call($$(selectorToggle));

    if (!toggles.length > 0) return;

    const body = $('body'),
        isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false,
        splitselectorToggle = selectorToggle.replace(/\[|\]/g, ''),
        splitselectorValidate = selectorValidate.replace(/\[|\]/g, ''),
        splitselectorGroup = selectorGroup.replace(/\[|\]/g, ''),
        splitselectorAnimate = selectorAnimate.replace(/\[|\]/g, ''),
        splitselectorRole = selectorRole.replace(/\[|\]/g, '');

    const init = () => {

        destroy();

        isiOS && body.classList.add('is--ios');
        console.log('onHover', onHover);
        events();
    };

    const destroy = () => {
        isiOS && body.classList.remove('is--ios');
        document.removeEventListener('click', clickHandler);
        body.removeEventListener('click', closeActiveGlobal);
    };

    const events = () => {
        document.addEventListener('click', clickHandler);
        body.addEventListener('click', closeActiveGlobal);
    };

    const clickHandler = () => {

        start = performance.now();

        if (!event.target.closest(selectorToggle) && !event.target.closest(selectorBack)) return;
        event.preventDefault();
        if (transitionExpand || transitionCollapse) return;

        toggleItems(event);
    };

    const toggleItems = event => {

        callbackToggle && callbackToggle(target);

        const target = event.target.closest(selectorToggle),
            selector = target.getAttribute(splitselectorToggle),
            group = target.getAttribute(splitselectorGroup),
            role = target.getAttribute(splitselectorRole),
            next = target.closest(selectorNext),
            allGrouped = group ? getGrouped(target, toggleActiveClass, splitselectorAnimate, group, role, splitselectorToggle, splitselectorGroup) : [],
            allToggles = getToggles(target, toggleActiveClass, selector, role, next, splitselectorToggle),
            allDrops = getDrops(target, toggleActiveClass, splitselectorAnimate, selector, role, next),
            allElements = [...allGrouped, ...allToggles, ...allDrops];

        for (let item of allElements) {
            const isActive = item.active;

            if (isActive) {
                const isValid = checkValidity(item);
                if (isValid) break;
            }
            switchBehaviour(item, target, splitselectorToggle);
        }
        end = performance.now();
        console.log('toggleItems ' + (end - start) + 'ms.');
    };

    const switchBehaviour = (item, target, splitselectorToggle) => {

        const isAnimateHeight = item.type === 'drop' && item.animate === 'height';
        const isAnimate = item.type === 'drop' && item.animate === 'default';
        const tabActive = item.role === 'tab' && item.active && isTabActive(item, target, splitselectorToggle);

        if (tabActive) return;


        if (item.role === 'tooltip') {
            setPosition(item);
        }

        if (isAnimateHeight) {
            animateHeight(item, toggleCollapseClass, toggleActiveClass);
        } else if (isAnimate) {
            animateDefault(item, toggleShowClass, toggleActiveClass);
        } else {
            item.active ? close(item) : open(item);
        }
    };

    const open = item => {
        callbackOpen && callbackOpen(item);
        item.value.classList.add(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', true);
        end = performance.now();
        console.log('open ' + (end - start) + 'ms.');
    };

    const close = item => {
        callbackClose && callbackClose(item);
        item.value.classList.remove(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', false);
        end = performance.now();
        console.log('close ' + (end - start) + 'ms.');
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
