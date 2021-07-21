let todoItems = [];
const form = document.querySelector(".js-form");
const list = document.querySelector(".js-todo-list");
const darkModeButton = document.querySelector(".dark-mode-trigger");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector(".js-todo-input");
  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
  }
});

list.addEventListener("click", (event) => {
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }
  if (event.target.classList.contains("js-delete-todo")) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const ref = localStorage.getItem("todoItems");
  const isSetDarkMode = localStorage.getItem("darkMode");
  if (ref) {
    todoItems = JSON.parse(ref);
    todoItems.forEach((todo) => {
      renderTodo(todo);
    });
  }

  if (isSetDarkMode === "1") {
    document.body.classList.add("dark");
    swapColorTheme(true);
  }
});

darkModeButton.addEventListener("click", () => {
  swapColorTheme();
});

function swapColorTheme(keep) {
  if (document.body.classList.contains("dark") && !keep) {
    localStorage.setItem("darkMode", "0");
    document.body.classList.remove("dark");
    darkModeButton.innerText = "🌛";
    document.documentElement.style.setProperty("--background-color", "#f2f2f2");
    document.documentElement.style.setProperty("--text-color", "#333333");
    document.documentElement.style.setProperty("--title-color", "#2196f3");
  } else {
    localStorage.setItem("darkMode", "1");
    document.body.classList.add("dark");
    darkModeButton.innerText = "🌞";
    document.documentElement.style.setProperty("--background-color", "#333333");
    document.documentElement.style.setProperty("--text-color", "#f2f2f2");
    document.documentElement.style.setProperty("--title-color", "#90caf9");
  }
}

function renderTodo(todo) {
  localStorage.setItem("todoItems", JSON.stringify(todoItems));
  const list = document.querySelector(".js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`);

  if (todo.deleted) {
    item.remove();
    if (todoItems.length === 0) {
      list.innerHTML = "";
    }
    return;
  }

  const isChecked = todo.checked ? "done" : "";
  const node = document.createElement("li");
  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);
  node.innerHTML = `
  <input id="${todo.id}" type="checkbox" />
  <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
  <button class="delete-todo js-delete-todo">
  <svg><use href="#delete-icon"></use></svg>
  </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
}

function toggleDone(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

function deleteTodo(key) {
  const index = todoItems.findIndex((item) => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index],
  };
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}

function addTodo(text) {
  const todo = {
    text: text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
}
