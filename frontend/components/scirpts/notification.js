if ('Notification' in window) { 
  Notification.requestPermission(); 
}

function displayReminder(task) {
  if (Notification.permission === 'granted') {
    const notification = new Notification('Todo List Reminder', {
      body: `Task "${task.text}" is due soon!`,
      icon: 'notification-icon.png',
    });

    // Play selected alarm sound
    const selectedSound = document.getElementById('alarm-select').value;
    const audio = new Audio(selectedSound);
    audio.play();
  } else if (Notification.permission === 'denied') {
    console.log('Notification permission denied');
  } else {
    console.log('Notification permission not requested');
  }
}

if ('Notification' in window) {
    Notification.requestPermission();
  }