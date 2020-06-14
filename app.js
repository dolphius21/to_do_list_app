const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('.task-list')
const clearBtn = document.querySelector('.clear-btn');

// CLEAR PLACEHOLDER WHEN CLICKED
const clearPlaceholder = () => {
  taskInput.placeholder = '';
}

// DISPLAY SAVED TASKS FROM LOCAL STORAGE
const displayTasksFromLocalStorage = () => {
  let storedTasks;
  // get stored tasks data from local storage
  if(localStorage.getItem('storedTasks') === null) {
    storedTasks = []
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }
  // Iterate through the stored data
  storedTasks.forEach((task) => {
  // Create list-item
  const listItem = document.createElement('li');
  listItem.className = 'list-item';
  listItem.appendChild(document.createTextNode(task));
  // Create remove-item 
  const link = document.createElement('a');
  link.className = 'remove-item';
  link.innerHTML = '<i class="fas fa-check-circle"></i>'
  listItem.appendChild(link);
  // Append list-item to task-list
  taskList.appendChild(listItem);
  });
};

// ADD TASK TO LOCAL STORAGE
const addTaskToLocalStorage = (task) => {
  let storedTasks;
  // get stored tasks data from local storage
  if(localStorage.getItem('storedTasks') === null) {
    storedTasks = []
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }
  // add new tasks to the stored tasks
  storedTasks.push(task);
  // update data in the local storage
  localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
};

// ADD TASK TO THE LIST
const addTask = (e) => {
  if(taskInput.value === '') {
    alert('Please add a task.');
  } else {
    // Create list-item
    const listItem = document.createElement('li');
    listItem.className = 'list-item';
    listItem.appendChild(document.createTextNode(taskInput.value));
    // Create remove-item 
    const link = document.createElement('a');
    link.className = 'remove-item';
    link.innerHTML = '<i class="fas fa-check-circle"></i>'
    listItem.appendChild(link);
    // Append list-item to task-list
    taskList.appendChild(listItem);
    // Add task to local storage
    addTaskToLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
    // Prevent submit default behavior
    e.preventDefault();
  }
};

// REMOVE TASK FROM LOCAL STORAGE
const removeTaskFromLocalStorage = (task) => {
  let storedTasks;
  // check stored tasks data from local storage
  if(localStorage.getItem('storedTasks') === null) {
    storedTasks = []
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }
  // iterate on the existing tasks in the local storage and remove the task that matched
  storedTasks.forEach((currentTask, index) => {
    if(task.textContent === currentTask) {
      storedTasks.splice(index, 1);
    }
  });
  // update data in the local storage
  localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
};

// REMOVE TASK FROM THE LIST
const removeTask = (e) => {
  // Check if target has remove item class
  if(e.target.parentElement.className === 'remove-item') {
    e.target.parentElement.parentElement.style.background = '#E8F9F1';
    setTimeout(() => {
      e.target.parentElement.parentElement.remove();
    }, 300)

    // call function
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
};

// CLEAR TASKS FROM LOCAL STORAGE
const clearTaskFromLocalStorage = () => {
  localStorage.clear();
};

// CLEAR TASKS
const clearTasks = () => {
  if(confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }
  // call function
  clearTaskFromLocalStorage()
};

// LOAD ALL EVENT LISTENERS
const loadAllEventListeners = () => {
  taskInput.addEventListener('click', clearPlaceholder);
  form.addEventListener('submit', addTask);
  document.addEventListener('DOMContentLoaded', displayTasksFromLocalStorage);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
};

loadAllEventListeners();