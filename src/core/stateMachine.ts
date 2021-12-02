import {
  StateMachineMap,
  StateMachine,
  StateMachineConfig,
} from '../types/machine';

export const stateMachine = <S extends string, E extends string>(
  config: StateMachineConfig<S, E>
): StateMachine<S, E> => {
  const initial = config.initial;
  const state = initial;
  const previousState = initial;
  const machine = {
    state,
    previousState,
    nextEvents: Object.keys(config.states[config.initial].on) as E[],
    canTransition: function (state: S, event: E) {
      return config.states[state].on[event] !== undefined;
    },
    transition: function (currentState: S, event: E) {
      const nextState = config.states[currentState].on[event] || state;
      if (!nextState) {
        return;
      }

      machine.previousState = state;
      machine.state = nextState;
      machine.nextEvents = Object.keys(config.states[nextState].on) as E[];
      return machine;
    },
  };

  return machine;
};

export enum ToggleState {
  On = 'on',
  Off = 'off',
  Transition = 'transition',
}

export enum ToggleEvent {
  Click = 'click',
  Cancel = 'cancel',
  TransitionOn = 'transitionOn',
  TransitionOff = 'transitionOff',
}

export const toggleMachine = stateMachine<ToggleState, ToggleEvent>({
  initial: ToggleState.Off,
  states: {
    [ToggleState.Off]: {
      on: {
        [ToggleEvent.Click]: ToggleState.On,
        [ToggleEvent.TransitionOn]: ToggleState.Transition,
      },
    },
    [ToggleState.Transition]: {
      on: {
        [ToggleEvent.TransitionOff]: ToggleState.Off,
        [ToggleEvent.TransitionOn]: ToggleState.On,
      },
    },
    [ToggleState.On]: {
      on: {
        [ToggleEvent.Click]: ToggleState.Off,
        [ToggleEvent.TransitionOff]: ToggleState.Transition,
      },
    },
  },
});
