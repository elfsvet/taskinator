var buttonEl = document.querySelector("#save-task"); // targets button by id
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    var listItemEl = document.createElement("li");//created new task item
    listItemEl.className = "task-item";               // styled the new task item
    listItemEl.textContent = "This is a new task.";   // Add the text
    tasksToDoEl.appendChild(listItemEl);              // append this element to the task list
}

buttonEl.addEventListener("click", createTaskHandler); // adds listen click event to button