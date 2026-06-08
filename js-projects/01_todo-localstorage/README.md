# To-Do LocalStorage Project

## Project Overview
This is a simple To-Do List web app that stores task data in the browser's `localStorage`. The app allows users to:
- add new tasks
- mark tasks completed by clicking on them
- delete tasks using a delete button
- persist tasks across page reloads

The project includes three main files:
- `index.html` — page structure and app markup
- `styles.css` — dark-mode UI styling and layout
- `script.js` — task management logic and localStorage handling

---

## File-by-File Summary

### `index.html`
This file defines the HTML structure for the To-Do app.

Key elements:
- `<input id="todo-input">` — user text input for a new task
- `<button id="add-task-btn">` — button to add the task
- `<ul id="todo-list">` — container for the task list

Page flow:
1. User writes a task in the input box.
2. User clicks `Add Task`.
3. JavaScript creates a new task item and appends it to the list.

### `styles.css`
This file provides visual styling for the app, including:
- overall dark background and centered layout
- container card with box shadow and rounded corners
- input and button styling for a clean dark UI
- task item appearance and completed-state styling

Important CSS classes:
- `.container` — main app card
- `.input-container` — layout for input and button
- `li.completed` — line-through and reduced opacity for completed tasks

### `script.js`
This file contains all app logic.

Core responsibilities:
- load saved tasks from `localStorage`
- render tasks into the page
- add new tasks
- toggle completion status
- remove tasks
- save the updated task list back to `localStorage`


## JavaScript Details

### `DOMContentLoaded` event listener
The script waits for the DOM to be ready before using page elements.

What it does:
- finds `todoInput`, `addTaskButton`, and `todoList` by ID
- loads `tasks` from `localStorage`
- renders existing tasks
- attaches the click event to the add button

### Task data structure
Each task is stored as an object:
```js
{
  id: Date.now(),
  text: taskText,
  completed: false
}
```
- `id` — unique timestamp
- `text` — task content
- `completed` — boolean status

### `tasks` array
- Initialized from `localStorage` using `JSON.parse`
- Falls back to `[]` when no saved tasks exist
- Updated when tasks are added, completed, or deleted

### `renderTask(task)`
This function creates a new `<li>` element for a task and adds it to the DOM.

Steps inside `renderTask`:
1. Create `li` and set `data-id`
2. Add `.completed` class if needed
3. Set the item HTML with task text and a delete button
4. Attach a click event for toggling completion
5. Attach a click event for deleting the task
6. Append the `li` to `todoList`

Note: there is a bug in the delete logic:
```js
tasks = tasks.filter((t) => t.id === task.id);
```
This line should remove the task, but it currently keeps only the clicked task.
The correct version is:
```js
tasks = tasks.filter((t) => t.id !== task.id);
```

### `saveTasks()`
This function saves the current `tasks` array to browser storage:
```js
localStorage.setItem("tasks", JSON.stringify(tasks));
```
It runs after any change to tasks:
- after adding a task
- after toggling completion
- after deleting a task

### Add Task button listener
The button click handler does:
- read trimmed input text
- ignore empty strings
- create a new task object
- push it into `tasks`
- save tasks to `localStorage`
- render the new task immediately
- clear the input field
- log `tasks` to the console

---

## Behavior & User Flow
1. Page loads
2. Tasks are retrieved from `localStorage`
3. Each saved task is rendered
4. User adds a task
5. New task appears immediately
6. User clicks a task to toggle completed state
7. User clicks delete to remove a task
8. Changes are persisted automatically

---

## Recommended Improvements
1. Fix the delete function bug:
   - change `===` to `!==`
2. Add task validation messages for empty input
3. Add a "Clear completed" button
4. Add task editing support
5. Add category or priority labels
6. Add filter buttons: All / Active / Completed
7. Add a mobile-friendly responsive layout
8. Replace `Date.now()` with a UUID generator if collision concerns exist

---

## Mind Map for Building / Modifying the Project

```
To-Do LocalStorage Project
├── HTML
│   ├── Input
│   │   ├── todo-input
│   │   └── placeholder text
│   ├── Button
│   │   └── add-task-btn
│   ├── Task list
│   │   └── todo-list
│   └── App structure
│       └── container + title
├── CSS
│   ├── Dark theme
│   ├── Layout
│   │   ├── centered page
│   │   ├── input row
│   │   └── task cards
│   ├── Button styles
│   ├── Completed state
│   └── Hover effects
├── JavaScript
│   ├── Data storage
│   │   ├── localStorage
│   │   ├── JSON.parse
│   │   └── JSON.stringify
│   ├── Task model
│   │   ├── id
│   │   ├── text
│   │   └── completed
│   ├── Initialization
│   │   ├── DOMContentLoaded
│   │   ├── load tasks
│   │   └── render tasks
│   ├── Add task
│   │   ├── button click
│   │   ├── trim input
│   │   ├── create object
│   │   └── save + render
│   ├── Render task
│   │   ├── create li
│   │   ├── apply completed class
│   │   ├── attach toggle listener
│   │   ├── attach delete listener
│   │   └── append to list
│   ├── Toggle complete
│   │   ├── update task.completed
│   │   ├── toggle class
│   │   └── save tasks
│   ├── Delete task
│   │   ├── filter tasks
│   │   ├── remove li
│   │   └── save tasks
│   └── Save tasks
│       └── localStorage write
└── Enhancements
    ├── Fix bugs
    ├── Add filters
    ├── Add edit mode
    ├── Add task categories
    ├── Add themes
    └── Add mobile support
```

---

## How to Use This File
- Read the feature summary to understand current app behavior.
- Use the JavaScript section to locate functions and logic fast.
- Use the mind map when planning changes or expanding the app.
- Start with the recommended improvements to make the project stable and more powerful.
