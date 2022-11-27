import { Listeners } from "../../types/listenerTypes";

export class EventListenTask {
  private readonly listeners: Listeners = {};

  addTask(
    id: string,
    event: string,
    element: HTMLElement,
    handler: (event: Event) => void
  ) {
    this.listeners[id] = { event, element, handler };
    element.addEventListener(event, handler);
  }
}
