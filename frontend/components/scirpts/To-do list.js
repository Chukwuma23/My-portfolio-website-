const option = document.getElementById('option');


function openOption() {
    option.classList.remove('hide');
  option.style.display = 'block';
  
}

function closeOption() {
  option.classList.add('hide');
  setTimeout(() => {
    option.style.display = 'none';
  }, 600);
}

function closeModal() {
  settingsModal.classList.add('hide');
  setTimeout(() => {
    settingsModal.style.transform = 'scale(0)';
  }, 100);
}

function openSetting() {
    settingsModal.classList.remove('hide');
    setTimeout(() => {
    settingsModal.style.transform = 'scale(1)';
  }, 100);
}
    


const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const settingsModal = document.getElementById('settings-modal');
const taskTextInput = document.getElementById('task-text');
const categorySelect = document.getElementById('category');
const prioritySelect = document.getElementById('priority');
const dueDateInput = document.getElementById('due-date');
const dueTimeInput = document.getElementById('due-time');
const saveSettingsBtn = document.getElementById('save-settings-btn');

// Task data storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentTaskIndex = null;

// Add event listener to add task button
addTaskBtn.addEventListener('click', addTask);



taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-task-btn')) {
    deleteTask(event);
  } else if (event.target.classList.contains('settings-img')) {
    editTask(event);
  } else if (event.target.tagName === 'LI') {
    toggleTaskCompletion(event);
  }
});


// Add event listener to save settings button
saveSettingsBtn.addEventListener('click', saveTaskSettings);

// Function to add task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
   alert('You must write something!');
  }
    if (taskText) {
        const task = {
            text: taskText,
            category: 'Work',
            priority: 'Medium',
            dueDate: '',
            dueTime: '',
            completed: false
        };
        tasks.push(task);
        displayTasks();
        taskInput.value = '';
          saveTasks();
    }
}






// Function to save task settings
function saveTaskSettings() {
    try {
        if (currentTaskIndex !== null && tasks[currentTaskIndex]) {
            const task = tasks[currentTaskIndex];
            task.text = taskTextInput.value;
            task.category = categorySelect.value;
            task.priority = prioritySelect.value;
            task.dueDate = dueDateInput.value;
            task.dueTime = dueTimeInput.value;
            saveTasks();
            displayTasks();
            settingsModal.style.transform = 'scale(0)';
            currentTaskIndex = null;
            alert('Note: This app have not yet support backend. we are working on it.');
         
                
                
  
        } else {
            console.error('Invalid task index');
        }
    } catch (error) {
        console.error('Error saving task settings:', error);
    }
    updateDashboard() 
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

displayTasks();

function saveTask() {
  const task = {
    text: taskTextInput.value,
    category: categorySelect.value,
    priority: prioritySelect.value,
    dueDate: dueDateInput.value,
    dueTime: dueTimeInput.value,
    reminderDate: reminderDateInput.value,
    reminderTime: reminderTimeInput.value,
  };

  // Use Twilio API to send reminder
  reminder.sendReminder(task);

  // Update task list
  tasks[currentTaskIndex] = task;
  updateDashboard();
}








// Update dashboard
function updateDashboard() {
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  
  document.getElementById('total-tasks').textContent = `Total Tasks: ${totalTasks}`;
  document.getElementById('pending-tasks').textContent = `Pending Tasks: ${pendingTasks}`;
  document.getElementById('completed-tasks').textContent = `Completed Tasks: ${completedTasks}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  displayTasks();
  
});






function deleteTask(event) {
  let taskIndex = event.target.dataset.index;
  // Confirm deletion
  let confirmDelete = confirm(`Are you sure you want to delete task ${tasks[taskIndex].text}?`);
  if (confirmDelete) {
    tasks.splice(taskIndex, 1);
    saveTasks();
    displayTasks();
    currentTaskIndex = null; // Reset currentTaskIndex
  }else{
      return
  }
  updateDashboard() 

}

function toggleTaskCompletion(event) {
  const taskIndex = event.target.dataset.index;
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  saveTasks();
  displayTasks();
  updateDashboard();
}






/////////////////REMINDER///////////////

const reminderDateInput = document.getElementById('reminder-date');
const reminderTimeInput = document.getElementById('reminder-time');


//Here's an updated `editTask` function with reminder feature:




function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('LI');
    taskElement.dataset.index = index;
    taskElement.className = task.completed ? 'completed' : '';
    taskElement.innerHTML = `
      ${task.text} - ${task.category} - ${task.priority} - ${task.dueDate} - ${task.dueTime}
      <button class="delete-task-btn" data-index="${index}">Delete</button>
      <img onclick='openSetting()' class="settings-img" src="./settings (2).png" data-index="${index}" height="30" width="30">
    `;
    taskList.appendChild(taskElement);
  });
  scheduleReminders();
  updateDashboard();
}

function editTask(event) {
  const taskIndex = event.target.dataset.index;
  currentTaskIndex = parseInt(taskIndex);
  if (tasks[currentTaskIndex]) {
    const task = tasks[currentTaskIndex];
    taskTextInput.value = task.text;
    categorySelect.value = task.category;
    prioritySelect.value = task.priority;
    dueDateInput.value = task.dueDate;
    dueTimeInput.value = task.dueTime;
    settingsModal.style.display = 'block';
  } else {
    console.error('Task not found');
  }
  updateDashboard();
}



function scheduleReminders() {
  tasks.forEach((task, index) => {
    const dueDateTime = new Date(`${task.dueDate} ${task.dueTime}`);
    const currentTime = new Date();
    const timeDifference = dueDateTime - currentTime;
    if (timeDifference > 0) {
      setTimeout(() => {
        displayReminder(task);
      }, timeDifference);
    }
  });
    // Get selected alarm sounds
}
const selectedSound = document.getElementById('alarm-select').value;
  
  /*// Play selected alarm sound
  const audio = new Audio(selectedSound);
  audio.play();*/



// Alarm sounds array
const alarmSounds = [
  { name: 'Alarm 1', file: '/file /Clock_Alert_1.mp3' },
  { name: 'Alarm 2', file: 'alarm2.mp3' },
  { name: 'Alarm 3', file: 'alarm3.mp3' },
];




 document.getElementById('portfolio-link').addEventListener('click', (e) => {
    if (!confirm('You are about to be redirected to my  portfolio website to send a message.\n fill in the form at the bottom of the website and click the  send button, your message will be delivered to me, your suggestions and requests will be granted.\n click okay to visit website.\n click cancel to stay.')) {
      e.preventDefault();
    }
  });



  //WINDOW DISPLAY. 
  let pageLoaded = false;

saveSettingsBtn.addEventListener('click', () => {
  saveTaskSettings();
  pageLoaded = true;
});

const windowElement = document.querySelector('.window');

windowElement.addEventListener('animationend', () => {
  if (!pageLoaded) {
    windowElement.classList.add('hide');
    setTimeout(() => {
      windowElement.style.display = 'none';
      localStorage.setItem('introShown', 'true');
      alert('Welcome to my to-do list app. Note: please note this app is not fully functional yet.\n I will be adding more features to suite your needs through your suggestions so feel free to message for any information.\n Your suggestions are needed, thanks for viewing.');
    }, 4000);
  }
}, { once: true });

const spans = document.querySelectorAll('.window span');
spans.forEach((span, index) => {
  span.style.animationDelay = `${index * 0.3}s`;
});

// Check if intro has already been shown
if (localStorage.getItem('introShown') === 'true') {
  windowElement.style.display = 'none';
}









