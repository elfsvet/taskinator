var taskIdCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = []; // empty tasks array to store objects of tasks

var taskFormHandler = function (event) { // don't forget to put argument value as event
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        createTaskEl(taskDataObj);
    }
    formEl.reset();
};

var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement('div');
    taskInfoE1.className = 'task-info';     // give it a class name
    // add html content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // if we won't change here we will get a lexical scoping error
    listItemEl.appendChild(taskInfoE1);
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);              // append this element to the task list
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks(); // saves array to the localStorage
    // Increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function (taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);
    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    return actionContainerEl;
};

var taskButtonHandler = function (event) {
    // get target element from event
    var targetEl = event.target;
    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        // get the element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    // delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
        // get the element's task id
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};
var editTask = function (taskId) {
    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
}

var deleteTask = function (taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // create new array to hold updated list of tasks
    var updatedTaskArr = [];
    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;
    saveTasks();
};

var completeEditTask = function (taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) { // needs to be number from string
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };
    saveTasks();
    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var taskStatusChangeHandler = function (event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");
    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};
// Gets task items from localStorage.

// Converts tasks from the string format back into an array of objects.

// Iterates through a tasks array and creates task elements on the page from it.
var loadTasks = function () {
    tasks = localStorage.getItem("tasks", tasks);
    console.log(tasks);
    // Check if tasks is equal to null by using an if statement.
    if (!tasks) {
        // If it is, set tasks back to an empty array by reassigning it to [] and adding a return false. We don't want this function to keep running with no tasks to load onto the page.
        tasks = [];
        return false;
    }
    // If it's not null, we don't have to worry about it and we can skip the if statement's code block.
    tasks = JSON.parse(tasks);
    console.log(tasks);
    for (var i = 0; i < tasks.length; i++) {
        // To keep the id for each task in sync, reassign the id property of task[i] to the value of taskIdCounter.
        tasks[i].id = taskIdCounter;
        // Add console.log(tasks[i]) after reassigning the id property. This way, we can see them printing in order in the console.
        console.log(tasks[i]);
        // Create a <li> element and store it in a variable called listItemEl.
        var listItemEl = document.createElement("li");
        // Give it a classname attribute of task-item.
        listItemEl.className = 'task-item';
        // Using setAttribute(), give it a data-task-id attribute with a value of tasks[i].id.
        listItemEl.setAttribute("data-task-id", tasks[i].id);
        // Create a <div> element and store it in a variable called taskInfoEl.
        var taskInfoEl = document.createElement('div');
        // Give it a classname property of task-info to set the HTML class attribute.
        taskInfoEl.className = "task-info";
        // Set its innerHTML property to the following:
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
        // Append taskInfoEl to listItemEl.
        listItemEl.appendChild(taskInfoEl);
        // Create the actions for the task by creating a variable called taskActionsEl and giving it a value of createTaskActions() with tasks[i].id as the argument.
        var taskActionsEl = createTaskActions(tasks[i].id);
        // Append taskActionsEl to listItemEl.
        listItemEl.appendChild(taskActionsEl);
        // Check that taskActionsEl was appended to listItemEl correctly by using a console.log(listItemEl);. It should look like the following image:
        console.log(listItemEl);
        // With an if statement, check if the value of tasks[i].status is equal to to do.
        if(tasks[i].status === "to do"){
        // If yes, use listItemEl.querySelector("select[name='status-change']").selectedIndex and set it equal to 0.
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;
        // Append listItemEl to tasksToDoEl.
        tasksToDoEl.appendChild(listItemEl);
        // With else if, check if the value of tasks[i].status is equal to in progress.
        } else if (tasks[i].status === "in progress"){
        // If yes, use listItemEl.querySelector("select[name='status-change']").selectedIndex and set it equal to 1.
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 1;
        // Append listItemEl to tasksInProgressEl.
        tasksInProgressEl.appendChild(listItemEl);
        // With else if, check if the value of tasks[i].status is equal to complete.
        } else if (tasks[i].status === "complete"){
        // If yes, use listItemEl.querySelector("select[name='status-change']").selectedIndex and set it equal to 2.
        listItemEl.querySelector("select[name='status-change']").selectedIndex = 2;
        // Append listItemEl to tasksCompletedEl.
        tasksCompletedEl.appendChild(listItemEl);}
        // Increase taskIdCounter by 1.
        taskIdCounter++;
        // Add one more console.log(listItemEl) after incrementing the
        console.log(listItemEl);

    }




};
/* var createTaskEl = function (taskDataObj) {
    // create list item
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';
    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    //create div to hold task info and add to list item
    var taskInfoE1 = document.createElement('div');
    taskInfoE1.className = 'task-info';     // give it a class name
    // add html content to div
    taskInfoE1.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>"; // if we won't change here we will get a lexical scoping error
    listItemEl.appendChild(taskInfoE1);
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);              // append this element to the task list
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);
    saveTasks(); // saves array to the localStorage
    // Increase task counter for next unique id
    taskIdCounter++;
}; */

formEl.addEventListener("submit", taskFormHandler); // called onsubmit
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks();



// Create a feature branch. We'll create a feature branch that corresponds to the GitHub issue we're addressing in this lesson.

// Save tasks to an array. We'll organize all the elements that correspond to a task into an object, and save those objects into an array.

// Save tasks to localStorage. We'll implement the ability to save our tasks to localStorage so that they can be retrieved later.

// Load tasks from localStorage. We'll add the ability to retrieve saved tasks from localStorage.

// Optimize the code. We'll reduce our technical debt by refactoring the code. This is a best practice and a good habit to develop.

// Save our progress with Git. We'll merge the feature branch into the develop branch and push our changes to GitHub.

// Deploy to GitHub Pages. We'll deploy our finished application to GitHub Pages so we can show it off to the world and use it anywhere!

// Use localStorage to maintain persistence.

// Refactor the codebase to accommodate persistence.

// Deploy to GitHub Pages.