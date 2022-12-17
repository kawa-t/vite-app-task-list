import { EventListenTask } from "./event/EventListenTask";
import { TaskInstance, TaskStatus } from "./task";
import { TaskCollection } from "./collection";
import { TaskRender } from "./render";

export class Application {
  private readonly eventListenTask = new EventListenTask();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRender = new TaskRender(
    document.getElementById("todoTaskList") as HTMLElement,
    document.getElementById("doingTaskList") as HTMLElement,
    document.getElementById("doneTaskList") as HTMLElement
  );

  start() {
    console.log("Application started");

    const createForm = document.getElementById("createForm") as HTMLElement;

    this.eventListenTask.addTask(
      "submit-handler",
      "submit",
      createForm,
      this.handleSubmit
    );

    this.taskRender.subscribeDragAndDrop(this.handleDropAndDrop);
  }
  private handleSubmit = (event: Event) => {
    event.preventDefault();

    const titleInput = document.getElementById("title") as HTMLInputElement;

    if (!titleInput.value) return;

    const taskComponent = new TaskInstance({ title: titleInput.value });

    this.taskCollection.addTask(taskComponent);

    const { deleteButtonElement } = this.taskRender.append(taskComponent);

    this.eventListenTask.addTask(
      taskComponent.taskId,
      "click",
      deleteButtonElement,
      () => {
        this.handleClickDeleteTask(taskComponent);
      }
    );

    titleInput.value = "";
  };

  private handleClickDeleteTask = (taskId: TaskInstance) => {
    if (!window.confirm(`${taskId.title}を削除してもいいですか`)) return;

    this.eventListenTask.removeTask(taskId.taskId);

    this.taskCollection.delete(taskId);
    this.taskRender.remove(taskId);
  };

  private handleDropAndDrop = (
    element: Element,
    sibling: Element | null,
    newStatus: TaskStatus
  ) => {
    const taskId = this.taskRender.getTaskId(element);

    if (!taskId) return;

    console.log(taskId, sibling, newStatus);

    const task = this.taskCollection.findTask(taskId);

    if (!task) return;

    task.updateStatus({ status: newStatus });

    this.taskCollection.updateTask(task);

    console.log(sibling);
  };
}

// ロード完了したらアプリケーションを起動する
window.addEventListener("load", () => {
  const app = new Application();
  app.start();
});
