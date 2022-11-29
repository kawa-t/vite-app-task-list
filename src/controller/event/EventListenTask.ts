import { Listeners } from "../../types/listenerTypes";

export class EventListenTask {
  private readonly listeners: Listeners = {};

  // 追加
  addTask(
    id: string,
    event: string,
    element: HTMLElement,
    handler: (event: Event) => void
  ) {
    this.listeners[id] = { event, element, handler };
    element.addEventListener(event, handler);
  }

  // 削除
  removeTask(id: string) {
    const listener = this.listeners[id];
    if (!listener) return;

    listener.element.removeEventListener(listener.event, listener.handler);
    delete this.listeners[id];
  }
}
