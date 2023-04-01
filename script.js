

let time = localStorage.getItem('time') ? parseInt(localStorage.getItem('time')) : 0;
const notifications = localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications')) : [];
let isPaused = true;


const pauseBtn = document.querySelector('#pauseBtn');
const playBtn = document.querySelector('#playBtn');
pauseBtn.addEventListener('click', () => {
    isPaused = true;
  });
  
  playBtn.addEventListener('click', () => {
    isPaused = false;
  });
const resetBtn = document.querySelector('#resetBtn');
resetBtn.addEventListener('click', reset);


window.onload = function()
{
displayNotifications();
main()
}

function main(){
setInterval(() => {
    if(isPaused===false){
time++;
localStorage.setItem('time', time.toString());
const clock = document.querySelector('#clock');
const days = Math.floor(time/ 1440)+1;
const hours = Math.floor((time % 1440) / 60);
const minutes = time % 60;
clock.textContent = `Day ${days} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

if (time % (1440) === 0) {

notifications.push({
message: 'New day!',
day: days,
hour: hours,
minute: minutes
}); // Add notification to list

updateNotifications('New day!',days,hours,minutes)
localStorage.setItem('notifications', JSON.stringify(notifications));

}
    }
}, 1);

}

function displayNotifications() {
    const notificationsEl = document.querySelector('#notifications');
    notificationsEl.innerHTML = '';
    notifications.forEach(notification => {
    const notificationEl = document.createElement('div');
    notificationEl.textContent = `${notification.message} - Day ${notification.day}, ${notification.hour}:${notification.minute.toString().padStart(2, '0')}`;
    notificationsEl.appendChild(notificationEl);
    });
}
function updateNotifications(message,days,hours,minutes) {
    const notificationsEl = document.querySelector('#notifications');
    const notificationEl = document.createElement('div');
    notificationEl.textContent = `${message} - Day ${days}, ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    notificationsEl.appendChild(notificationEl);
}

function reset() {
    time = 0;
    notifications.length = 0;
    localStorage.removeItem('time');
    localStorage.removeItem('notifications');
    displayNotifications();
    const clock = document.querySelector('#clock');
    clock.textContent = 'Day 1 00:00';
    isPaused = true; // Pause the game
    // clearInterval(intervalId); // Clear the interval that's running the main function
  }