var taskIdCounter = 0;
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

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id",taskIdCounter);

    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement('div');
    taskInfoE1.className = 'task-info';     // give it a class name
    // add html content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // if we won't change here we will get a lexical scoping error
    listItemEl.appendChild(taskInfoE1);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);              // append this element to the task list

    // Increase task counter for next unique id
    taskIdCounter++;
};

formEl.addEventListener("submit", taskFormHandler); // called onsubmit








// Create a new feature branch. We'll create a feature branch that corresponds to the GitHub issue we're addressing in this lesson.

// Add two new lists in the HTML. We'll add a Tasks In Progress and a Tasks Completed list to Taskmaster.

// Apply a unique id to each task. We'll create an id that uniquely identifies each task that's created.

// Dynamically create task buttons for each task. Once we have an id for each task, we can start adding buttons and dropdowns that reference the id. Because a task and its id are dynamically created, these buttons and dropdowns will also be dynamic.

// Add the ability to delete a task. We'll use event listeners to allow the user to delete tasks.

// Load the task into the form to be edited. Users might want to edit existing tasks. We'll enable this by making sure the right task data loads in the editing form.

// Save the edited task. Users will want to save their edits to a task; we'll make sure they can do that.

// Move the task based on status. If the user changes the status of a task, we'll make sure it is moved to the appropriate list.

// Save your progress with Git. You did it! It's time to merge your feature branch into the develop branch and commit your changes to GitHub.