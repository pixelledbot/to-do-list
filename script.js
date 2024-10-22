document.getElementById('addButton').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
document.getElementById('clearCompletedButton').addEventListener('click', clearCompleted);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', deleteTask);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Complete';
    toggleButton.addEventListener('click', toggleComplete);

    li.appendChild(toggleButton);
    li.appendChild(deleteButton);
    document.getElementById('taskList').appendChild(li);

    taskInput.value = '';
    saveTasks();  // Save tasks after adding a new one
}

function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskItem.remove();
    saveTasks();  // Save tasks after deletion
}

function toggleComplete(event) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('completed');
    saveTasks();  // Save tasks after toggling completion
}

function clearCompleted() {
    const tasks = document.querySelectorAll('#taskList li.completed');
    tasks.forEach(task => task.remove());
    saveTasks();  // Save tasks after clearing completed ones
}

function saveTasks() {
    const tasks = [];
    const taskListItems = document.querySelectorAll('#taskList li');
    taskListItems.forEach(task => {
        tasks.push({
            text: task.firstChild.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskCount();  // Update task count
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', deleteTask);

        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Complete';
        toggleButton.addEventListener('click', toggleComplete);

        li.appendChild(toggleButton);
        li.appendChild(deleteButton);
        document.getElementById('taskList').appendChild(li);
    });
    updateTaskCount();  // Update task count
}

function updateTaskCount() {
    const taskCount = document.querySelectorAll('#taskList li').length;
    document.getElementById('taskCount').textContent = `Tasks remaining: ${taskCount}`;
}

// Load tasks on page load
loadTasks();
