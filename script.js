const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");

document.addEventListener("DOMContentLoaded", getLocalTodos);
button.addEventListener("click", addTodo);
list.addEventListener("click", deleteCompleteCheck);

function createItem( item){
    // Create/add new div to the list     
    const newDiv = document.createElement("div");
    newDiv.classList.add("todo");

    // Create/add new Todo to the list and attach to the new div
    const newTodo = document.createElement("li");
    newTodo.innerText = item.text; 
    newTodo.classList.add("todo-item");

    if (item.completed) {
        newDiv.classList.add("completed"); // Add the "completed" class if the todo is completed
    }
    newDiv.appendChild(newTodo);

    // Create/attach completed button to the new todo
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completeButton.classList.add("complete-btn");
    newDiv.appendChild(completeButton);

    // Create/attach trash button to the new todo
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    newDiv.appendChild(trashButton);
    
    // Attach new Div to the list
    list.appendChild(newDiv);
}

function addTodo(event) {
    
    event.preventDefault(); 
    // create todo item from textbox and attach to list
    createItem( {text:input.value,comleted:false})
    //Add to local storage 
    saveLocalTodos(input.value);
    //reset textbox after
    input.value = "";
}

function checkLocalTodos(){
   // Check for todos in Local Storage
    if(localStorage.getItem("todos") === null) {
        return [];
    } else {
        return JSON.parse(localStorage.getItem("todos"));
    }
}

function getLocalTodos() {
    let todos = checkLocalTodos();
    // Create Items in the list for every todo in local Storage
    todos.forEach(todo => {
        createItem( todo)
    });
}


function saveLocalTodos(todo) {
    let todos = checkLocalTodos()
    // Add the new Todo to the list and set the list in Local storage
    todos.push({text:todo, completed:false});
    localStorage.setItem("todos", JSON.stringify(todos));
}



function deleteCompleteCheck(e) {
    const item = e.target;
    let todos = checkLocalTodos()

    
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        
        const todoIndex = todos.findIndex(t => t.text === todo.children[0].innerText);
        todos.splice(todoIndex, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        todo.remove();
    }

    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        let todos = checkLocalTodos();
        const todoIndex = todos.findIndex(t => t.text === todo.children[0].innerText);
        todos[todoIndex].completed = todo.classList.contains("completed");
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    todos = checkLocalTodos()

}


