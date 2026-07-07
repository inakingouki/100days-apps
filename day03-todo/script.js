const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === "") {
        alert("やることを入力してください");
        return;
    }

    const li = document.createElement("li");
    li.textContent = todoText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";

    deleteButton.onclick = function() {
        li.remove();
    };

    li.appendChild(deleteButton);
    todoList.appendChild(li);

    todoInput.value = "";
}