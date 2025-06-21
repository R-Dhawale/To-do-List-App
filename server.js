const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

const todos = [];

app.get('/api/todos',(req, res) => {
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const {title} = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required.'});
    const newTodo = { id: Date.now(), title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo); 
});

app.put('/api/todos/:id', (req, res) => {
    console.log('PUT /api/todos/:id route hit');

    const id = parseInt(req.params.id);
    console.log('ID received:', id);

    const todo = todos.find(t => t.id === id);
    if (!todo) {
        console.log('Todo not found');
        return res.status(404).json({ error: 'Todo not found' });
    }

    todo.completed = !todo.completed;
    console.log('Updated todo:', todo);
    res.json(todo);
});


app.delete('/api/todos/:id', (req, res) => {
    console.log('DELETE called with id:', req.params.id);
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        console.log('Todo not found');
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    console.log('Deleted todo at index:', index);
    res.json({ message: 'Deleted' });
});

const PORT = 3000;

app.listen(PORT , () => console.log(`Server running on http://localhost:${PORT}`));