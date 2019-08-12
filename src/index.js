import './scss/styles.scss';
const $ = element => document.querySelector(element);
const $$ = elements => document.querySelectorAll(elements);

const defaultConfig = {
    selectorToggle: '[data-toggle]',
    selectorGlobal: '[data-toggle-global]',
    selectorGroup: '[data-toggle-group]',
    selectorValidate: '[data-toggle-validate]',
    selectorRole: '[data-toggle-role]',
    toggleActiveClass: 'is--active',
    toggleErrorClass: 'is--error',
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
        toggleActiveClass,
        toggleErrorClass,
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

    // eslint-disable-next-line complexity
    const toggleItems = event => {
        if (!event.target.closest(selectorToggle)) return;
        event.preventDefault();

        const target = event.target.closest(selectorToggle);

        callbackToggle && callbackToggle(target);

        const allElements = allToggles(toggles, target);

        if (!allElements) return;

        for (let item of allElements) {
            if (
                item.value.classList.contains(toggleActiveClass) &&
                item.role === 'tab' &&
                (item.value === target || item.value === $(target.getAttribute(splitselectorToggle)))
            )
                return;

            if (item.value.classList.contains(toggleActiveClass)) {
                var form =
                    item.type === 'drop' && item.value.hasAttribute(splitselectorValidate)
                        ? item.value.querySelectorAll('[required]')
                        : false;

                if (form) {
                    const arrOfInputs = [].slice.call(form);
                    const isValid = checkValidity(arrOfInputs);

                    if (isValid) {
                        isValid[0].focus();
                        isValid[0].classList.add(toggleErrorClass);
                        setTimeout(() => {
                            const ElementPosition = isValid[0].getBoundingClientRect().top;
                            window.scrollBy({ top: ElementPosition, left: 0, behavior: 'smooth' });
                        }, 250);
                        break;
                    } else {
                        form.forEach(
                            item => item.classList.contains(toggleErrorClass) && item.classList.remove(toggleErrorClass)
                        );
                    }
                }
                close(item);
            } else {
                open(item);
            }
        }
    };

    const open = item => {
        callbackOpen && callbackOpen(item);

        if (item.type === 'drop' && item.role === 'accordion') {
            expandSection(item.value);
        } else {
            item.value.classList.add(toggleActiveClass);
            item.type === 'toggle' && item.value.setAttribute('aria-expanded', true);
            setTimeout(() => item.role === 'tab' && item.value.classList.add(toggleShowClass), 15);
        }
    };

    const close = item => {
        callbackClose && callbackClose(item);
        if (item.type === 'drop' && item.role === 'accordion') {
            collapseSection(item.value);
        } else {
            item.value.classList.remove(toggleActiveClass);
            item.type === 'toggle' && item.value.setAttribute('aria-expanded', false);
            item.role === 'tab' && item.value.classList.remove(toggleShowClass);
        }
    };

    const checkValidity = items => {
        const valid = items.filter(item => !item.checkValidity());

        return valid.length !== 0 ? valid : false;
    };

    const closeActiveGlobal = event => {
        const groupGlobal = $(`${selectorGlobal}.${toggleActiveClass}`);

        if (!groupGlobal) return;

        if (
            event.target.closest(`${selectorGlobal}.${toggleActiveClass}`) !== null ||
            event.target.closest(groupGlobal.getAttribute(splitselectorToggle)) !== null
        )
            return;

        const getToggleTarget = $(groupGlobal.getAttribute(splitselectorToggle));

        groupGlobal.classList.remove(toggleActiveClass);
        getToggleTarget.classList.remove(toggleActiveClass);
    };

    const allToggles = (toggles, target) => {
        const selector = target.getAttribute(splitselectorToggle);
        const group = target.getAttribute(splitselectorGroup);
        const role = target.getAttribute(splitselectorRole);

        const groupedToggle = group
            ? [].slice
                  .call($$(`[${splitselectorGroup}="${group}"]`))
                  .filter(e => e !== target && e.classList.contains(toggleActiveClass))
            : false;
        const drop = $(selector);
        const filtered = toggles.filter(elem => elem.getAttribute(splitselectorToggle) === selector);

        const allElements = filtered
            .reduce((all, toggle, index, arr) => {
                let grouped = [];

                const newArray = [
                    {
                        type: 'drop',
                        value: drop,
                        role: role ? role : 'default'
                    },
                    {
                        type: 'toggle',
                        value: toggle,
                        role: role ? role : 'default'
                    }
                ];

                if (groupedToggle.length > 0) {
                    const groupDrop = $(groupedToggle[0].getAttribute(splitselectorToggle));
                    grouped = [
                        {
                            type: 'drop',
                            value: groupDrop,
                            role: role
                        },
                        {
                            type: 'toggle',
                            value: groupedToggle[0],
                            role: role
                        }
                    ];
                }
                return [...all, ...grouped, ...newArray];
            }, [])
            .reduce((acc, current) => {
                const x = acc.find(item => item.value === current.value) || current.value === null;
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);

        return allElements;
    };

    const collapseSection = item => {
        item.classList.add('collapsing');
        var sectionHeight = item.scrollHeight;
        var elementTransition = item.style.transition;
        item.style.transition = '';

        requestAnimationFrame(function() {
            item.style.height = sectionHeight + 'px';
            item.style.transition = elementTransition;

            requestAnimationFrame(function() {
                item.style.height = 0 + 'px';
                item.classList.remove('collapsing');
                item.classList.remove(toggleActiveClass);
            });
        });
    };

    function expandSection(item) {
        item.classList.add(toggleActiveClass);
        item.classList.add('collapsing');
        var sectionHeight = item.scrollHeight;
        item.style.height = sectionHeight + 'px';
        item.addEventListener('transitionend', transitionEnd);
    }

    function transitionEnd(e) {
        e.target.removeEventListener('transitionend', transitionEnd);
        e.target.style.height = null;
        e.target.classList.remove('collapsing');
    }

    init();
};

export default Toggle;
