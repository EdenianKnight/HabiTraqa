// DOM Elements
const guestForm = document.getElementById('guest-form');
const habitList = document.getElementById('habit-list');
const loginButton = document.getElementById('login-btn');
const registerButton = document.getElementById('register-btn');

// Event Listeners
guestForm.addEventListener('submit', addHabit);
loginButton.addEventListener('click', navigateToLogin);
registerButton.addEventListener('click', navigateToRegister);

// Add Habit Function (Guest Mode)
function addHabit(e) {
    e.preventDefault();
    const habitName = document.getElementById('habit-name').value.trim();
    if (habitName) {
        const li = document.createElement('li');
        li.textContent = habitName;

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => li.remove());

        li.appendChild(removeButton);
        habitList.appendChild(li);
        document.getElementById('habit-name').value = '';
    }
}

// Navigation Functions
function navigateToLogin() {
    window.location.href = 'login.html';
}

function navigateToRegister() {
    window.location.href = 'signup.html';
}

// Utility Function: Display Habits (If persisted)
function displayHabits(habits) {
    habits.forEach((habit) => {
        const li = document.createElement('li');
        li.textContent = habit.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', () => li.remove());

        li.appendChild(removeButton);
        habitList.appendChild(li);
    });
}

// Placeholder for integration with backend (API Calls)
async function fetchHabits() {
    try {
        const response = await fetch('http://localhost:5000/api/habits', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`, // JWT token
            },
        });

        if (response.ok) {
            const data = await response.json();
            displayHabits(data.habits);
        } else {
            console.error('Failed to fetch habits');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function addHabitToServer(habitName) {
    try {
        const response = await fetch('http://localhost:5000/api/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ name: habitName }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Habit added:', data);
        } else {
            console.error('Failed to add habit');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call fetchHabits if user is authenticated
if (localStorage.getItem('token')) {
    fetchHabits();
}
