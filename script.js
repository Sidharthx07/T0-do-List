const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');

function addTask() {
    const taskText = inputBox.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const task = {
        text: taskText,
        completed: false,
    };

    const taskElement = createTaskElement(task);
    listContainer.appendChild(taskElement);
    saveData();

    inputBox.value = '';
}

function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.text;

    if (task.completed) {
        li.classList.add('checked');
    }

    const span = document.createElement('span');
    span.textContent = '\u00d7'; // Close icon
    span.onclick = function () {
        li.remove();
        saveData();
    };

    li.appendChild(span);

    li.addEventListener('click', function () {
        li.classList.toggle('checked');
        saveData();
    });

    return li;
}

function saveData() {
    const tasks = [];
    const taskItems = listContainer.querySelectorAll('li');
    taskItems.forEach(item => {
        const task = {
            text: item.textContent.replace('\u00d7', '').trim(),
            completed: item.classList.contains('checked'),
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadData() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        listContainer.appendChild(taskElement);
    });
}

loadData();
