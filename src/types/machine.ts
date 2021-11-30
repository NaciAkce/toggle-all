export type StateMachine<S extends string, Event extends string> = {
  initial: S;
  states: {
    [N in S]: Partial<{
      [U in Event]: S;
    }>;
  };
};
