// Variables
const btnInput = document.querySelector('#submit');
const inputEl = document.querySelector('#input');
const taskList = document.querySelector('#list');
const filterEl = document.querySelector('.main__form-filter');
const btnClear = document.querySelector('.main__clear');
let isEditMode = false;

// Function to display tasks from local storage

function displayTasks() {
	const tasksInStorage = getTasksFromStorage();

	tasksInStorage.forEach((task) => addTaskToDOM(task));

	show();
}

// Get tasks from local storage

function getTasksFromStorage() {
	let tasksInStorage;

	if (localStorage.getItem('tasks') === null) {
		tasksInStorage = [];
	} else {
		tasksInStorage = JSON.parse(localStorage.getItem('tasks'));
	}

	show();

	return tasksInStorage;
}

// Function to add tasks to DOM and Local Storage

function addTask(e) {
	e.preventDefault();
	const newTask = inputEl.value;

	if (newTask === '') {
		alert('Please enter a task');
		return;
	}

	if (isEditMode) {
		const taskToEdit = taskList.querySelector('.edit-mode');
		removeTaskFromStorage(taskToEdit.textContent);
		taskToEdit.classList.remove('edit-mode');
		taskToEdit.remove();

		isEditMode = false;
	} else if (checkIfTaskExists(newTask)) {
		alert('Task already exists!');
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
	const tasksInStorage = getTasksFromStorage();

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
			// Clear from DOM
			taskList.firstChild.remove();
		}
		// Clear from local storage
		localStorage.clear('tasks');
	}
	show();
}

// Check if task already exists

const checkIfTaskExists = (task) => {
	const tasksFromStorage = getTasksFromStorage();
	return tasksFromStorage.includes(task);
};

// Function to remove task from DOM and Local Storage

function onClickTask(e) {
	if (e.target.parentElement.classList.contains('main_btn-remove')) {
		removeTask(e.target.parentElement.parentElement);
	} else {
		setTaskToEdit(e.target);
	}
}

//  Edit task
function setTaskToEdit(task) {
	isEditMode = true;

	taskList
		.querySelectorAll('li')
		.forEach((t) => t.classList.remove('edit-mode'));

	task.classList.add('edit-mode');
	btnInput.textContent = 'Update';
	btnInput.style.backgroundColor = 'green';
	inputEl.value = task.textContent;
}

// Function to remove task from DOM

function removeTask(task) {
	task.remove();

	removeTaskFromStorage(task.textContent);

	show();
}

// Function to remove task fro local storage

function removeTaskFromStorage(task) {
	let tasksFromStorage = getTasksFromStorage();

	tasksFromStorage = tasksFromStorage.filter((t) => t !== task);

	localStorage.setItem('tasks', JSON.stringify(tasksFromStorage));
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

	btnInput.textContent = 'Submit';
	btnInput.style.backgroundColor = '#e92626';

	isEditMode = false;
}

//  Event Listeners

const init = () => {
	btnInput.addEventListener('click', addTask);
	btnClear.addEventListener('click', clearAll);
	taskList.addEventListener('click', onClickTask);
	filterEl.addEventListener('input', filterTasks);
	document.addEventListener('DOMContentLoaded', displayTasks);

	show();
};

init();
