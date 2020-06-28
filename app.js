// global variables
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');

// to display real time clock
const realTimeClock = () => {
  const realTimeClock = new Date();
  let hours = realTimeClock.getHours();
  let minutes = realTimeClock.getMinutes();
  let amPm = (hours < 12) ? 'AM' : 'PM';
  hours = (hours > 12) ? hours - 12 : hours;
  hours = ('0' + hours).slice(-2);
  minutes = ('0' + minutes).slice(-2);
  document.getElementById('clock').innerHTML = `<h2>${hours}:${minutes}<span class="am-pm">${amPm}</span><h2>`;
}

// display greeting
const greeting =() => {
  let greeting;
  const realTime = new Date();
  let hours = realTime.getHours();
  if (hours >= 3 && hours < 10) {
    greeting = 'Good morning';
  } else if (hours >= 10 && hours < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening'
  }
  document.getElementById('greeting').innerHTML = `${greeting}, what's our focus for today?`
};



// to clear placeholder from task input
const clearPlaceholder = () => taskInput.placeholder = '';

// to display all stored tasks from local storage
const displayTasksFromLocalStorage = () => {
  let storedTasks;
  if (localStorage.getItem('storedTasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }
  storedTasks.forEach(storedTask => {
    let taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `${storedTask}<a class="remove-item"><i class="fas fa-check-circle"></i></a>`;
    taskList.appendChild(taskItem);
  });
};

// to add task to local storage
const addTaskToLocalStorage = (task) => {
  let storedTasks;
  if (localStorage.getItem('storedTasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }
  storedTasks.push(task);
  localStorage.setItem('storedTasks', JSON.stringify(storedTasks))
};

// to add task
const addTask = (e) => {
  if (taskInput.value === '') {
    alert('Please add a task.');
  } else {
    let taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `${taskInput.value}<a class="remove-item"><i class="fas fa-check-circle"></i></a>`;
    taskList.appendChild(taskItem);
    addTaskToLocalStorage(taskInput.value);
    taskInput.value = '';
    taskInput.placeholder = 'New task...'
  }
  e.preventDefault();
};

// to remove task from local storage
const removeTaskFromLocalStorage = (task) => {
  let storedTasks;
  if (localStorage.getItem('storedTasks') === null) {
    storedTasks = [];
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }
  storedTasks.forEach((storedTask, index) => {
    if (storedTask === task) {
      storedTasks.splice(index, 1);
    }
  });
  localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
};

// to remove task
const removeTask = (e) => {
  if (e.target.parentElement.className === 'remove-item') {
    e.target.parentElement.parentElement.style.background = 'rgba(255, 255, 255, 0.3)';
    setTimeout(() => {
      taskList.removeChild(e.target.parentElement.parentElement);
    }, 400);
    removeTaskFromLocalStorage(e.target.parentElement.parentElement.textContent);
  }
};

// to clear all tasks from local storage
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
};

// to clear all tasks
const clearTasks = () => {
  if (confirm('Are sure you want to clear all tasks?')) {
    while (taskList.firstElementChild) {
      taskList.removeChild(taskList.firstElementChild);
    }
    clearTasksFromLocalStorage();
  }
};

// to load all event listeners
const loadAllEventListeners = () => {
  document.addEventListener('DOMContentLoaded', realTimeClock);
  document.addEventListener('DOMContentLoaded', greeting);
  taskInput.addEventListener('click', clearPlaceholder);
  taskForm.addEventListener('submit', addTask);
  document.addEventListener('DOMContentLoaded', displayTasksFromLocalStorage);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
};
loadAllEventListeners();
