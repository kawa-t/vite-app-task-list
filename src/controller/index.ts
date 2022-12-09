import { EventListenTask } from "./event/EventListenTask";
import { TaskInstance } from "./task";
import { TaskCollection } from "./collection";
import { TaskRender } from "./render";

export class Application {
  private readonly eventListenTask = new EventListenTask();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRender = new TaskRender(
    document.getElementById("todoTaskList") as HTMLElement
  );

  start() {
    console.log("Application started");
    // const eventListenTask = new EventListenTask()
    // const deleteButton = document.getElementById("deleteAllDoneTask");

    // if (!deleteButton) return;

    // eventListenTask.addTask("sample", "click", deleteButton, () =>
    // alert("clicked")
    // );
    // eventListenTask.removeTask("sample");
    const createForm = document.getElementById("createForm") as HTMLElement;

    this.eventListenTask.addTask(
      "submit-handler",
      "submit",
      createForm,
      this.handleSubmit
    );
  }
  private handleSubmit = (event: Event) => {
    event.preventDefault();

    const titleInput = document.getElementById("title") as HTMLInputElement;

    if (!titleInput.value) return;

    const taskComponent = new TaskInstance({ title: titleInput.value });

    this.taskCollection.addTask(taskComponent);

    this.taskRender.append(taskComponent);

    console.log(this.taskCollection);

    titleInput.value = "";
  };
}

// ロード完了したらアプリケーションを起動する
window.addEventListener("load", () => {
  const app = new Application();
  app.start();
});
