async function fetchTodos() {
    const res = await fetch('/api/todos');
    const todos = await res.json();
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML =`
        <span style = "text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.title}</span>
        <button onclick="toggleTodo(${todo.id})">✔</button>
        <button onclick="deleteTodo(${todo.id})">❌</button>
        `;
        list.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById('todoInput');
    const title = input.value;
    if (!title) return alert("Enter a task!");
    await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    input.value = '';
    fetchTodos();
}

async function toggleTodo(id) {
    const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT'
    });

    if (res.ok) {
        fetchTodos();
    } else {
        alert('Failed to toggle');
    }
}

async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    fetchTodos();
}

fetchTodos();