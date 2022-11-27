export type Listeners = {
  [id: string]: {
    event: string;
    element: HTMLElement;
    handler: (event: Event) => void;
  };
};
