const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
let todos = JSON.parse(localStorage.getItem('todos')) || [];

document.addEventListener('DOMContentLoaded', () => {
    if (todos.length > 0) {
        todos.forEach(addTodo);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
});

function addTodo(todo) {
    let todoText = input.value.trim();

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = createTodoElement(todoText, todo && todo.completed);

        todoEl.addEventListener('click', () => {
            toggleTodoCompletion(todoEl);
            updateLocalStorage();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            removeTodoElement(todoEl);
            updateLocalStorage();
        });

        todosUL.appendChild(todoEl);

        input.value = '';
        updateLocalStorage();
    }
}

function createTodoElement(todoText, completed) {
    const todoEl = document.createElement('li');
    todoEl.innerText = todoText;

    if (completed) {
        todoEl.classList.add('completed');
    }

    return todoEl;
}

function toggleTodoCompletion(todoEl) {
    todoEl.classList.toggle('completed');
}

function removeTodoElement(todoEl) {
    todoEl.remove();
}

function updateLocalStorage() {
    const todosEl = document.querySelectorAll('li');
    todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed'),
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}
