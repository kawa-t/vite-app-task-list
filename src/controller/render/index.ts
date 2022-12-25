// HTMLの描画を行うクラス
import { TaskInstance, TaskStatus, TaskStatusMap } from "../task";
import { TaskCollection } from "../collection";
import dragula from "dragula";

export class TaskRender {
  constructor(
    private readonly todoTaskList: HTMLElement,
    private readonly doingTaskList: HTMLElement,
    private readonly doneTaskList: HTMLElement
  ) {}

  renderAll(taskCollection: TaskCollection) {
    const todoTaskList = this.renderList(
      taskCollection.filterTask(TaskStatusMap.Todo),
      this.todoTaskList
    );
    const doingTaskList = this.renderList(
      taskCollection.filterTask(TaskStatusMap.InProgress),
      this.doingTaskList
    );
    const doneTaskList = this.renderList(
      taskCollection.filterTask(TaskStatusMap.Done),
      this.doneTaskList
    );

    return [...todoTaskList, ...doingTaskList, ...doneTaskList];
  }

  append(task: TaskInstance) {
    const { taskElement, deleteButtonElement } = this.render(task);

    this.todoTaskList.append(taskElement);

    return { deleteButtonElement };
  }

  remove(task: TaskInstance) {
    const taskElement = document.getElementById(task.taskId);

    if (!taskElement) return;

    if (task.status === TaskStatusMap.Todo) {
      this.todoTaskList.removeChild(taskElement);
    }
    if (task.status === TaskStatusMap.InProgress) {
      this.doingTaskList.removeChild(taskElement);
    }
    if (task.status === TaskStatusMap.Done) {
      this.doneTaskList.removeChild(taskElement);
    }
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

  private renderList(tasks: TaskInstance[], listElement: HTMLElement) {
    if (tasks.length === 0) return [];

    const taskList: Array<{
      task: TaskInstance;
      deleteButtonElement: HTMLElement;
    }> = [];

    tasks.forEach((task) => {
      const { taskElement, deleteButtonElement } = this.render(task);
      listElement.append(taskElement);
      taskList.push({ task, deleteButtonElement });
    });

    return taskList;
  }

  // ドラッグアンドドロップの設定
  // subscribeDragAndDrop() {
  //   dragula([this.todoTaskList, this.doingTaskList, this.doneTaskList]).on(
  //     "drop",
  //     (elment, target, source, sibling) => {
  //       console.log(elment, target, source, sibling);
  //     }
  //   );
  // }

  subscribeDragAndDrop(
    onDrop: (
      elment: Element,
      sibling: Element | null,
      newStatus: TaskStatus
    ) => void
  ) {
    dragula([this.todoTaskList, this.doingTaskList, this.doneTaskList]).on(
      "drop",
      (elment, target, sibling) => {
        let newStatus: TaskStatus = TaskStatusMap.Todo;

        if (target.id === "doingTaskList") newStatus = TaskStatusMap.InProgress;
        if (target.id === "doneTaskList") newStatus = TaskStatusMap.Done;

        onDrop(elment, sibling, newStatus);
      }
    );
  }

  getTaskId(element: Element) {
    return element.id;
  }
}
