import { TaskInstance, TaskStatus, TaskObject } from "../task";

const STORAGE_KEY = "TASK_LIST";

export class TaskCollection {
  private readonly taskStorage; // localStorageを利用
  // private taskList: TaskInstance[] = [];
  private taskList;
  private updateStorage() {
    this.taskStorage.setItem(STORAGE_KEY, JSON.stringify(this.taskList));
  }
  private getStoredTaskList(): TaskInstance[] {
    try {
      const localStoredTaskList = this.taskStorage.getItem(STORAGE_KEY);

      if (!localStoredTaskList) return [];
      const storedTaskList = JSON.parse(localStoredTaskList);

      assrtIsTaskObjects(storedTaskList);

      // JSON.parseで取得した配列の各要素をTaskInstanceに変換している
      const taskList = storedTaskList.map((task) => new TaskInstance(task));
      return taskList;
    } catch (error) {
      this.taskStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }
  private changeOrder(
    task: TaskInstance,
    taskIndex: number,
    targetIndex: number
  ) {
    this.taskList.splice(taskIndex, 1);
    this.taskList.splice(targetIndex, 0, task);
    this.updateStorage(); // 並び替えた情報をlocalStorageに保存
  }

  constructor() {
    this.taskStorage = localStorage;
    this.taskList = this.getStoredTaskList();
  }

  addTask(task: TaskInstance) {
    this.taskList.push(task);
    this.updateStorage(); // localStorageに保存
  }

  delete(task: TaskInstance) {
    // 削除するタスクのIDと一致しないタスクのみを残す
    this.taskList = this.taskList.filter(
      ({ taskId }) => taskId !== task.taskId
    );
    this.updateStorage(); // localStorageに保存
  }

  findTask(id: string) {
    return this.taskList.find((task) => task.taskId === id);
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

  moveAboveTarget(task: TaskInstance, target: TaskInstance) {
    const taskIndex = this.taskList.indexOf(task);
    const targetIndex = this.taskList.indexOf(target);
    this.changeOrder(
      task,
      taskIndex,
      taskIndex < targetIndex ? targetIndex - 1 : targetIndex
    );
  }

  moveToLast(task: TaskInstance) {
    const taskIndex = this.taskList.indexOf(task);
    this.changeOrder(task, taskIndex, this.taskList.length);
  }
}

// Assert Function
function assrtIsTaskObjects(value: any): asserts value is TaskObject[] {
  if (
    !Array.isArray(value) ||
    !value.every((task) => TaskInstance.validateTaskList(task))
  ) {
    throw new Error(`引数${value}に問題があるよ`);
  }
}
