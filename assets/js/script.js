// var buttonEl = document.querySelector("#save-task"); // targets button by id
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event) { // don't forget to put argument value as event

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement('div');
    taskInfoE1.className = 'task-info';     // give it a class name

    // add html content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoE1);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);              // append this element to the task list
}

formEl.addEventListener("submit", createTaskHandler); // called onsubmit
// buttonEl.addEventListener("click", createTaskHandler); // adds listen click event to button








// Create a new feature branch. We'll create a new feature branch where we will build the form. ✅

// Add a task form to HTML. We'll add an HTML form that will allow the user to enter the task name and type.

// Handle form submission. We'll use JavaScript to add a task to the list when the "Add Task" button is clicked.

// Target the HTML elements with the pertinent data.

// Read and store the content that those elements hold.

// Use that content to create a new task.

// Capture form field values. We'll use JavaScript to capture the unique information the user enters (the task name and type).

// Organize functionality. We'll refactor the code to make it more maintainable.

// Address usability concerns. We'll improve the user experience by validating form input and resetting the form after the user clicks the "Add Task" button.

// Save our progress with Git. We'll commit and push our changes up to GitHub