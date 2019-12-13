let todos = [];
const EDIT = "E";
const SAVE = "S";
let currentMode = SAVE;
let currentId = "";
function getTodo(id) {
    return todos.find(function (obj) {
        return obj["id"] == id;
    });
}

function setValue(todoText) {
    document.getElementById("todo-text").value = todoText;
}

function setButtonText(text) {
    document.getElementById("saveButton").innerText = text;
}

function setMode(mode) {
    currentMode = mode;
}

function clearInputBox() {
    setValue("");
}

function updateUI() {
    switch (currentMode) {
        case EDIT:
            setButtonText("Update");
            break;
        case SAVE:
            setButtonText("Save");
            break;
    }
    clearInputBox();
    clearTable();
    populateTable();
}

function editTodo(id) {
    const todo = getTodo(id);
    setMode(EDIT);
    updateUI();
    setValue(todo["text"]);
    currentId = id;
}

function clearTable(){
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";
}
function populateTable() {
    const tbody = document.getElementById("tableBody");
    todos.forEach(function (obj) {
        tbody.append(createRow(obj));
    });
}

function deleteTodo(id) {
    const todo = todos.find(function(obj){
        return obj["id"] == id;
    });
    //homework
}

function createRow(obj){
    const trow = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.innerHTML = obj["id"];
    const td2 = document.createElement("td");
    td2.innerHTML = obj["text"];
    const td3 = document.createElement("td");
    const editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.addEventListener("click",function(){
       editTodo(obj["id"]);
    });
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click",function () {
        deleteTodo(obj["id"]);
    });
    td3.append(editButton);
    td3.append(deleteButton);
    trow.append(td1);
    trow.append(td2);
    trow.append(td3);
    return trow;
}

function fetchTodo() {
    console.log("hello");
    let xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function () {
        if (this.status === 200 && this.readyState === 4) {
            todos = JSON.parse(this.responseText);
            populateTable();
        }
    };
    xmlHttpRequest.open("GET", "todos.json", true);
    xmlHttpRequest.send();
}

function save(value) {
    todos.push({"id":Date.now(),"text":value});
}

function update(value) {
    todos = todos.map(function(todo){
        if(todo.id == currentId){
            todo.text = value;
        }
        return todo;
    });
}

function saveClicked() {
    let value = document.getElementById("todo-text").value;
    if(value.trim().length === 0) return;
    switch (currentMode) {
        case SAVE:
            save(value);
            break;
        case EDIT:
            update(value);
            break;
    }
    setMode(SAVE);
    updateUI();
}

function addEventListeners() {
    document.getElementById("saveButton").addEventListener("click", saveClicked)
}

window.addEventListener('load', function () {
    fetchTodo();
    addEventListeners();
});