import { v4 as uuid } from "uuid";

export const TaskStatusMap = {
  Todo: "TODO",
  InProgress: "INPROGRESS",
  Done: "DONE",
} as const satisfies Record<string, "TODO" | "INPROGRESS" | "DONE">;

export type TaskStatus = keyof typeof TaskStatusMap;

export class TaskInstance {
  readonly taskId;
  title;
  status;

  constructor(properties: { title: string }) {
    this.taskId = uuid();
    this.title = properties.title;
    this.status = TaskStatusMap.Todo;
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
