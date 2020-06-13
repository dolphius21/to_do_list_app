const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('.task-list')
const clearBtn = document.querySelector('.clear-btn');

// Clear input
const clearInput = () => {
  taskInput.placeholder = '';
}

// Add task
const addTask = (e) => {
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
  a.appendChild(document.createTextNode('DONE'));
  li.appendChild(a);
  // append li to taskList
  taskList.appendChild(li);
  // clear input
  taskInput.value = '';

  e.preventDefault();
};

// Load all event listeners
const loadEventListeners = () => {
  taskInput.addEventListener('click', clearInput);
  form.addEventListener('submit', addTask);
}
loadEventListeners();
