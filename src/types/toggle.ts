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
  callbackOpen: (target: EventTargets) => void | null;
  callbackClose: (target: EventTargets) => void | null;
  callbackToggle: (target: EventTargets) => void | null;
}

export type valueOf<T> = T[keyof T];

export enum PointerEvents {
  ENTER = 'pointerenter',
  LEAVE = 'pointerleave',
}

export interface EventTargets {
  target: HTMLElement;
  eventType: Event['type'];
  selector: string;
  group: string;
  role: Role;
  active: boolean;
}

export enum Types {
  TOGGLE = 'toggle',
  DROP = 'drop',
}

export enum Role {
  ACCORDION = 'accordion',
  TAB = 'tab',
  OVERLAY = 'overlay',
  DEFAULT = 'default',
}

export interface CreateElementObject
  extends Omit<EventTargets, 'group' | 'selector'> {
  type: Types;
  isAnimate: boolean;
}
