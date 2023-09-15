// Variables
const btnInput = document.querySelector('#submit');
const inputEl = document.querySelector('#input');
const taskList = document.querySelector('#list');
const filterEl = document.querySelector('.main__form-filter');
const btnClear = document.querySelector('.main__clear');

// Get tasks from local storage

function getTasksFromStorage() {
	const tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => addTaskToDOM(task));
	show();
}

// Function to add tasks to DOM

function addTask(e) {
	e.preventDefault();
	const newTask = inputEl.value;

	if (newTask === '') {
		alert('Please enter a task');
		return;
	}

	addTaskToDOM(newTask);

	addTaskToStorage(newTask);

	show();

	inputEl.value = '';
}

function addTaskToDOM(task) {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(task));
	li.className = 'main__list-item';

	const button = createButton('main_btn-remove');
	li.appendChild(button);

	taskList.appendChild(li);
}

function addTaskToStorage(task) {
	let tasksInStorage;

	if (localStorage.getItem('tasks') === null) {
		tasksInStorage = [];
	} else {
		tasksInStorage = JSON.parse(localStorage.getItem('tasks'));
	}

	tasksInStorage.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasksInStorage));
}

// Create new task element

function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	const icon = createIcon('fa-regular fa-circle-xmark');
	button.appendChild(icon);
	return button;
}

function createIcon(classes) {
	const i = document.createElement('i');
	i.className = classes;
	return i;
}

// Function to clear all tasks

function clearAll() {
	if (confirm('Are you sure you want to delete all tasks&')) {
		while (taskList.firstChild) {
			taskList.firstChild.remove();
		}
		localStorage.clear('tasks');
	}
	show();
}

// Function to remove task

function removeTask(e) {
	if (e.target.parentElement.classList.contains('main_btn-remove')) {
		e.target.parentElement.parentElement.remove();
	}

	show();
}

// Function to filter tasks

function filterTasks(e) {
	const tasks = document.querySelectorAll('li');
	const text = e.target.value.toLowerCase();

	tasks.forEach((task) => {
		const taskName = task.firstChild.textContent.toLowerCase();
		if (taskName.indexOf(text) != -1) {
			task.style.display = 'flex';
		} else {
			task.style.display = 'none';
		}
	});
}

// Function to show filter and clear all button

function show() {
	if (!taskList.firstElementChild) {
		filterEl.style.display = 'none';
		btnClear.style.display = 'none';
	} else {
		filterEl.style.display = 'block';
		btnClear.style.display = 'block';
	}
}

//  Event Listeners

const init = () => {
	btnInput.addEventListener('click', addTask);
	document.addEventListener('DOMContentLoaded', show);
	btnClear.addEventListener('click', clearAll);
	taskList.addEventListener('click', removeTask);
	filterEl.addEventListener('input', filterTasks);
	document.addEventListener('DOMContentLoaded', getTasksFromStorage);
};

init();
