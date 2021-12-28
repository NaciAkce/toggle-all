import {
  CreateToggleProps,
  EventTypes,
  KEY_CODE,
  Role,
  ToggleElement,
  ToggleState,
} from '~/types/toggle';
import { createTarget } from './createTogglesElements';

export function toggleEventDecision(props: CreateToggleProps) {
  // here we decide if something happen either grab the elements or do other actions an return null
  switch (props.event.type) {
    case EventTypes.CLICK:
      return new ClickEventDecision(props);
    case EventTypes.KEYDOWN:
      switch ((props.event as KeyboardEvent).code) {
        case KEY_CODE.ESCAPE:
          return new KeyEventDecision(props);
          break;

        default:
          return null;
      }

    case EventTypes.ENTER:
    case EventTypes.LEAVE:
      return new HoverEventDecision(props);
    default:
      break;
  }
}

interface ToggleEvent {
  toggleElements(): HTMLElement | null;
}

class BaseEventDecision {
  event: CreateToggleProps['event'];
  config: CreateToggleProps['config'];
  toggleElement: ToggleElement;
  toggleElements: ToggleElement[];
  target: HTMLElement | null;
  state: ToggleState;

  constructor(props: CreateToggleProps) {
    this.event = props.event;
    this.config = props.config;
    this.state = props.state;
  }

  setTarget() {
    this.target = this.event.target.closest(this.config.selectorToggle);
    return this;
  }

  makeDecision() {
    this.setTarget();
    return (
      (this.target &&
        !this.target.classList.contains(this.config.toggleActiveClass) &&
        this.target.getAttribute(this.config.dataRole) !== Role.TAB) ||
      this.state.globals.length > 0
    );
  }

  getToggleElement() {
    this.toggleElement = createTarget({ target: this.target }, this.config);
    return this;
  }
}

class ClickEventDecision extends BaseEventDecision {}

class HoverEventDecision extends BaseEventDecision {}

class KeyEventDecision extends BaseEventDecision {}
