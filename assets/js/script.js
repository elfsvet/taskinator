// var buttonEl = document.querySelector("#save-task"); // targets button by id
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {

    event.preventDefault();

    var listItemEl = document.createElement("li");//created new task item
    listItemEl.className = "task-item";               // styled the new task item
    listItemEl.textContent = "This is a new task.";   // Add the text
    tasksToDoEl.appendChild(listItemEl);              // append this element to the task list
}

formEl.addEventListener("submit", createTaskHandler); // called onsubmit
// buttonEl.addEventListener("click", createTaskHandler); // adds listen click event to button








// Create a new feature branch. We'll create a new feature branch where we will build the form. ✅

// Add a task form to HTML. We'll add an HTML form that will allow the user to enter the task name and type.

// Handle form submission. We'll use JavaScript to add a task to the list when the "Add Task" button is clicked.

// Capture form field values. We'll use JavaScript to capture the unique information the user enters (the task name and type).

// Organize functionality. We'll refactor the code to make it more maintainable.

// Address usability concerns. We'll improve the user experience by validating form input and resetting the form after the user clicks the "Add Task" button.

// Save our progress with Git. We'll commit and push our changes up to GitHub