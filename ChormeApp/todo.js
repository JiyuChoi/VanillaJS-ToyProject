const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingList = document.querySelector(".js-pending"),
    finishedList = document.querySelector(".js-finished");
const PENDING_LS = "pendings",
    FINISHED_LS = "finisheds";

let pendings = [];
let finisheds = [];

function deletePending(event) {
    const btn = event.target;
    const li = btn.parentNode;
    li.parentNode.removeChild(li);
    const cleanPending = pendings.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    pendings = cleanPending;
    saveToDos();
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    li.parentNode.removeChild(li);
    const cleanFinished = finisheds.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finisheds = cleanFinished;
    saveFinished();
}

function moveToFinished(event) {
    const btn = event.target,
        li = btn.parentNode;
    pendingList.removeChild(li);
    btn.removeEventListener("click", moveToFinished);

    const addFinished = pendings.filter(function (toDo) {
        return toDo.id === parseInt(li.id);
    });
    const cleanPending = pendings.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    pendings = cleanPending;
    saveToDos();

    addFinished.forEach((value) => {
        finisheds.push(value);
    });
    finishedList.appendChild(li);
    btn.innerText = "⏪";
    btn.addEventListener("click", moveToPending);
    saveFinished();
}

function moveToPending(event) {
    const btn = event.target,
        li = btn.parentNode;
    finishedList.removeChild(li);
    btn.removeEventListener("click", moveToPending);

    const addPending = finisheds.filter(function (toDo) {
        return toDo.id === parseInt(li.id);
    });
    const cleanFinished = finisheds.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finisheds = cleanFinished;
    saveFinished();

    addPending.forEach((value) => {
        pendings.push(value);
    });
    pendingList.appendChild(li);
    btn.innerText = "✅";
    btn.addEventListener("click", moveToFinished);
    saveToDos();
}

function saveToDos() {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendings));
}

function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finisheds));
}

function paintPending(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = Math.floor(Math.random() * 10000);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deletePending);
    finBtn.innerText = "✅";
    finBtn.addEventListener("click", moveToFinished);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.id = newId;
    pendingList.appendChild(li);
    const pendingObj = {
        id: newId,
        text: text
    };
    pendings.push(pendingObj);
    saveToDos();
}

function paintFinished(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const penBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = Math.floor(Math.random() * 10000);
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteFinished);
    penBtn.innerText = "⏪";
    penBtn.addEventListener("click", moveToPending);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(penBtn);
    li.id = newId;
    finishedList.appendChild(li);
    const finishedObj = {
        id: newId,
        text: text
    };
    finisheds.push(finishedObj);
    saveFinished();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPending(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedPending = localStorage.getItem(PENDING_LS);
    const loadedFinished = localStorage.getItem(FINISHED_LS);
    if (loadedPending !== null) {
        const parsePending = JSON.parse(loadedPending);
        parsePending.forEach((peding) => {
            paintPending(peding.text);
        });
    }
    if (loadedFinished !== null) {
        const parseFinished = JSON.parse(loadedFinished);
        parseFinished.forEach((finished) => {
            paintFinished(finished.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();