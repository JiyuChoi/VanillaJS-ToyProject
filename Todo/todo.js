const toDoForm = document.getElementById('jsToDoForm');
const toDoInput = toDoForm.querySelector('input');
const submitBtn = toDoForm.querySelector('button');
const toDoList = document.getElementById('jsToDoList');

const TODOS_KEY = 'todos';

let toDos = [];

function deleteToDoTask(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== li.id);
    saveToDoTask(toDos);
}

function paintToDoTask(task) {
    const li = document.createElement('li');
    li.id = task.id;
    const span = document.createElement('span');
    const delBtn = document.createElement('button');
    span.innerText = task.text;
    delBtn.innerText = '❌';
    toDoList.addEventListener('click', deleteToDoTask);
    li.append(span, delBtn);
    toDoList.append(li);
}

function saveToDoTask(toDos) {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text,
    };
}

function loadedToDo() {
    const loadToDo = localStorage.getItem(TODOS_KEY);
    if (loadToDo !== null) {
        const parsedToDos = JSON.parse(loadToDo);
        toDos = parsedToDos;
        parsedToDos.forEach((element) => paintToDoTask(element));
    }
}

function handleSubmit(event) {
    event.preventDefault();
    const taskObj = getTaskObject(toDoInput.value);
    toDoInput.value = '';
    toDos.push(taskObj);
    saveToDoTask(toDos);
    paintToDoTask(taskObj);
}

function init() {
    submitBtn.addEventListener('click', handleSubmit);
    toDoForm.addEventListener('submit', handleSubmit);
    loadedToDo();
}

init();
