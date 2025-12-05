// Select Dom Element
const input = document.getElementById('todo-input')
const addbtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

// Try To Load Saved Todos From Local Strorage(if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function Savetodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function createToDoNode(todo, index) {
    const li = document.createElement('li');


    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';


    checkbox.checked = !!todo.completed;


    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        Savetodos();
        render(); // 
    });

    // text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';

    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    textSpan.addEventListener("dblclick", () => {

        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            Savetodos();
            render();
        }
    });

    // Delete ToDo Button
    const delBtn = document.createElement('button');
    delBtn.textContent = "Delete";
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        Savetodos();
        render();
    });


    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);

    return li;
}

// render The Whole Todolist From Todos array
function render() {
    list.innerHTML = '';


    todos.forEach((todo, index) => {
        const node = createToDoNode(todo, index);
        list.appendChild(node);
    });
}

function addToDo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text, completed: false });
    input.value = '';
    Savetodos();
    render();
}

addbtn.addEventListener("click", addToDo);
render();
