import { v4 as uuid, validate } from "uuid";

export const TaskStatusMap = {
  Todo: "Todo",
  InProgress: "InProgress",
  Done: "Done",
} as const satisfies Record<string, "Todo" | "InProgress" | "Done">;

export type TaskStatus = keyof typeof TaskStatusMap;

export type TaskObject = {
  taskId: string;
  title: string;
  status: TaskStatus;
};

export class TaskInstance {
  readonly taskId;
  title;
  status;

  // Assertion functions
  static validateTaskList(task: any) {
    if (!task) return false; // タスクがあること
    if (!validate(task.taskId)) return false; // uuidの形式であること
    if (typeof task.title !== "string" && !task.title) return false; // titleが文字列であること、存在すること
    if (!Object.values(TaskStatusMap).includes(task.status)) return false; // statusがTaskStatusMapの値のいずれかであること

    return true;
  }

  constructor(properties: {
    taskId?: string;
    title: string;
    status?: TaskStatus;
  }) {
    this.taskId = properties.taskId || uuid();
    this.title = properties.title;
    this.status = properties.status || TaskStatusMap.Todo;
  }

  updateStatus(properties: { title?: string; status?: TaskStatus }) {
    this.title = properties.title || this.title;
    this.status = properties.status || this.status;
  }
}

// TypeScript4.9 satisfies
// export const colors = {
//   primary: "#FFFFFF",
//   secondary: "#000000",
//   tertiary: "#999999",
//   // valueには「#付きの文字列」しか認めない(as const　の位置はsatisfiesの前じゃなきゃだめ。)
// } as const satisfies Record<string, `#${string}`>;

// type Color = keyof typeof colors;
