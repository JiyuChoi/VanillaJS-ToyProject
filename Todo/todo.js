const toDoForm = document.getElementById("jsToDoForm");
const toDoInput = toDoForm.querySelector("input");
const submitBtn = toDoForm.querySelector("button");
const toDoList = document.getElementById("jsToDoList");

const TODO = "TODO";

let ToDoTask;

function deleteToDoTask(event) {
    const li = event.target.parentNode;
    li.parentNode.removeChild(li);
}

function paintToDoTask(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    span.innerText = task.text;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDoTask);
    li.append(span, delBtn);
    li.id = task.id;
    toDoList.append(li);
}

function saveToDoTask(taskObj) {

}

function getTaskObject(text) {
    return {
        id: String(Date.now()),
        text
    }
}

function saveState() {
    // localStorage.setItem(TODO,);
}

function loadedToDo() {
    const loadToDo = localStorage.getItem(TODO);
}

function handleSubmit(event) {
    event.preventDefault();
    const taskObj = getTaskObject(toDoInput.value);
    toDoInput.value = "";
    saveToDoTask(taskObj);
    paintToDoTask(taskObj);
    saveState();
}

function init() {
    submitBtn.addEventListener("click", handleSubmit);
    loadedToDo();
}

init();