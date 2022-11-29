import { EventListenTask } from "./event/EventListenTask";

export class Application {
  start() {
    console.log("Application started");
    const eventListenTask = new EventListenTask();
    const deleteButton = document.getElementById("deleteAllDoneTask");

    if (!deleteButton) return;

    eventListenTask.addTask("sample", "click", deleteButton, () =>
      alert("clicked")
    );
    eventListenTask.removeTask("sample");
  }
}

// ロード完了したらアプリケーションを起動する
window.addEventListener("load", () => {
  const app = new Application();
  app.start();
});
