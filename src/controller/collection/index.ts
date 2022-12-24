import { TaskInstance, TaskStatus } from "../task";

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

  findTask(id: string) {
    return this.taskList.find(({ taskId }) => taskId === id);
  }

  updateTask(task: TaskInstance) {
    this.taskList = this.taskList.map((item) => {
      if (item.taskId === task.taskId) return task;
      return item;
    });
  }

  filterTask(filterStatus: TaskStatus) {
    return this.taskList.filter(({ status }) => status === filterStatus);
  }
}
