let time = localStorage.getItem('time') ? parseInt(localStorage.getItem('time')) : 0;
const notifications = localStorage.getItem('notifications') ? JSON.parse(localStorage.getItem('notifications')) : [];
let isPaused = true;

// Corrected: Removed the duplicate 'playBtn' declaration
const pauseBtn = document.querySelector('#pauseBtn');
const startBtn = document.querySelector('#startBtn');
const resetBtn = document.querySelector('#resetBtn');
const feedBtn = document.querySelector('#feedBtn');
const playWithBtn = document.querySelector('#playBtn'); // Renamed for clarity
const cleanBtn = document.querySelector('#cleanBtn');


pauseBtn.addEventListener('click', () => {
    isPaused = true;
  });
  
  startBtn.addEventListener('click', () => {
    isPaused = false;
  });

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



// ASCII Art for the pet
const asciiPetHappy = `
  /\\_/\\  
 ( ^.^ ) 
  > ^ <
`;

const asciiPetSad = `
  /\\_/\\  
 ( -.- ) 
  > ^ <
`;

let petLevel = 1;

// Update the display of the pet based on its status
function displayPet() {
  const mainGame = document.getElementById('main-game');
  mainGame.textContent = happiness > 50 ? asciiPetHappy : asciiPetSad;
  mainGame.style.color = happiness > 50 ? '#a2d149' : '#ff6961'; // Happy green or sad red
}

// ... (rest of the existing code)

// Modify action button event listeners
feedBtn.addEventListener('click', () => {
  hunger = Math.min(hunger + 20, 100);
  displayPet(); // Update pet's visual state
  updatePetStatus();
});

playWithBtn.addEventListener('click', () => {
  happiness = Math.min(happiness + 20, 100);
  displayPet(); // Update pet's visual state
  updatePetStatus();
});

cleanBtn.addEventListener('click', () => {
  cleanliness = Math.min(cleanliness + 20, 100);
  displayPet(); // Update pet's visual state
  updatePetStatus();
});

// ... (rest of the existing code)

// Function to handle pet level up
function levelUp() {
  if (hunger > 80 && happiness > 80 && cleanliness > 80) {
    petLevel++;
    updateNotifications(`Your pet has reached level ${petLevel}!`, days, hours, minutes);
  }
}

// Modify the interval function to include level up and pet status display
setInterval(() => {
  if (!isPaused) {
    // ... (existing time-based status changes code)

    // Level up logic
    levelUp();

    // Display pet changes
    displayPet();
  }
}, 5000); // Update every 5 seconds for demo purposes

// Call displayPet on window load to show initial pet state
window.onload = function() {
  // ... (existing code)
  displayPet();
}
