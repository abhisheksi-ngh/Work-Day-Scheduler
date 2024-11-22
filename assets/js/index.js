// Get references to DOM elements
const currentDay = document.getElementById('currentDay');
const currentDate = document.getElementById('currentDate');
const prevDayButton = document.getElementById('prevDay');
const nextDayButton = document.getElementById('nextDay');
const saveButtons = document.querySelectorAll('.saveBtn');
const deleteButtons = document.querySelectorAll('.deleteBtn');

// Initialize the current date using Day.js
let selectedDate = dayjs();

// Function to format and display the current date
function updateDateDisplay() {
  currentDay.textContent = selectedDate.format('dddd, MMMM D, YYYY'); // Example: Monday, March 20, 2024
  currentDate.textContent = selectedDate.format('MMMM D, YYYY'); // Example: March 20, 2024
}

// Function to handle saving activities to localStorage
function saveActivity(slotId, activityText) {
  const activities = JSON.parse(localStorage.getItem('workDayActivities')) || {};
  activities[slotId] = activityText;
  localStorage.setItem('workDayActivities', JSON.stringify(activities));
}

// Function to load saved activities from localStorage
function loadActivities() {
  const activities = JSON.parse(localStorage.getItem('workDayActivities')) || {};
  for (const [slotId, activityText] of Object.entries(activities)) {
    const textarea = document.getElementById(slotId);
    if (textarea) {
      textarea.value = activityText;
    }
  }
}

// Function to delete an activity
function deleteActivity(slotId) {
  const activities = JSON.parse(localStorage.getItem('workDayActivities')) || {};
  delete activities[slotId];
  localStorage.setItem('workDayActivities', JSON.stringify(activities));
  const textarea = document.getElementById(slotId);
  if (textarea) {
    textarea.value = '';
  }
}

// Event listeners for save buttons
saveButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const row = event.target.closest('.row');
    const textarea = row.querySelector('textarea');
    const slotId = textarea.id;
    const activityText = textarea.value;
    saveActivity(slotId, activityText);
    alert('Activity saved!');
  });
});

// Event listeners for delete buttons
deleteButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const row = event.target.closest('.row');
    const textarea = row.querySelector('textarea');
    const slotId = textarea.id;
    deleteActivity(slotId);
    alert('Activity deleted!');
  });
});

// Event listeners for date navigation buttons
prevDayButton.addEventListener('click', () => {
  selectedDate = selectedDate.subtract(1, 'day');
  updateDateDisplay();
});

nextDayButton.addEventListener('click', () => {
  selectedDate = selectedDate.add(1, 'day');
  updateDateDisplay();
});

// Initialize the app
updateDateDisplay();
loadActivities();
