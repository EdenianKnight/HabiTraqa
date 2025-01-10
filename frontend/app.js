const guestForm = document.getElementById('guest-form');
const habitList = document.getElementById('habit-list');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const userSection = document.getElementById('user-section');
const guestMode = document.getElementById('guest-mode');
const logoutBtn = document.getElementById('logout-btn');
const habitForm = document.getElementById('habit-form');
const userHabitList = document.getElementById('user-habit-list');

let token = null;

// Add Habit for Guest
guestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const habitName = document.getElementById('habit-name').value;
    if (habitName.trim()) {
        const li = document.createElement('li');
        li.textContent = habitName;
        habitList.appendChild(li);
        document.getElementById('habit-name').value = '';
    }
});

// Show Login/Register Form (Mock)
loginBtn.addEventListener('click', () => {
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    loginUser(email, password);
});

registerBtn.addEventListener('click', () => {
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    const password = prompt('Enter your password:');
    registerUser(name, email, password);
});

// Logout User
logoutBtn.addEventListener('click', () => {
    token = null;
    userSection.style.display = 'none';
    guestMode.style.display = 'block';
});

// Add Habit for Authenticated User
habitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const habitName = document.getElementById('auth-habit-name').value;

    if (habitName.trim()) {
        addHabit(habitName);
        document.getElementById('auth-habit-name').value = '';
    }
});

// Backend Communication
const registerUser = async (name, email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        alert('Registration Successful');
    } catch (error) {
        alert('Registration Failed');
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        token = data.token;
        loadHabits();
        guestMode.style.display = 'none';
        userSection.style.display = 'block';
    } catch (error) {
        alert('Login Failed');
    }
};

const loadHabits = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/habits', {
            headers: { Authorization: `Bearer ${token}` },
        });
        const habits = await response.json();
        userHabitList.innerHTML = '';
        habits.forEach((habit) => {
            const li = document.createElement('li');
            li.textContent = habit.name;
            userHabitList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading habits:', error);
    }
};

const addHabit = async (name) => {
    try {
        const response = await fetch('http://localhost:5000/api/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });
        const newHabit = await response.json();
        const li = document.createElement('li');
        li.textContent = newHabit.name;
        userHabitList.appendChild(li);
    } catch (error) {
        console.error('Error adding habit:', error);
    }
};
