// HTMLの描画を行うクラス
import { TaskInstance } from "../task";
import dragula from "dragula";

export class TaskRender {
  constructor(
    private readonly todoTaskList: HTMLElement,
    private readonly doingTaskList: HTMLElement,
    private readonly doneTaskList: HTMLElement
  ) {}

  append(task: TaskInstance) {
    const { taskElement, deleteButtonElement } = this.render(task);

    this.todoTaskList.append(taskElement);

    return { deleteButtonElement };
  }

  remove(task: TaskInstance) {
    const taskElement = document.getElementById(task.taskId);

    if (!taskElement) return;

    this.todoTaskList.removeChild(taskElement);
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

    return { taskElement, deleteButtonElement };
  }

  // ドラッグアンドドロップの設定
  subscribeDragAndDrop() {
    dragula([this.todoTaskList, this.doingTaskList, this.doneTaskList]).on(
      "drop",
      (elment, target, source, sibling) => {
        console.log(elment, target, source, sibling);
      }
    );
  }
}
