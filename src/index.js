/* eslint-disable prettier/prettier */

const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);

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
 * @param  {Node}   elem     The element
 * @param  {String} selector The selector to match against
 * @return {Node}            The sibling
 */
const getNextSibling = function (elem, selector) {
    const sibling = elem.nextElementSibling;

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
 * @param {NNode} value
 * @param {String} role
 * @param {String} toggleActiveClass
 * @return {Object}.....Item Object
 */
const createElementObject = (type, value, role, toggleActiveClass) => ({
    type: type,
    value: value,
    role: role ? role : 'default',
    active: value.classList.contains(toggleActiveClass)
});

const defaultConfig = {
    selectorToggle: '[data-toggle]',
    selectorGlobal: '[data-toggle-global]',
    selectorGroup: '[data-toggle-group]',
    selectorValidate: '[data-toggle-validate]',
    selectorRole: '[data-toggle-role]',
    selectorBack: '[data-toggle-back]',
    selectorNext: '[data-toggle-next]',
    toggleActiveClass: 'is--active',
    toggleErrorClass: 'is--error',
    toggleCollapseClass: 'is--collapsing',
    toggleShowClass: 'is--show',
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
        toggleActiveClass,
        toggleErrorClass,
        toggleCollapseClass,
        toggleShowClass,
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
        splitselectorRole = selectorRole.replace(/\[|\]/g, '');

    const init = () => {
        destroy();
        isiOS && body.classList.add('is--ios');
        events();
    };

    const destroy = () => {
        isiOS && body.classList.remove('is--ios');
        document.removeEventListener('click', toggleItems);
        body.removeEventListener('click', closeActiveGlobal);
    };

    const events = () => {
        document.addEventListener('click', toggleItems);
        body.addEventListener('click', closeActiveGlobal);
    };

    const toggleItems = event => {
        if (!event.target.closest(selectorToggle) || event.target.closest(selectorBack)) return;
        event.preventDefault();

        const target = event.target.closest(selectorToggle);

        callbackToggle && callbackToggle(target);

        const allElements = allToggles(toggles, target);

        for (let item of allElements) {
            const isActive = item.active;


            switchType(item, target, splitselectorToggle);
            if (isActive) {
                const isValid = checkValidity(item);
                if (isValid) break;

                // close(item);
            } else {
                // open(item);
            }
        }
    };

    const switchType = (item, target, splitselectorToggle) => {
        switch (item.role) {
            case 'accordion':
                if (item.active) {
                    item.type === 'drop' ? collapseSection(item.value) : close(item);
                } else {
                    item.type === 'drop' ? expandSection(item.value) : open(item);
                }
                break;
            case 'tab':
                if (item.active) {
                    if (isTabActive(item, target, splitselectorToggle)) return;
                    close(item);
                    item.role === 'tab' && item.value.classList.remove(toggleShowClass);
                } else {
                    open(item);
                    setTimeout(() => item.value.classList.add(toggleShowClass), 15);
                }
                break;
            default:
                item.active ? close(item) : open(item);
                break;
        }
    };

    const open = item => {
        callbackOpen && callbackOpen(item);
        item.value.classList.add(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', true);
    };

    const close = item => {
        callbackClose && callbackClose(item);
        item.value.classList.remove(toggleActiveClass);
        item.type === 'toggle' && item.value.setAttribute('aria-expanded', false);
    };

    const allToggles = (toggles, target) => {
        const selector = target.getAttribute(splitselectorToggle);
        const group = target.getAttribute(splitselectorGroup);
        const role = target.getAttribute(splitselectorRole);

        const groupedToggle = group
            ? [].slice
                .call($$(`[${splitselectorGroup}="${group}"]`))
                .filter(e => e !== target && e.classList.contains(toggleActiveClass))
                .reduce((obj, item) => {
                    const dropItem = $(item.getAttribute(splitselectorToggle)),
                        toggle = createElementObject('toggle', item, role, toggleActiveClass),
                        drop = createElementObject('drop', dropItem, role, toggleActiveClass);
                    return [...obj, toggle, drop];
                }, [])
            : [];

        const allToggles = target.closest(selectorNext)
            ? [createElementObject('toggle', target, role, toggleActiveClass)]
            : toggles
                .filter(toggle => toggle.getAttribute(splitselectorToggle) === selector)
                .map(toggle => createElementObject('toggle', toggle, role, toggleActiveClass));

        const drops = target.closest(selectorNext)
            ? [createElementObject('drop', getNextSibling(target, selector), role, toggleActiveClass)]
            : [].slice.call($$(selector)).map(drop => {
                return createElementObject('drop', drop, role, toggleActiveClass);
            });

        const allElements = [...drops, ...groupedToggle, ...allToggles];

        return allElements;
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
        getToggleTarget.forEach(item => item.classList.remove(toggleActiveClass));
    };

    const collapseSection = item => {
        const sectionHeight = item.scrollHeight;
        window.requestAnimationFrame(function () {
            item.style.height = sectionHeight + 'px';
            item.classList.add(toggleCollapseClass);
            window.requestAnimationFrame(function () {
                item.style.height = 0 + 'px';
                item.addEventListener('transitionend', transitionEndCollapse);

            });
        });

    };

    function expandSection(item) {
        const sectionHeight = item.scrollHeight;
        item.classList.add(toggleActiveClass);
        item.classList.add(toggleCollapseClass);
        item.style.height = sectionHeight + 'px';
        item.addEventListener('transitionend', transitionEndExpand);
    }

    function transitionEndExpand(event) {
        const target = event.target;
        target.removeEventListener('transitionend', transitionEndExpand);
        target.classList.remove(toggleCollapseClass);
        target.style.height = null;
    }

    function transitionEndCollapse(event) {
        const target = event.target;
        target.classList.remove(toggleCollapseClass);
        target.removeEventListener('transitionend', transitionEndCollapse);
        target.classList.remove(toggleActiveClass);
        target.style.height = null;

    }

    init();
};

export default Toggle;
