import { CreateElementObject } from '../types/toggle';

export const throttle = (
  func: (event: any) => void,
  interval: number
): (() => void) => {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = false;
    };
    if (!timeout) {
      func.apply(this, args);
      timeout = true;
      setTimeout(later, interval);
    }
  };
};

export const useMedia = (
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listener: (...args: any) => void
): boolean | undefined => {
  // eslint-disable-next-line no-console
  if (!listener || typeof listener !== 'function') {
    // eslint-disable-next-line no-console
    console.error('Must be a function');
    return;
  }

  const matches = window.matchMedia(query).matches,
    media = window.matchMedia(query);

  media.addEventListener('change', listener);
  listener(media);
  return matches;
};

export const debounce = (func: () => void, interval: number): (() => void) => {
  let timeout;
  return function (...args) {
    const later = () => {
      timeout = null;
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, interval || 200);
  };
};

/**
 *
 * @param {Node} el
 */
export const isHidden = function isVisible(el: Element): boolean {
  const style = window.getComputedStyle(el);
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    (el.parentElement ? isVisible(el.parentElement) : true)
  );
};

/**
 *
 * @param {Object} item
 */
export const setPosition = item => {
  if (item.type === 'toggle') return;
  item.target.setAttribute(
    'style',
    'position: absolute; visibility: hidden; display: block; pointer-events: none'
  );
  item.target.classList.remove(
    'is--position-bottom',
    'is--position-top',
    'is--position-left',
    'is--position-right'
  );

  const position = isOutOfViewport(item.target);

  item.target.removeAttribute('style');

  if (position.top) {
    item.target.classList.add('is--position-bottom');
    item.target.classList.remove('is--position-top');
  }

  if (position.bottom) {
    item.target.classList.add('is--position-top');
    item.target.classList.remove('is--position-bottom');
  }

  if (position.left) {
    item.target.classList.add('is--position-left');
    item.target.classList.remove('is--position-right');
  }

  if (position.right) {
    item.target.classList.add('is--position-right');
    item.target.classList.remove('is--position-left');
  }
};

/**
 * @param  {HTMLElement} elem .....The element to check
 * @return {Object}     A set of booleans for each side of the element
 */
export const isOutOfViewport = function (
  elem: HTMLElement
): Record<string, boolean> {
  const bounding = elem.getBoundingClientRect();

  const out: Record<string, boolean> = {};

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
 *
 * @param {Node} item
 */
export const animationExist = item => {
  const prop = window.getComputedStyle(item.target, null);
  const duration = prop.getPropertyValue('transition-duration');
  const property = prop.getPropertyValue('transition-property');

  return {
    exist: item.type === 'drop' && duration !== '0s',
    animation: property,
  };
};

export const focusableAll =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls], summary';

/**
 *
 * @param {Node} item
 * @param {String} splitselectorValidate
 * @param {String} toggleErrorClass
 */
export const validateForm = (
  item: CreateElementObject[],
  toggleErrorClass: string
): boolean => {
  const form = item[0].target.querySelectorAll('[required]') ?? false;

  if (!form) return false;

  if (form) {
    const arrOfInputs = [].slice.call(form),
      checkUnValid = arrOfInputs.filter(item => !item.checkValidity()),
      valid = checkUnValid.length !== 0 ? true : false;

    if (valid) {
      valid[0].focus();
      valid[0].classList.add(toggleErrorClass);
      setTimeout(() => {
        const ElementPosition = valid[0].getBoundingClientRect().top;
        window.scrollBy({
          top: ElementPosition,
          left: 0,
          behavior: 'smooth',
        });
      }, 250);
      return true;
    } else {
      form.forEach(
        item =>
          item.classList.contains(toggleErrorClass) &&
          item.classList.remove(toggleErrorClass)
      );
      return false;
    }
  }
};

/**
 * @param  {EventTarget} elem     The element
 * @param  {String} selector The selector to match against
 */
export const getNextSibling = function (elem, selector) {
  let sibling = elem.nextElementSibling;

  if (!selector) return sibling;

  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
};

export const setDataset = (selector: string): string =>
  selector.replace(/\[|\]/g, '');
