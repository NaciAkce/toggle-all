export interface Config {
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
  dataToggle: string;
  dataGlobal: string;
  dataGroup: string;
  dataValidate: string;
  dataRole: string;
  dataAnimate: string;
  dataHover: string;
  callbackOpen: (target: EventTarget) => void | null;
  callbackClose: (target: EventTarget) => void | null;
  callbackToggle: (target: EventTarget) => void | null;
}

export type valueOf<T> = T[keyof T];

export interface CreateToggle {
  eventDecision: boolean; // decide what happens in different event type scenarios
  targetElement: ToggleElement;
  toggleElements(): ToggleElement[];
}

export interface CreateToggleProps {
  event: EventType;
  config: Config;
  state: ToggleState;
}

export type EventType = (Event | KeyboardEvent | MouseEvent) & {
  target: HTMLElement;
};

export type HTMLElementEvent<E> = E & {
  target: HTMLElement;
};

export interface EventTarget {
  target: HTMLElement;
  eventType: Event['type'];
  selector: string;
  group: string;
  role: Role;
  active: boolean;
}

export type Target = HTMLElement;

export enum Types {
  TOGGLE = 'toggle',
  DROP = 'drop',
}

export enum EventTypes {
  ENTER = 'pointerenter',
  LEAVE = 'pointerleave',
  CLICK = 'click',
  KEYDOWN = 'keydown',
}

export enum Role {
  ACCORDION = 'accordion',
  TAB = 'tab',
  OVERLAY = 'overlay',
  DEFAULT = 'default',
  TOGGLE = 'toggle',
}

export interface ToggleElement {
  target: HTMLElement;
  selector: string;
  group: string;
  role: Role;
  active: boolean;
  type: Types;
  animate: string | null;
  valid: boolean;
}

export enum KEY_CODE {
  ENTER = 'Enter',
  ARROW_UP = 'ArrowDown',
  ARROW_DOWN = 'ArrowUp',
  TAB = 'Tab',
  SHIFT = 16,
  ESCAPE = 'Escape',
}

export namespace KeyCode {
  export function hasValue(code: KEY_CODE) {
    return Object.values(KEY_CODE).includes(code);
  }
}

export interface ToggleState {
  touch: boolean;
  activeElement: HTMLElement;
  previousActiveElement: HTMLElement;
  grouped: Record<string, HTMLElement[]>;
  globals: HTMLElement[];
  activeToggles: HTMLElement[];
}
