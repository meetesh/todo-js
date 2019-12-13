let todos = [];

function editTodo(id) {
    const todo = todos.filter(function(obj){
        return obj["id"] == id;
    });
    document.getElementById("todo-text").value = todo[0]["text"];
}

function populateTable() {
    const tbody = document.getElementById("tableBody");
    todos.forEach(function (obj) {
        tbody.append(createRow(obj));
    });
}

function createRow(obj){
    const trow = document.createElement("tr");
    trow.innerHTML = ` 
            <td>${obj["id"]}</td>
            <td>${obj["text"]}</td>
            <td>
            <button onclick="editTodo(${obj["id"]})">Edit</button>
            <button>Delete</button>
            </td>
            `;
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
    xmlHttpRequest.open("GET", "../ui/todos.json", true);
    xmlHttpRequest.send();
}

window.addEventListener('load', function () {
    fetchTodo();
});