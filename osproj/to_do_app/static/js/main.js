// Function to fetch and display tasks from the backend
function fetchTasks() {
    fetch('/tasks')
        .then(response => response.json())
        .then(tasks => {
            const tasksContainer = document.getElementById('tasksContainer');
            tasksContainer.innerHTML = '<h2>Tasks</h2>'; // Reset tasks section

            tasks.forEach((task, index) => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `
                    <span>${task}</span>
                    <button onclick="deleteTask(${index})">Delete</button>
                `;
                tasksContainer.appendChild(taskDiv);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

// Function to handle adding a new task
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskInput = document.getElementById('taskInput').value;
    const errorMessage = document.getElementById('errorMessage');

    // Validate the task input
    if (!taskInput) {
        errorMessage.textContent = 'Task content is required.';
        return;
    }

    // Clear the error message
    errorMessage.textContent = '';

    // Send POST request to the backend to add the task
    fetch('/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: taskInput
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Task added') {
            // Reset the form and fetch updated tasks
            document.getElementById('taskForm').reset();
            fetchTasks();
        } else {
            errorMessage.textContent = data.error || 'An error occurred';
        }
    })
    .catch(error => console.error('Error adding task:', error));
});

// Function to delete a task
function deleteTask(index) {
    fetch(`/tasks/${index}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Task deleted') {
            fetchTasks(); // Refresh tasks after deletion
        } else {
            console.error('Error deleting task:', data.error);
        }
    })
    .catch(error => console.error('Error deleting task:', error));
}

// Fetch tasks when the page loads
window.onload = fetchTasks;
