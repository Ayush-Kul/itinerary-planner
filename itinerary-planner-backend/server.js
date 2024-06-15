const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb+srv://1032211870:dpzhpAXhpsKcz3ly@itinerary-planner.1ayzh2g.mongodb.net/?retryWrites=true&w=majority&appName=itinerary-planner';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const TaskSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: 'Task deleted' });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
