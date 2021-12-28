import {
  throttle,
  useMedia,
  setPosition,
  animationExist,
  validateForm,
  setDataset,
} from '~/lib/Helper';
import { ToggleEvent, toggleMachine } from '~/core/stateMachine';
import {
  Config,
  EventTarget,
  EventTypes,
  Types,
  Role,
  ToggleElement,
  KEY_CODE,
  KeyCode,
  HTMLElementEvent,
  ToggleState,
} from '~/types/toggle';
import {
  setConfig,
  defaultConfig,
  createToggles,
} from '~/core/toggle/createToggles';

const $ = (element: string) => document.querySelector(element);
const $$ = (elements: string) => document.querySelectorAll(elements);

console.log('toggle', toggleMachine.state, toggleMachine.nextEvents);
toggleMachine.transition(toggleMachine.state, ToggleEvent.TransitionOn);
console.log('toggle', toggleMachine.state, toggleMachine.nextEvents);
toggleMachine.transition(toggleMachine.state, ToggleEvent.TransitionOn);
console.log('toggle', toggleMachine.state, toggleMachine.nextEvents);

let transitionCollapse = false,
  transitionExpand = false,
  isActive: boolean | null = null,
  allHoverElements: HTMLElement[] = [],
  setMedia = null;

const eventType: null | 'touch' | 'mouse' = null;

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
};

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
  { active, selector, group, target }: EventTarget,
  {
    selectorToggle,
    selectorAnimate,
    selectorGroup,
    toggleActiveClass,
    selectorRole,
  }: Config
): {
  allElements: ToggleElement[];
  allGrouped: ToggleElement[];
} => {
  const allTargets = selectElements(selector, setDataset(selectorToggle)).map(
    target => ({
      type: Types.TOGGLE,
      target,
      role:
        (target.getAttribute(setDataset(selectorRole)) as Role) ?? Role.DEFAULT,
      active,
      animate:
        (target.getAttribute(setDataset(selectorAnimate)) ||
          target.hasAttribute(setDataset(selectorAnimate))) ??
        '',
      selector,
      group,
      valid: false,
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
      animate:
        (target.getAttribute(setDataset(selectorAnimate)) ||
          target.hasAttribute(setDataset(selectorAnimate))) ??
        '',
      selector,
      group,
      valid: false,
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
      animate:
        (target.getAttribute(setDataset(selectorAnimate)) ||
          target.hasAttribute(setDataset(selectorAnimate))) ??
        '',
      selector,
      group,
      valid: false,
    };
  });

  const allDrops = selectElements(selector).map(target => ({
    type: Types.DROP,
    target,
    role: allTargets[0].role ?? Role.DEFAULT,
    active,
    animate:
      (target.getAttribute(setDataset(selectorAnimate)) ||
        target.hasAttribute(setDataset(selectorAnimate))) ??
      '',
    selector,
    group,
    valid: false,
  }));

  return {
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
    eventType === EventTypes.ENTER ||
    (eventType !== EventTypes.ENTER && !active)
  ) {
    expandSection(item);
  } else if (
    eventType === EventTypes.LEAVE ||
    (eventType !== EventTypes.ENTER && active)
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
): EventTarget => {
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

function Toggle(userSettings: Partial<Config> = {}): {
  init: () => void;
  destroy: () => void;
} {
  const config = setConfig(defaultConfig, userSettings);
  const state: ToggleState = {
    activeElement: null,
    activeToggles: [],
    globals: [],
    grouped: {},
    previousActiveElement: null,
    touch: false,
  };

  const body = $('body'),
    isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

  function init() {
    isiOS && body.classList.add('is--ios');
    document.addEventListener('click', clickHandler, false);
    document.addEventListener('keydown', keyHandler, false);

    setMedia = useMedia(config.onMediaQuery, matchMedia);

    if (config.onHover) {
      allHoverElements = selectElements(config.selectorHover);
      console.log('events all', allHoverElements, EventTypes);
      allHoverElements.map(function (item) {
        item.addEventListener(EventTypes.ENTER, mouseHandler, false);
        item.addEventListener(EventTypes.LEAVE, mouseHandler, false);
      });
    }
  }

  const destroy = () => {
    document.removeEventListener('click', clickHandler, false);
    document.removeEventListener('keydown', keyHandler, false);
    config.onHover &&
      allHoverElements.map(function (item) {
        item.removeEventListener(EventTypes.ENTER, mouseHandler, false);
        item.removeEventListener(EventTypes.LEAVE, mouseHandler, false);
      });
  };

  function handleChange(event) {
    console.log('toggle handlechae', state);
    // const toggle = createToggles({ event, config, state });
  }

  const clickHandler = (event: HTMLElementEvent<Event>) => {
    handleChange(event);
    if (!event.target.closest(config.selectorToggle)) {
      closeActiveGlobal(event);
      return;
    }
    event.preventDefault();
    if (transitionExpand || transitionCollapse) return;

    toggleItems(event);
  };

  function mouseHandler(event: HTMLElementEvent<MouseEvent>) {
    handleChange(event);
    toggleItems(event);
  }

  const keyHandler = (event: HTMLElementEvent<KeyboardEvent>) => {
    handleChange(event);
  };

  const toggleItems = event => {
    const eventTarget = setEventTarget(event, config);

    if (eventTarget.role === Role.TAB && eventTarget.active) return;

    config.callbackToggle && config.callbackToggle(eventTarget);

    const { allElements, allGrouped } = getToggles(eventTarget, config);

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
    item: ToggleElement,
    toggleCollapseClass,
    toggleActiveClass,
    eventType
  ) => {
    const { animate } = item,
      animation = animationExist(item.target);
    console.log('anum animation ', animation);
    console.log('anum animate', Boolean(animate), animation, item);
    if (animation?.match(/height/gi)) {
      animateHeight(
        active,
        item,
        toggleCollapseClass,
        toggleActiveClass,
        config.toggleCurrentClass
      );
    } else if (animation && animate) {
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
  };

  const close = item => {
    config.callbackClose && config.callbackClose(item);

    item.role === 'overlay' && removeBodyClass(body);

    item.target.classList.remove(config.toggleActiveClass);
    item.type === 'toggle' && item.target.setAttribute('aria-expanded', false);
  };

  const closeActiveGlobal = event => {
    const targets = [
      ...$$(`${config.selectorGlobal}.${config.toggleActiveClass}`),
    ];

    console.log('group wie', targets, Boolean(targets));

    if (targets.length === 0) return;

    targets.forEach(toggleItems);
    // if (groupGlobal.length === 0) return;

    // if (
    //   event.target.closest(
    //     groupGlobal[0].getAttribute(setDataset(config.selectorToggle))
    //   ) !== null
    // )
    //   return;

    // const getToggleTarget = groupGlobal.map(item =>
    //   $(
    //     `${item.getAttribute(setDataset(config.selectorToggle))}.${
    //       config.toggleActiveClass
    //     }`
    //   )
    // );

    // groupGlobal.forEach(item =>
    //   item.classList.remove(config.toggleActiveClass)
    // );
    // getToggleTarget.forEach(item => {
    //   if (item === null) return;
    //   item.classList.remove(config.toggleActiveClass);
    //   item.classList.contains(config.toggleShowClass) &&
    //     item.classList.remove(config.toggleShowClass);
    // });
  };

  return {
    init,
    destroy,
  };
}

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(_ => {
    location.reload();
  });
}
export default Toggle;
