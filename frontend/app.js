const guestForm = document.getElementById('guest-form');
const habitList = document.getElementById('habit-list');

// Add Habit Function
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
