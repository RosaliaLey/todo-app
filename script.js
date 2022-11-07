const toggleBtn = {
  toggleSelector: document.querySelector(".theme"),
  toggleSpan: document.querySelector(".theme span"),
};

const prefersColorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const userLocalStorage = window.localStorage.getItem("theme");
const userPrefersDark = window.matchMedia && prefersColorScheme.matches;

const toggleTheme = (state, handlerEvent) => {
  if (state) {
    document.body.className = "dark";
    toggleBtn.toggleSpan.textContent = "light";
  } else {
    document.body.className = "light";
    toggleBtn.toggleSpan.textContent = "dark";
  }
};

if (userLocalStorage) {
  toggleTheme(userLocalStorage === "dark");
} else {
  toggleTheme(userPrefersDark);
}

if (!userLocalStorage) {
  prefersColorScheme.addEventListener("change", (e) => {
    toggleTheme(e.matches);
  });
}

toggleBtn.toggleSelector.addEventListener("click", () => {
  toggleTheme(document.body.className === "light", true);
});

const todoForm = document.getElementById("todo-form");
const input = document.getElementById("input-field");
const todosUl = document.getElementById("todos-ul");
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addTodo();
});

function addTodo(todo) {
  let todoText = input.value;

  if (todo) {
    todoText = todo.text;
  }

  if (todoText) {
    const todoEl = document.createElement("li");
    if (todo && todo.completed) {
      todoEl.classList.add("completed");
    }

    todoEl.innerText = todoText;

    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");

      updateLS();
    });

    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      todoEl.remove();

      updateLS();
    });

    todosUl.appendChild(todoEl);
    input.value = "";

    updateLS();
  }
}

function updateLS() {
  todosEl = document.querySelectorAll("li");

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}
