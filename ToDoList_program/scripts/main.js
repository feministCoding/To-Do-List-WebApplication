// Access key DOM elements
const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');
const removeCompletedBtn = document.getElementById('remove-completed-btn');

let taskIdCounter = 0; // Counter for unique task IDs

/**
 * Creates a new task element with a checkbox and label.
 * @param {string} taskName - The name of the task to be added.
 * @returns {HTMLElement} The list item element containing the task.
 */
function createTaskElement(taskName) {
    const listItem = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    // Sanitize taskName for ID, allowing Unicode letters and appending a unique counter
    checkbox.id = `${taskName.replace(/\s+/g, '-').replace(/[^\p{L}0-9]/gu, '')}-checkbox-${taskIdCounter++}`;
    
    const label = document.createElement('label');
    label.htmlFor = checkbox.id;
    label.textContent = taskName; // Directly use textContent for safe text insertion

    // Assemble the task element
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    return listItem;
}

/**
 * Adds a new task element to the task list.
 * @param {string} taskName - The name of the task to be added.
 */
function addTaskToList(taskName) {
    const taskElement = createTaskElement(taskName);
    taskList.appendChild(taskElement);
}

// Event listener for form submission to add a new task
addTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = newTaskInput.value.trim();
    if (taskName) {
        addTaskToList(taskName);
        newTaskInput.value = ''; // Reset input field
    } else {
        alert("Please enter a task.");
    }
});

// Event listener for marking a task as completed
taskList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        const li = event.target.parentNode;
        event.target.checked ? li.classList.add('completed') : li.classList.remove('completed');
    }
});

// Event listener to remove all completed tasks
removeCompletedBtn.addEventListener('click', function() {
    const completedTasks = document.querySelectorAll('.completed');
    completedTasks.forEach(task => task.parentNode.removeChild(task));
});
