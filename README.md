# vite-app-task-list

- vite 4.0.1
- TypeScript 4.9.4

## local Storage

localStorage はオブジェクト形式でデータを保管する

`setItem`メソッドは文字列しか渡せないので、文字列以外のものを渡すときは` JSON.stringify`で文字列に変換してから渡す

localStorage から取得したものは文字列なので、変換している

```typescript
const storedTaskList: any[] = JSON.parse(storedTaskList);
// JSON.parseで取得した配列の各要素をTaskInstanceに変換している
const taskList = storedTaskList.map((task) => new TaskInstance(task));
```
