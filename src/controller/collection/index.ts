import { TaskInstance } from "../task";

export class TaskCollection {
  private taskList: TaskInstance[] = [];

  addTask(task: TaskInstance) {
    this.taskList.push(task);
  }

  delete(task: TaskInstance) {
    // 削除するタスクのIDと一致しないタスクのみを残す
    this.taskList = this.taskList.filter(
      ({ taskId }) => taskId !== task.taskId
    );
  }
}
