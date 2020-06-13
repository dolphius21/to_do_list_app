const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('.task-list')
const clearBtn = document.querySelector('.clear-btn');


// CLEAR INPUT
taskInput.addEventListener('click', () => {
  taskInput.placeholder = '';
});


// DISPLAY TASKS FROM LOCAL STORAGE
document.addEventListener('DOMContentLoaded', () => {
  let storedTasks;
  // get stored tasks data from local storage
  if(localStorage.getItem('storedTasks') === null) {
    storedTasks = []
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }

  storedTasks.forEach((task) => {
    // create list-item
    const li = document.createElement('li');
    li.className = 'list-item';
    li.appendChild(document.createTextNode(task));
    
    // create remove-item btn
    const a = document.createElement('a');
    a.className = 'remove-item';
    a.innerHTML = '<i class="fas fa-check-circle"></i>';
    li.appendChild(a);
  
    // append li to taskList
    taskList.appendChild(li);
  });
});


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


// ADD TASK
form.addEventListener('submit', (e) => {
  // Check if there's value
  if(taskInput.value === '') {
    alert('Add a task.');
  }
  // create list-item
  const li = document.createElement('li');
  li.className = 'list-item';
  li.appendChild(document.createTextNode(taskInput.value));
  
  // create remove-item btn
  const a = document.createElement('a');
  a.className = 'remove-item';
  a.innerHTML = '<i class="fas fa-check-circle"></i>';
  li.appendChild(a);
 
  // append li to taskList
  taskList.appendChild(li);

  // call function
  addTaskToLocalStorage(taskInput.value);
  
  // clear input
  taskInput.value = '';

  e.preventDefault();
});


// REMOVE TASK FROM LOCAL STORAGE
const removeTaskFromLocalStorage = (taskItem) => {
  let storedTasks;
  // check stored tasks data from local storage
  if(localStorage.getItem('storedTasks') === null) {
    storedTasks = []
  } else {
    storedTasks = JSON.parse(localStorage.getItem('storedTasks'));
  }
  // iterate on the existing tasks in the local storage and remove the task that matched
  storedTasks.forEach((currentTask, index) => {
    if(taskItem.textContent === currentTask) {
      storedTasks.splice(index, 1);
    }
  });
  // update data in the local storage
  localStorage.setItem('storedTasks', JSON.stringify(storedTasks));
};


// REMOVE TASK
taskList.addEventListener('click', (e) => {
  // Check if target has remove item class
  console.log(e.target.className);
  if(e.target.parentElement.className === 'remove-item') {
    e.target.parentElement.parentElement.style.background = '#E8F9F1';
    setTimeout(() => {
      e.target.parentElement.parentElement.remove();
    }, 300)

    // call function
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
});


// CLEAR TASK FROM LOCAL STORAGE
const clearTaskFromLocalStorage = () => {
  localStorage.clear();
}


// CLEAR TASK
clearBtn.addEventListener('click', (e) => {
  if(confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild)
    }
  }

  // call function
  clearTaskFromLocalStorage()
});