var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function (event) { // don't forget to put argument value as event
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if(!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
    formEl.reset();
};

var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement('div');
    taskInfoE1.className = 'task-info';     // give it a class name
    // add html content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // if we won't change here we will get a lexical scoping error
    listItemEl.appendChild(taskInfoE1);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);              // append this element to the task list
};

formEl.addEventListener("submit", taskFormHandler); // called onsubmit








// Create a new feature branch. We'll create a new feature branch where we will build the form. ✅

// Add a task form to HTML. We'll add an HTML form that will allow the user to enter the task name and type.

// Handle form submission. We'll use JavaScript to add a task to the list when the "Add Task" button is clicked.

// Target the HTML elements with the pertinent data.

// Read and store the content that those elements hold.

// Use that content to create a new task.

// Capture form field values. We'll use JavaScript to capture the unique information the user enters (the task name and type).

// Organize functionality. We'll refactor the code to make it more maintainable.

        // Rename the handler function to be a little more specific to the event it's handling.

        // Create a new function to take in the task's name and title as arguments and create the HTML elements that get added to the page.

        // Move the code that creates and adds HTML elements from the handler function into the newly created function.

        // Update the handler function to send the task name and type values from the form to the newly created function.

// Address usability concerns. We'll improve the user experience by validating form input and resetting the form after the user clicks the "Add Task" button.

// Save our progress with Git. We'll commit and push our changes up to GitHub