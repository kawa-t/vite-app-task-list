import "./style.css";
import typescriptLogo from "./typescript.svg";
// import { setupCounter } from "./counter";
import { Application } from "./controller";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
  </div>
  <div class="container">
    <h1 class="title">list education</h1>

    <form id="createForm" class="new">
      <div class="new-head">
        <h2 class="new-title">タスクを新規作成</h2>
        <button class="new-button">作成</button>
      </div>

      <label class="new-label" for="title">タイトル</label>
      <input id="title" class="new-input" name="title" />
    </form>

    <div class="lane">
      <div class="lane-item">
        <div class="lane-item-inner">
          <div class="lane-status">
            <p class="lane-status-name">TODO</p>
          </div>

          <div id="todoTaskList" class="tasks"></div>
        </div>
      </div>

      <div class="lane-item">
        <div class="lane-item-inner">
          <div class="lane-status">
            <p class="lane-status-name">DOING</p>
          </div>

          <div id="doingTaskList" class="tasks"></div>
        </div>
      </div>

      <div class="lane-item">
        <div class="lane-item-inner">
          <div class="lane-status">
            <p class="lane-status-name">DONE</p>
            <button id="deleteAllDoneTask" class="lane-status-delete">DONE のタスクを一括削除</button>
          </div>

          <div id="doneTaskList" class="tasks"></div>
        </div>
      </div>
    </div>
  </div>
`;

new Application();
// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
