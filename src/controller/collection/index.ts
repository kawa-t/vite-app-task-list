import { TaskInstance } from "../task";

export class TaskCollection {
  private taskList: TaskInstance[] = [];

  addTask(task: TaskInstance) {
    this.taskList.push(task);
  }
}
