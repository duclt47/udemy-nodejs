const express = require('express');
const Task = require('./model/task');
const User = require('./model/user');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())


app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(err);
    }
})

app.get('/user/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).send("User not found");
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(err);
    }
})

app.post('/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks)
    } catch (error) {
        res.status(500).send(error);
    }
})

app.get('/task/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) return res.status(404).send("Task not found");
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(port, () => {
    console.log('App listen on port', port)
})
