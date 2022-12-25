import { EventListenTask } from "./event/EventListenTask";
import { TaskInstance, TaskStatus, TaskStatusMap } from "./task";
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

    const taskList = this.taskRender.renderAll(this.taskCollection);
    const createForm = document.getElementById("createForm") as HTMLElement;
    const deleteAllDoneTaskButton = document.getElementById(
      "deleteAllDoneTask"
    ) as HTMLElement;

    taskList.forEach(({ task, deleteButtonElement }) => {
      this.eventListenTask.addTask(
        task.taskId,
        "click",
        deleteButtonElement,
        () => this.handleClickDeleteTask(task)
      );
    });

    this.eventListenTask.addTask(
      "submit-handler",
      "submit",
      createForm,
      this.handleSubmit
    );

    this.eventListenTask.addTask(
      "click-handler",
      "click",
      deleteAllDoneTaskButton,
      this.handleClickDeleteAllDoneTasks
    );

    this.taskRender.subscribeDragAndDrop(this.handleDropAndDrop);
  }

  private executeDeleteTask = (taskId: TaskInstance) => {
    this.eventListenTask.removeTask(taskId.taskId);
    this.taskCollection.delete(taskId);
    this.taskRender.remove(taskId);
  };

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
    this.executeDeleteTask(taskId);
  };

  private handleDropAndDrop = (
    element: Element,
    sibling: Element | null,
    newStatus: TaskStatus
  ) => {
    const taskId = this.taskRender.getTaskId(element);

    if (!taskId) return;

    const task = this.taskCollection.findTask(taskId);

    if (!task) return;

    task.updateStatus({ status: newStatus });

    this.taskCollection.updateTask(task);

    if (sibling) {
      const nextTaskId = this.taskRender.getTaskId(element);

      if (!nextTaskId) return;

      const nextTaskList = this.taskCollection.findTask(nextTaskId);
      if (!nextTaskList) return;

      this.taskCollection.moveAboveTarget(task, nextTaskList);
    } else {
      this.taskCollection.moveToLast(task);
    }
  };

  private handleClickDeleteAllDoneTasks = () => {
    if (!window.confirm("完了したタスクを全て削除しますか？")) return;

    const doneTasks = this.taskCollection.filterTask(TaskStatusMap.Done);

    doneTasks.forEach((task) => this.executeDeleteTask(task));
  };
}

// ロード完了したらアプリケーションを起動する
window.addEventListener("load", () => {
  const app = new Application();
  app.start();
});
