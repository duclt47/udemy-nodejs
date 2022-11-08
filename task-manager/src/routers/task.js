const express = require('express');
const Task = require('../model/task');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks',auth ,async (req, res) => {
    try {
        const task = new Task({...req.body, owner: req.user._id})
        // const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);p
    }
})

router.get('/tasks',auth ,async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: req.query.limit ? parseInt(req.query.limit) : '',
                skip: req.query.skip ? parseInt(req.query.skip) : 0,
                sort
            }
        })
        res.send(req.user.tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/tasks/:id',auth ,async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({_id, owner: req.user._id});
        if (!task) return res.status(404).send();
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error);
    }
})

router.patch('/task/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        if (!task) return res.status(400).send({error: 'Cannot find task!'});

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();
        res.send(task)
    } catch (error) {
        res.status(500).send({error: 'Something went wrong!'});
    }
})

router.delete('/task/:id',auth ,async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({_id, owner: req.user._id});
        if (!task) return res.status(404).send("Task not found");
        res.status(200).send(task)
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router