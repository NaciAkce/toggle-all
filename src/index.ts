import {
  throttle,
  useMedia,
  setPosition,
  animationExist,
  validateForm,
} from './lib/Helper';
import { ToggleEvent, toggleMachine } from './core/stateMachine';
const $ = (element: string) => document.querySelector(element);
const $$ = (elements: string) => document.querySelectorAll(elements);

console.log('toggle', toggleMachine.state, toggleMachine.nextEvents);
toggleMachine.transition(toggleMachine.state, ToggleEvent.TransitionOn);
console.log('toggle', toggleMachine.state, toggleMachine.nextEvents);
toggleMachine.transition(toggleMachine.state, ToggleEvent.TransitionOn);
console.log('toggle', toggleMachine.state, toggleMachine.nextEvents);

let transitionCollapse = false,
  transitionExpand = false,
  setMedia = null,
  allHoverElements: HTMLElement[] = [],
  tHandler: () => void | null,
  eventType: null | 'touch' | 'mouse' = null,
  isActive: boolean | null = null,
  focusable: HTMLElement[],
  previousElement: Element;

const tabbableBreadcrumb: Array<{ element: HTMLElement; active: HTMLElement }> =
  [];

const ENTER_KEY_CODE = 'Enter',
  UP_KEY_CODE = 'ArrowDown',
  DOWN_KEY_CODE = 'ArrowUp',
  TAB_KEY_CODE = 'Tab',
  SHIFT_KEY_CODE = 16,
  ESCAPE_KEY_CODE = 'Escape';

/**
 *
 * @param {Object} code
 * @return {Boolean}...
 */
const keyEvents = ({ code }: { code: string | number }) =>
  code === UP_KEY_CODE ||
  code === DOWN_KEY_CODE ||
  code === TAB_KEY_CODE ||
  code === ESCAPE_KEY_CODE ||
  code === SHIFT_KEY_CODE;

/**
 *
 * @param {Object} mq
 */
const matchMedia = (mq: MediaQueryList) => {
  const matches = mq.matches;
  if (matches && (isActive === false || isActive === null)) {
    isActive = true;
  }
  if (!matches && (isActive === true || isActive === null)) {
    isActive = false;
  }
  checkEvent();
};

/**
 *
 * @param {Function} handleMouseEvent test
 */
const detectMouse = handleMouseEvent => event => {
  if (
    (eventType !== null &&
      eventType === event.pointerType &&
      isActive &&
      eventType === 'touch') ||
    (!isActive && eventType === 'mouse')
  )
    return;

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
function handleHover(
  selectorHover,
  onnHoverMediaQuery,
  matchMedia,
  handleMouseEvent
) {
  allHoverElements = [].slice.call($$(selectorHover));
  tHandler = throttle(detectMouse(handleMouseEvent), 100);
  checkEvent();
  setMedia = useMedia(onnHoverMediaQuery, matchMedia);

  if (setMedia) {
    isActive = true;
  }
}

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
 * Item Object
 * @param {String} type
 * @param {HTMLElement} value
 * @param {String} role
 * @param {String} toggleActiveClass
 * @return {Object}.....Item Object
 */
const createElementObject = (
  type,
  value,
  role,
  toggleActiveClass,
  eventType,
  selectorAnimate
) => {
  const isActive = value.classList.contains(toggleActiveClass);
  const animate = value.hasAttribute(selectorAnimate)
    ? value.hasAttribute(selectorAnimate)
    : false;

  return {
    type: type,
    value: value,
    role: role ?? 'default',
    active: isActive,
    isAnimate: type === 'drop' && animate,
    eventType: eventType,
    tabActive: role === 'tab' && isActive,
  };
};

/**
 * Get Toggles
 * @param {HTMLElement} target
 * @param {String} toggleActiveClass
 * @param {String} selector
 * @param {String} role
 * @param {String} splitSelectorToggle
 * @return {Array}
 */
const getToggles = (
  target,
  toggleActiveClass,
  selector,
  role,
  splitSelectorToggle,
  eventType
) => {
  return [].slice
    .call($$(`[${splitSelectorToggle}="${selector}"]`))
    .map(toggle =>
      createElementObject(
        'toggle',
        toggle,
        role,
        toggleActiveClass,
        eventType,
        null
      )
    );
};

/**
 * Get Grouped
 * @param {HTMLElement} target
 * @param {String} toggleActiveClass
 * @param {String} selectorAnimate
 * @param {String} group
 * @param {String} role
 * @param {String} splitSelectorToggle
 * @param {String} splitselectorGroup
 * @return {Array}
 */
const getGrouped = (
  target: HTMLElement,
  toggleActiveClass: string,
  group: string,
  role: string,
  splitSelectorToggle: string,
  splitselectorGroup: string,
  eventType: string,
  selectorAnimate: string
) => {
  return [].slice
    .call($$(`[${splitselectorGroup}="${group}"]`))
    .filter(e => e !== target && e.classList.contains(toggleActiveClass))
    .reduce((obj, item) => {
      const dropItem = $(item.getAttribute(splitSelectorToggle)),
        toggle = createElementObject(
          'toggle',
          item,
          role,
          toggleActiveClass,
          eventType,
          null
        ),
        drop = createElementObject(
          'drop',
          dropItem,
          role,
          toggleActiveClass,
          eventType,
          selectorAnimate
        );
      return [...obj, toggle, drop];
    }, []);
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
const getDrops = (
  target,
  toggleActiveClass,
  selector,
  role,
  splitSelectorToggle,
  eventType,
  selectorAnimate
) =>
  [].slice.call($$(selector)).map(drop => {
    return createElementObject(
      'drop',
      drop,
      role,
      toggleActiveClass,
      eventType,
      selectorAnimate
    );
  });

/**
 *
 * @param {Object} item
 * @param {String} toggleShowClass
 * @param {String} toggleActiveClass
 */
const animateDefault = (
  item,
  toggleShowClass,
  toggleActiveClass,
  eventType,
  toggleCurrentClass,
  body
) => {
  /**
   *
   * @param {Object} item
   */
  const collapseSection = item => {
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
  }

  if (
    eventType === PointerEvents.ENTER ||
    (eventType !== PointerEvents.ENTER && !item.active)
  ) {
    expandSection(item);
  } else if (
    eventType === PointerEvents.LEAVE ||
    (eventType !== PointerEvents.ENTER && item.active)
  ) {
    collapseSection(item);
  }
};

/**
 *
 * @param {Object} item
 * @param {String} toggleCollapseClass
 * @param {String} toggleActiveClass
 */
const animateHeight = (
  item,
  toggleCollapseClass,
  toggleActiveClass,
  toggleCurrentClass
) => {
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
  }

  function transitionEndCollapse(event) {
    event.target.removeEventListener('transitionend', transitionEndCollapse);
    endCollapse(event.target);
  }

  const endCollapse = item => {
    item.classList.remove(toggleCollapseClass);
    item.classList.remove(toggleActiveClass);
    item.style.height = null;
    transitionCollapse = false;
  };

  const endExpand = item => {
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

enum PointerEvents {
  ENTER = 'pointerenter',
  LEAVE = 'pointerleave',
}

/**
 *
 * @param {HTMLElement} target
 * @param {String} type
 * @param {String} selectorToggle
 */
const eventTarget = (event, selectorToggle) => {
  const item =
    event.type === 'click'
      ? event.target?.closest(selectorToggle)
      : event.target.querySelector(selectorToggle);

  return {
    target: item,
    type: event.type,
  };
};

const addBodyClass = body => body.classList.add('is--overlay');
const removeBodyClass = body => body.classList.remove('is--overlay');

interface Config {
  selectorToggle: string;
  selectorGlobal: string;
  selectorGroup: string;
  selectorValidate: string;
  selectorRole: string;
  selectorAnimate: string;
  selectorHover: string;
  toggleActiveClass: string;
  toggleErrorClass: string;
  toggleCollapseClass: string;
  toggleShowClass: string;
  toggleCurrentClass: string;
  onHover: boolean;
  onMediaQuery: string;
  stopVideo: boolean;
  callbackOpen: (target: HTMLElement) => void | null;
  callbackClose: (target: HTMLElement) => void | null;
  callbackToggle: (target: HTMLElement) => void | null;
}

const defaultConfig: Config = {
  selectorToggle: '[data-toggle]',
  selectorGlobal: '[data-toggle-global]',
  selectorGroup: '[data-toggle-group]',
  selectorValidate: '[data-toggle-validate]',
  selectorRole: '[data-toggle-role]',
  selectorAnimate: '[data-toggle-animate]',
  selectorHover: '[data-toggle-hover]',
  toggleActiveClass: 'is--active',
  toggleErrorClass: 'is--error',
  toggleCollapseClass: 'is--collapsing',
  toggleShowClass: 'is--show',
  toggleCurrentClass: 'is--current',
  onHover: false,
  onMediaQuery: '(max-width: 992px)',
  stopVideo: true,
  callbackOpen: null,
  callbackClose: null,
  callbackToggle: null,
};

const Toggle = (userSettings: Partial<Config> = {}) => {
  const {
    selectorToggle,
    selectorGlobal,
    selectorGroup,
    selectorValidate,
    selectorRole,
    selectorAnimate,
    selectorHover,
    toggleActiveClass,
    toggleErrorClass,
    toggleCollapseClass,
    toggleShowClass,
    toggleCurrentClass,
    onHover,
    onMediaQuery,
    stopVideo,
    callbackOpen,
    callbackClose,
    callbackToggle,
    splitSelectorToggle = selectorToggle.replace(/\[|\]/g, '') as string,
    splitselectorValidate = selectorValidate.replace(/\[|\]/g, '') as string,
    splitselectorGroup = selectorGroup.replace(/\[|\]/g, '') as string,
    splitselectorAnimate = selectorAnimate.replace(/\[|\]/g, '') as string,
    splitselectorHover = selectorHover.replace(/\[|\]/g, '') as string,
    splitselectorRole = selectorRole.replace(/\[|\]/g, '') as string,
  } = {
    ...defaultConfig,
    ...userSettings,
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
        Object.values(PointerEvents).map(type => {
          item.removeEventListener(type, mouseHandler);
        });
      });
    }
  };

  const events = () => {
    document.addEventListener('click', clickHandler, false);
    document.addEventListener('keydown', keyHandler, false);
  };

  const clickHandler = event => {
    if (!event.target.closest(selectorToggle)) {
      closeActiveGlobal(event);
      return;
    }
    event.preventDefault();
    if (transitionExpand || transitionCollapse) return;

    toggleItems(event);
  };

  function mouseHandler(event) {
    if (event.type === PointerEvents.ENTER) {
      this.enterLocked = true;
    }
    if (!this.enterLocked && event.type === PointerEvents.ENTER) return;

    toggleItems(event);
  }

  const handleMouseEvent = eventType => {
    if (eventType === 'touch') {
      allHoverElements.map(function (item) {
        item.removeEventListener(PointerEvents.ENTER, mouseHandler, false);
        item.removeEventListener(PointerEvents.LEAVE, mouseHandler, false);
      });
    }

    if (eventType === 'mouse') {
      allHoverElements.map(function (item) {
        item.addEventListener(PointerEvents.ENTER, mouseHandler, false);
        item.addEventListener(PointerEvents.LEAVE, mouseHandler, false);
      });
    }
  };

  const returnKey = event =>
    !event.target.closest(selectorToggle) ||
    !event.target.closest(selectorHover) ||
    event.code !== ENTER_KEY_CODE;

  const keyHandler = event => {
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
    const { target, type } = eventTarget(event, selectorToggle);

    callbackToggle && callbackToggle(target);

    const selector = target.getAttribute(splitSelectorToggle),
      group = target.getAttribute(splitselectorGroup),
      role = target.getAttribute(splitselectorRole),
      allGrouped = group
        ? getGrouped(
            target,
            toggleActiveClass,
            group,
            role,
            splitSelectorToggle,
            splitselectorGroup,
            type,
            splitselectorAnimate
          )
        : [],
      allToggles = getToggles(
        target,
        toggleActiveClass,
        selector,
        role,
        splitSelectorToggle,
        type
      ),
      allDrops = getDrops(
        target,
        toggleActiveClass,
        selector,
        role,
        splitSelectorToggle,
        type,
        splitselectorAnimate
      ),
      allElements = [...allGrouped, ...allToggles, ...allDrops];

    console.log('toggles', allToggles);
    if (allToggles[0].tabActive) return;

    const hasToValidate = allElements.filter(
      item =>
        item.active &&
        item.type === 'drop' &&
        item.value.hasAttribute(splitselectorValidate)
    );

    if (hasToValidate) {
      const isValid = validateForm(
        hasToValidate,
        splitselectorValidate,
        toggleErrorClass
      );
      if (isValid) return;
    }

    for (let i = 0; i < allElements.length; i++) {
      reduceToggle(
        allElements[i],
        toggleCollapseClass,
        toggleActiveClass,
        eventType,
        target
      );
    }
  };

  const reduceToggle = (
    item,
    toggleCollapseClass,
    toggleActiveClass,
    eventType,
    target
  ) => {
    const { isAnimate } = item,
      { exist, animation } = animationExist(item),
      isAnimateHeight = animation.match(/height/gi);

    if (isAnimate && isAnimateHeight) {
      animateHeight(
        item,
        toggleCollapseClass,
        toggleActiveClass,
        toggleCurrentClass
      );
    } else if (isAnimate && exist) {
      animateDefault(
        item,
        toggleShowClass,
        toggleActiveClass,
        eventType,
        toggleCurrentClass,
        body
      );
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
    item.type === 'drop' &&
      item.value.removeAttribute('data-toggle-hidden', true);
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
  const tab = event => {
    previousElement = document.activeElement;

    const parentItem = {
      item: tabbableBreadcrumb[0].active,
      type: event.type,
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
    const groupGlobal = [].slice.call(
      $$(`${selectorGlobal}.${toggleActiveClass}`)
    );

    if (groupGlobal.length === 0) return;

    if (
      event.target.closest(groupGlobal[0].getAttribute(splitSelectorToggle)) !==
      null
    )
      return;

    const getToggleTarget = groupGlobal.map(item =>
      $(`${item.getAttribute(splitSelectorToggle)}.${toggleActiveClass}`)
    );

    groupGlobal.forEach(item => item.classList.remove(toggleActiveClass));
    getToggleTarget.forEach(item => {
      if (item === null) return;
      item.classList.remove(toggleActiveClass);
      item.classList.contains(toggleShowClass) &&
        item.classList.remove(toggleShowClass);
    });
  };

  init();
};

export default Toggle;
