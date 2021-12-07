import {
  throttle,
  useMedia,
  setPosition,
  animationExist,
  validateForm,
  setDataset,
} from './lib/Helper';
import { ToggleEvent, toggleMachine } from './core/stateMachine';
import {
  Config,
  EventTargets,
  PointerEvents,
  Types,
  Role,
  CreateElementObject,
} from './types/toggle';

const $ = (element: string) => document.querySelector(element);
const $$ = (elements: string) => document.querySelectorAll(elements);

console.log('toggle oder', toggleMachine.state, toggleMachine.nextEvents);
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

export const selectElements = (
  selectorValue: string,
  selectorData?: string
): HTMLElement[] =>
  [
    ...document.querySelectorAll(
      selectorData ? `[${selectorData}="${selectorValue}"]` : selectorValue
    ),
  ] as HTMLElement[];

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
  { eventType, active, selector, group, target }: EventTargets,
  {
    selectorToggle,
    selectorAnimate,
    selectorGroup,
    toggleActiveClass,
    selectorRole,
  }: Config
): {
  inValid: boolean;
  allElements: CreateElementObject[];
  allGrouped: CreateElementObject[];
} => {
  let inValid = false;

  const allTargets = selectElements(selector, setDataset(selectorToggle)).map(
    target => ({
      type: Types.TOGGLE,
      target,
      role:
        (target.getAttribute(setDataset(selectorRole)) as Role) ?? Role.DEFAULT,
      active,
      isAnimate: target.hasAttribute(setDataset(selectorAnimate)) ?? false,
      eventType,
    })
  );
  const allGroupedTargets = selectElements(group, setDataset(selectorGroup))
    .filter(e => e !== target && e.classList.contains(toggleActiveClass))
    .map(target => ({
      type: Types.TOGGLE,
      target,
      role:
        (target.getAttribute(setDataset(selectorRole)) as Role) ?? Role.DEFAULT,
      active,
      isAnimate: target.hasAttribute(setDataset(selectorAnimate)) ?? false,
      eventType,
    }));

  const allGroupedDrops = allGroupedTargets.map(groupTarget => {
    const target = $(
      groupTarget.target.getAttribute(setDataset(selectorToggle))
    ) as HTMLElement;

    return {
      type: Types.DROP,
      target,
      role: groupTarget.role,
      active,
      isAnimate: target.hasAttribute(setDataset(selectorAnimate)) ?? false,
      eventType,
    };
  });

  const allDrops = selectElements(selector).map(target => ({
    type: Types.DROP,
    target,
    role: allTargets[0].role ?? Role.DEFAULT,
    active,
    isAnimate: target.hasAttribute(setDataset(selectorAnimate)) ?? false,
    eventType,
  }));

  return {
    inValid,
    allElements: [...allTargets, ...allDrops],
    allGrouped: [...allGroupedTargets, ...allGroupedDrops],
  };
};

/**
 *
 * @param {Object} item
 * @param {String} toggleShowClass
 * @param {String} toggleActiveClass
 */
const animateDefault = (
  active: boolean,
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
      item.target.classList.remove(toggleShowClass);
      item.target.classList.remove(toggleActiveClass);
    } else {
      item.target.setAttribute('data-toggle-hidden', true);
      item.role === 'overlay' && removeBodyClass(body);

      item.target.addEventListener('transitionend', transitionEndCollapse);
      item.target.classList.remove(toggleShowClass);
      transitionCollapse = true;
    }
  };

  /**
   *
   * @param {Event} event
   */
  function transitionEndCollapse(event) {
    item.target.removeEventListener('transitionend', transitionEndCollapse);
    item.target.classList.remove(toggleActiveClass);
    transitionCollapse = false;
  }

  /**
   *
   * @param {Object} item
   */
  function expandSection(item) {
    transitionExpand = true;
    item.target.removeAttribute('data-toggle-hidden', true);
    item.role === 'overlay' && addBodyClass(body);

    window.requestAnimationFrame(function () {
      item.target.classList.add(toggleActiveClass);
      window.requestAnimationFrame(function () {
        item.target.classList.add(toggleShowClass);
        item.target.addEventListener('transitionend', transitionEndExpand);
      });
    });
  }

  /**
   *
   *
   * @param {Event} event
   */
  function transitionEndExpand(event) {
    item.target.removeEventListener('transitionend', transitionEndExpand);
    transitionExpand = false;
    item.target.enterLocked = false;
  }

  if (
    eventType === PointerEvents.ENTER ||
    (eventType !== PointerEvents.ENTER && !active)
  ) {
    expandSection(item);
  } else if (
    eventType === PointerEvents.LEAVE ||
    (eventType !== PointerEvents.ENTER && active)
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
  active: boolean,
  item,
  toggleCollapseClass,
  toggleActiveClass,
  toggleCurrentClass
) => {
  const collapseSection = item => {
    transitionCollapse = true;
    const sectionHeight = item.target.scrollHeight;
    item.target.setAttribute('data-toggle-hidden', true);

    window.requestAnimationFrame(function () {
      item.target.style.height = sectionHeight + 'px';
      item.target.classList.add(toggleCollapseClass);
      window.requestAnimationFrame(function () {
        item.target.addEventListener('transitionend', transitionEndCollapse);
        item.target.style.height = 0 + 'px';
      });
    });
  };

  function expandSection(item) {
    transitionExpand = true;
    item.target.classList.add(toggleActiveClass);
    item.target.classList.add(toggleCollapseClass);
    const sectionHeight = item.target.scrollHeight;
    item.target.style.height = sectionHeight + 'px';
    item.target.removeAttribute('data-toggle-hidden', true);
    item.target.addEventListener('transitionend', transitionEndExpand);
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

  if (active) {
    return collapseSection(item);
  } else {
    return expandSection(item);
  }
};

/**
 *
 * @param {HTMLElement} target
 * @param {String} type
 * @param {String} selectorToggle
 */
const setEventTarget = (
  {
    target,
    type,
  }: {
    target: HTMLElement;
    type: Event['type'];
  },
  config: Config
): EventTargets => {
  const item: HTMLElement =
    type === 'click' || type === 'keydown'
      ? target?.closest(config.selectorToggle)
      : target.querySelector(config.selectorToggle);
  const selector = item.getAttribute(setDataset(config.selectorToggle));
  const group = item.getAttribute(setDataset(config.selectorGroup));
  const role =
    (target.getAttribute(setDataset(config.selectorRole)) as Role) ??
    Role.DEFAULT;
  const active = item.classList.contains(config.toggleActiveClass);

  return {
    target: item,
    eventType: type,
    selector,
    group,
    role,
    active,
  };
};

const addBodyClass = body => body.classList.add('is--overlay');
const removeBodyClass = body => body.classList.remove('is--overlay');

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

const Toggle = (userSettings: Partial<Config> = {}): void => {
  const config = {
    ...defaultConfig,
    ...userSettings,
  };

  const body = $('body'),
    isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

  const init = ({ onHover, selectorHover, onMediaQuery }: Config) => {
    destroy(config);
    isiOS && body.classList.add('is--ios');

    if (onHover) {
      handleHover(selectorHover, onMediaQuery, matchMedia, handleMouseEvent);
    }

    events();
  };

  const destroy = (config: Config) => {
    isiOS && body.classList.remove('is--ios');
    document.removeEventListener('click', clickHandler, false);
    document.removeEventListener('keydown', keyHandler, false);

    if (config.onHover && isActive) {
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
    if (!event.target.closest(config.selectorToggle)) {
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
    !event.target.closest(config.selectorToggle) ||
    !event.target.closest(config.selectorHover) ||
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
    const eventTarget = setEventTarget(event, config);

    if (eventTarget.role === Role.TAB && eventTarget.active) return;

    config.callbackToggle && config.callbackToggle(eventTarget);

    const { allElements, inValid, allGrouped } = getToggles(
      eventTarget,
      config
    );

    const hasToValidate = allElements.filter(
      item =>
        item.active &&
        item.type === Types.DROP &&
        item.target.getAttribute(setDataset(config.selectorValidate))
    );

    if (hasToValidate.length > 0) {
      const isValid = validateForm(hasToValidate, config.toggleErrorClass);
      if (isValid) return;
    }

    allGrouped.forEach(item => {
      reduceToggle(
        true,
        item,
        config.toggleCollapseClass,
        config.toggleActiveClass,
        eventType
      );
    });

    for (let i = 0; i < allElements.length; i++) {
      reduceToggle(
        eventTarget.active,
        allElements[i],
        config.toggleCollapseClass,
        config.toggleActiveClass,
        eventType
      );
    }
  };

  const reduceToggle = (
    active,
    item: CreateElementObject,
    toggleCollapseClass,
    toggleActiveClass,
    eventType
  ) => {
    const { isAnimate } = item,
      { exist, animation } = animationExist(item),
      isAnimateHeight = animation.match(/height/gi);

    if (isAnimate && isAnimateHeight) {
      animateHeight(
        active,
        item,
        toggleCollapseClass,
        toggleActiveClass,
        config.toggleCurrentClass
      );
    } else if (isAnimate && exist) {
      animateDefault(
        active,
        item,
        config.toggleShowClass,
        toggleActiveClass,
        eventType,
        config.toggleCurrentClass,
        body
      );
    } else {
      active ? close(item) : open(item);
    }
  };

  const open = item => {
    config.callbackOpen && config.callbackOpen(item);

    item.role === 'tooltip' && setPosition(item);
    item.role === 'overlay' && addBodyClass(body);
    item.target.classList.add(config.toggleActiveClass);
    item.type === 'toggle' && item.target.setAttribute('aria-expanded', true);
    item.type === 'drop' &&
      item.target.removeAttribute('data-toggle-hidden', true);
  };

  const close = item => {
    config.callbackClose && config.callbackClose(item);

    item.role === 'overlay' && removeBodyClass(body);

    item.target.classList.remove(config.toggleActiveClass);
    item.type === 'toggle' && item.target.setAttribute('aria-expanded', false);
    item.type === 'drop' &&
      item.target.setAttribute('data-toggle-hidden', true);
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
      $$(`${config.selectorGlobal}.${config.toggleActiveClass}`)
    );

    if (groupGlobal.length === 0) return;

    if (
      event.target.closest(
        groupGlobal[0].getAttribute(setDataset(config.selectorToggle))
      ) !== null
    )
      return;

    const getToggleTarget = groupGlobal.map(item =>
      $(
        `${item.getAttribute(setDataset(config.selectorToggle))}.${
          config.toggleActiveClass
        }`
      )
    );

    groupGlobal.forEach(item =>
      item.classList.remove(config.toggleActiveClass)
    );
    getToggleTarget.forEach(item => {
      if (item === null) return;
      item.classList.remove(config.toggleActiveClass);
      item.classList.contains(config.toggleShowClass) &&
        item.classList.remove(config.toggleShowClass);
    });
  };

  init(config);
};

export default Toggle;
