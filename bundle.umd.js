(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.toggle = factory());
}(this, function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var throttle = function throttle(func, interval) {
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = false;
      };

      if (!timeout) {
        func.apply(context, args);
        timeout = true;
        setTimeout(later, interval);
      }
    };
  };
  var useMedia = function useMedia(query, listener) {
    // eslint-disable-next-line no-console
    if (!listener || typeof listener !== 'function') console.error('Must be a function');
    var matches = window.matchMedia(query).matches,
        media = window.matchMedia(query);
    media.addListener(listener);
    listener(media);
    return matches;
  };

  var $ = function $(element) {
    return document.querySelector(element);
  };

  var $$ = function $$(elements) {
    return document.querySelectorAll(elements);
  };

  var start, end;
  var transitionCollapse = false,
      transitionExpand = false,
      setMedia = null;
  var mouseEvents = ['mouseenter', 'mouseleave'];
  var ENTER_KEY_CODE = 13;

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

  var animationExist = function animationExist(item) {
    var prop = window.getComputedStyle(item.value, null).getPropertyValue('transition-duration');
    return item.type === 'drop' && prop !== '0s';
  };
  /** 
   * @param  {Node}.......The element to check
   * @return {Object}     A set of booleans for each side of the element
   */


  var isOutOfViewport = function isOutOfViewport(elem) {
    var bounding = elem.getBoundingClientRect();
    var out = {};
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


  var getNextSibling = function getNextSibling(elem, selector) {
    var sibling = elem.nextElementSibling;
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


  var isTabActive = function isTabActive(item, target, splitselectorToggle) {
    return item === target || item === $(target.getAttribute(splitselectorToggle));
  };
  /**
   * Item Object
   * @param {String} type
   * @param {Node} value
   * @param {String} role
   * @param {String} toggleActiveClass
   * @return {Object}.....Item Object
   */


  var createElementObject = function createElementObject(type, value, role, toggleActiveClass, selectorAnimate, active, target, splitselectorToggle) {
    var animate = value.hasAttribute(selectorAnimate) ? value.getAttribute(selectorAnimate) : false;
    var isActive = active !== null && value.classList.contains(toggleActiveClass) ? false : value.classList.contains(toggleActiveClass);
    return {
      type: type,
      value: value,
      role: role ? role : 'default',
      active: isActive,
      isAnimateHeight: type === 'drop' && animate === 'height',
      isAnimate: type === 'drop' && animate === 'default',
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


  var getGrouped = function getGrouped(target, toggleActiveClass, selectorAnimate, group, role, splitselectorToggle, splitselectorGroup, active, next) {
    return [].slice.call($$("[".concat(splitselectorGroup, "=\"").concat(group, "\"]"))).filter(function (e) {
      return e !== target && e.classList.contains(toggleActiveClass);
    }).reduce(function (obj, item) {
      var dropItem = next ? getNextSibling(item, item.getAttribute(splitselectorToggle)) : $(item.getAttribute(splitselectorToggle)),
          toggle = createElementObject('toggle', item, role, toggleActiveClass, null, active = null, target, splitselectorToggle),
          drop = createElementObject('drop', dropItem, role, toggleActiveClass, selectorAnimate, active = null, target, splitselectorToggle);
      return [].concat(_toConsumableArray(obj), [toggle, drop]);
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


  var getToggles = function getToggles(target, toggleActiveClass, selector, role, next, splitselectorToggle, active, splitselectorBack) {
    // const back = target.closest(`[${splitselectorBack}]`) ? [].slice.call(target.closest(`[${splitselectorBack}]`).querySelectorAll(`[${splitselectorToggle}="${selector}"]`)) : [];
    // const backToggle = target.parentNode.querySelector(`[${splitselectorBack}]`) ? [createElementObject('toggle', target.parentNode.querySelector(`[${splitselectorBack}]`), role, toggleActiveClass, null, active)] : [];
    // console.log(backToggle, target.closest(`[${splitselectorBack}]`));
    return next ? [createElementObject('toggle', target, role, toggleActiveClass, null, active)] : [].slice.call($$("[".concat(splitselectorToggle, "=\"").concat(selector, "\"]"))).map(function (toggle) {
      return createElementObject('toggle', toggle, role, toggleActiveClass, null, active, target, splitselectorToggle);
    });
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


  var getDrops = function getDrops(target, toggleActiveClass, selectorAnimate, selector, role, next, splitselectorToggle, active) {
    return next ? [createElementObject('drop', getNextSibling(target, selector), role, toggleActiveClass, selectorAnimate, active)] : [].slice.call($$(selector)).map(function (drop) {
      return createElementObject('drop', drop, role, toggleActiveClass, selectorAnimate, active, target, splitselectorToggle);
    });
  };
  /**
   * 
   * @param {Node} item 
   * @param {String} toggleCollapseClass 
   * @param {String} toggleActiveClass 
   */


  var animateHeight = function animateHeight(item, toggleCollapseClass, toggleActiveClass) {
    var collapseSection = function collapseSection(item) {
      transitionCollapse = true;
      var sectionHeight = item.value.scrollHeight;
      window.requestAnimationFrame(function () {
        item.value.style.height = sectionHeight + 'px';
        item.value.classList.add(toggleCollapseClass);
        var transitionExist = animationExist(item);
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
      var sectionHeight = item.value.scrollHeight;
      item.value.style.height = sectionHeight + 'px';
      var transitionExist = animationExist(item);
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

    var endCollapse = function endCollapse(item) {
      item.classList.remove(toggleCollapseClass);
      item.classList.remove(toggleActiveClass);
      item.style.height = null;
      transitionCollapse = false;
    };

    var endExpand = function endExpand(item) {
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
   * @param {Node} item 
   * @param {String} toggleShowClass 
   * @param {String} toggleActiveClass 
   */


  var animateDefaultCollapse = function animateDefaultCollapse(item, toggleShowClass, toggleActiveClass) {
    var transitionExist = animationExist(item);
    console.log('collapse ', item);

    var collapseSection = function collapseSection(item) {
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
      console.log('collapse ', event.target);
      item.value.removeEventListener('transitionend', transitionEndCollapse);
      item.value.classList.remove(toggleActiveClass);
      transitionCollapse = false;
    }

    var removeAll = function removeAll(item) {
      item.value.classList.remove(toggleShowClass);
      item.value.classList.remove(toggleActiveClass);
      transitionCollapse = false;
    };

    transitionExist ? collapseSection(item) : removeAll(item);
  };
  /**
   * 
   * @param {Node} item 
   * @param {String} toggleShowClass 
   * @param {String} toggleActiveClass 
   */


  var animateDefaultExpand = function animateDefaultExpand(item, toggleShowClass, toggleActiveClass) {
    var transitionExist = animationExist(item);

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
      item.value.removeEventListener('transitionend', transitionEndExpand);
      transitionExpand = false;
    }

    var addAll = function addAll(item) {
      item.value.classList.add(toggleActiveClass);
      item.value.classList.add(toggleShowClass);
      transitionExpand = false;
    };

    transitionExist ? expandSection(item) : addAll(item);
  };
  /**
   * 
   * @param {Node} item 
   */


  var setPosition = function setPosition(item) {
    if (item.type === 'toggle') return;
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
  /**
   * 
   * @param {Node} target 
   * @param {String} type 
   * @param {String} selectorToggle 
   */


  var getEventTarget = function getEventTarget(target, type, selectorToggle) {
    var item = target.querySelector(selectorToggle);
    return {
      item: item,
      active: type === 'mouseenter' ? true : null
    };
  };

  var defaultConfig = {
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

  var Toggle = function Toggle() {
    var userSettings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _defaultConfig$userSe = _objectSpread2({}, defaultConfig, {}, userSettings),
        selectorToggle = _defaultConfig$userSe.selectorToggle,
        selectorGlobal = _defaultConfig$userSe.selectorGlobal,
        selectorGroup = _defaultConfig$userSe.selectorGroup,
        selectorValidate = _defaultConfig$userSe.selectorValidate,
        selectorRole = _defaultConfig$userSe.selectorRole,
        selectorBack = _defaultConfig$userSe.selectorBack,
        selectorNext = _defaultConfig$userSe.selectorNext,
        selectorAnimate = _defaultConfig$userSe.selectorAnimate,
        selectorHover = _defaultConfig$userSe.selectorHover,
        toggleActiveClass = _defaultConfig$userSe.toggleActiveClass,
        toggleErrorClass = _defaultConfig$userSe.toggleErrorClass,
        toggleCollapseClass = _defaultConfig$userSe.toggleCollapseClass,
        toggleShowClass = _defaultConfig$userSe.toggleShowClass,
        onHover = _defaultConfig$userSe.onHover,
        onnHoverMediaQuery = _defaultConfig$userSe.onnHoverMediaQuery,
        stopVideo = _defaultConfig$userSe.stopVideo,
        callbackOpen = _defaultConfig$userSe.callbackOpen,
        callbackClose = _defaultConfig$userSe.callbackClose,
        callbackToggle = _defaultConfig$userSe.callbackToggle,
        _defaultConfig$userSe2 = _defaultConfig$userSe.splitselectorToggle,
        splitselectorToggle = _defaultConfig$userSe2 === void 0 ? selectorToggle.replace(/\[|\]/g, '') : _defaultConfig$userSe2,
        _defaultConfig$userSe3 = _defaultConfig$userSe.splitselectorValidate,
        splitselectorValidate = _defaultConfig$userSe3 === void 0 ? selectorValidate.replace(/\[|\]/g, '') : _defaultConfig$userSe3,
        _defaultConfig$userSe4 = _defaultConfig$userSe.splitselectorGroup,
        splitselectorGroup = _defaultConfig$userSe4 === void 0 ? selectorGroup.replace(/\[|\]/g, '') : _defaultConfig$userSe4,
        _defaultConfig$userSe5 = _defaultConfig$userSe.splitselectorAnimate,
        splitselectorAnimate = _defaultConfig$userSe5 === void 0 ? selectorAnimate.replace(/\[|\]/g, '') : _defaultConfig$userSe5,
        _defaultConfig$userSe6 = _defaultConfig$userSe.splitselectorHover,
        splitselectorHover = _defaultConfig$userSe6 === void 0 ? selectorHover.replace(/\[|\]/g, '') : _defaultConfig$userSe6,
        _defaultConfig$userSe7 = _defaultConfig$userSe.splitselectorRole,
        splitselectorRole = _defaultConfig$userSe7 === void 0 ? selectorRole.replace(/\[|\]/g, '') : _defaultConfig$userSe7,
        _defaultConfig$userSe8 = _defaultConfig$userSe.splitselectorBack,
        splitselectorBack = _defaultConfig$userSe8 === void 0 ? selectorBack.replace(/\[|\]/g, '') : _defaultConfig$userSe8;

    var allHoverElements = [],
        tHandler = null,
        eventType = null,
        isActive = null;
    var body = $('body'),
        isiOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

    var init = function init() {
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

    var destroy = function destroy() {
      isiOS && body.classList.remove('is--ios');
      document.removeEventListener('click', clickHandler, false);

      if (onHover && isActive) {
        allHoverElements.map(function (item) {
          mouseEvents.map(function (type) {
            item.removeEventListener(type, mouseHandler);
          });
          item.removeEventListener('keydown', keyHandler);
        });
      }
    };

    var events = function events() {
      document.addEventListener('click', clickHandler, false);
    };

    var matchMedia = function matchMedia(mq) {
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

    var detectMouse = function detectMouse(event) {
      // remove event bindings, so it only runs once
      if (eventType !== null && eventType === event.type && isActive && eventType === 'touchstart' || !isActive && eventType === event.type) return;
      eventType = isActive ? 'touchstart' : event.type;
      handleMouseEvent(eventType);
      [('mouseover')].map(function (events) {
        document.removeEventListener(events, tHandler, false);
      });
    };

    var checkEvent = function checkEvent() {
      ['touchstart', 'mouseover'].map(function (events) {
        document.addEventListener(events, tHandler, false);
      });
    };

    var clickHandler = function clickHandler(event) {
      start = performance.now();
      if (eventType === 'mouseover' && event.target.parentElement.hasAttribute(splitselectorHover)) return;

      if (!event.target.closest(selectorToggle) && !event.target.closest(selectorBack)) {
        closeActiveGlobal(event);
        return;
      }
      event.preventDefault();
      if (transitionExpand || transitionCollapse) return;
      toggleItems(event);
    };

    var handleMouseEvent = function handleMouseEvent(eventType) {
      if (eventType === 'touchstart') {
        allHoverElements.map(function (item) {
          mouseEvents.map(function (type) {
            item.removeEventListener(type, mouseHandler);
          });
          item.removeEventListener('keydown', keyHandler);
        });
      }

      if (eventType === 'mouseover') {
        allHoverElements.map(function (item) {
          mouseEvents.map(function (type) {
            item.addEventListener(type, mouseHandler);
          });
          item.addEventListener('keydown', keyHandler);
        });
      }
    };

    var mouseHandler = function mouseHandler(event) {
      if (!event.target.matches(selectorHover)) return;
      start = performance.now();
      event.stopPropagation();
      var eventTarget = getEventTarget(event.target, event.type, selectorToggle);
      toggleItems(eventTarget);
    };

    var keyHandler = function keyHandler(event) {
      if (event.keyCode !== ENTER_KEY_CODE) return;
      if (transitionExpand || transitionCollapse) return;
      event.preventDefault();
      toggleItems(event);
    };

    var toggleItems = function toggleItems(event) {
      var target = event.target ? event.target.closest(selectorToggle) || event.target.closest(selectorBack).parentNode.parentNode.querySelector(selectorToggle) : event.item;
      var active = event.active ? event.active : null;
      callbackToggle && callbackToggle(target);
      var selector = target.getAttribute(splitselectorToggle),
          group = target.getAttribute(splitselectorGroup),
          role = target.getAttribute(splitselectorRole),
          next = target.closest(selectorNext),
          allGrouped = group ? getGrouped(target, toggleActiveClass, splitselectorAnimate, group, role, splitselectorToggle, splitselectorGroup, active, next) : [],
          allToggles = getToggles(target, toggleActiveClass, selector, role, next, splitselectorToggle, active),
          allDrops = getDrops(target, toggleActiveClass, splitselectorAnimate, selector, role, next, splitselectorToggle, active),
          allElements = [].concat(_toConsumableArray(allGrouped), _toConsumableArray(allToggles), _toConsumableArray(allDrops));
      allElements.forEach(function (item) {
        var isActive = item.active;
        var isAnimateHeight = item.isAnimateHeight,
            isAnimate = item.isAnimate,
            tabActive = item.tabActive;
        if (tabActive) return;

        if (isActive) {
          var isValid = checkValidity(item);
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
      end = performance.now();
      console.log('toggleItem -> ' + (end - start) + ' ms.');
    };

    var open = function open(item) {
      callbackOpen && callbackOpen(item);
      item.role === 'tooltip' && setPosition(item);
      item.value.classList.add(toggleActiveClass);
      item.type === 'toggle' && item.value.setAttribute('aria-expanded', true);
      end = performance.now();
      console.log('open -> ' + (end - start) + ' ms.');
    };

    var close = function close(item) {
      callbackClose && callbackClose(item);
      item.value.classList.remove(toggleActiveClass);
      item.type === 'toggle' && item.value.setAttribute('aria-expanded', false);
      end = performance.now();
      console.log('close -> ' + (end - start) + ' ms.');
    };

    var checkValidity = function checkValidity(item) {
      var form = item.type === 'drop' && item.value.hasAttribute(splitselectorValidate) ? item.value.querySelectorAll('[required]') : false;
      if (!form) return false;

      if (form) {
        var arrOfInputs = [].slice.call(form),
            checkUnValid = arrOfInputs.filter(function (item) {
          return !item.checkValidity();
        }),
            valid = checkUnValid.length !== 0 ? valid : false;

        if (valid) {
          valid[0].focus();
          valid[0].classList.add(toggleErrorClass);
          setTimeout(function () {
            var ElementPosition = valid[0].getBoundingClientRect().top;
            window.scrollBy({
              top: ElementPosition,
              left: 0,
              behavior: 'smooth'
            });
          }, 250);
          return true;
        } else {
          form.forEach(function (item) {
            return item.classList.contains(toggleErrorClass) && item.classList.remove(toggleErrorClass);
          });
          return false;
        }
      }
    };

    var closeActiveGlobal = function closeActiveGlobal(event) {
      var groupGlobal = [].slice.call($$("".concat(selectorGlobal, ".").concat(toggleActiveClass)));
      if (groupGlobal.length === 0) return;
      if (event.target.closest(groupGlobal[0].getAttribute(splitselectorToggle)) !== null) return;
      var getToggleTarget = groupGlobal.map(function (item) {
        return $("".concat(item.getAttribute(splitselectorToggle), ".").concat(toggleActiveClass));
      });
      groupGlobal.forEach(function (item) {
        return item.classList.remove(toggleActiveClass);
      });
      getToggleTarget.forEach(function (item) {
        item.classList.remove(toggleActiveClass);
        item.classList.contains(toggleShowClass) && item.classList.remove(toggleShowClass);
      });
    };

    init();
  };

  return Toggle;

}));
