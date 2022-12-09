// 描画を行うクラス
import { TaskInstance } from "../task";

export class TaskRender {
  constructor(private readonly todoTaskList: HTMLElement) {}

  append(task: TaskInstance) {
    const taskElement = this.render(task);

    this.todoTaskList.append(taskElement);
  }

  // HTML要素を作成
  private render(task: TaskInstance) {
    const taskElement = document.createElement("div");
    const spanTagElement = document.createElement("span");
    const deleteButtonElement = document.createElement("button");

    taskElement.id = task.taskId;
    taskElement.classList.add("task-item");

    spanTagElement.textContent = task.title;
    deleteButtonElement.textContent = "削除";

    taskElement.append(spanTagElement, deleteButtonElement);

    return taskElement;
  }
}
