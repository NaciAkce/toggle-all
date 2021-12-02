export type StateMachineMap<S extends string, Event extends string> = {
  [state in S]: {
    on: Partial<{
      [event in Event]: S;
    }>;
    onEnter?: () => void;
    onExit?: () => void;
  };
};

export interface StateMachineConfig<S extends string, Event extends string> {
  initial: S;
  states: StateMachineMap<S, Event>;
}

export interface StateMachine<S extends string, Event extends string> {
  state: S;
  previousState: S;
  nextEvents: Event[];
  transition(state: S, event: Event): void;
  canTransition(state: S, event: Event): boolean;
}
