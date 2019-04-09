const express = require('express');
const router = express.Router();
const Task= require('../models/task');

router.get('/', async(req,resp)=>{
    const tasks = await Task.find();
    resp.json(tasks);
});

router.get('/:id', async(req,resp)=>{
    const tasks = await Task.findById(req.params.id);
    resp.json(tasks);
});

router.post('/', async(req,resp)=>{
const { title, description } = req.body;
const task= new Task({title,description});
await task.save();
resp.json({status: 'Task Saved'});
});

router.put('/:id', async(req, resp)=>{
    const {title,description} = req.body;
    const newTask= {title,description};
    await Task.findByIdAndUpdate(req.params.id,newTask);
    resp.json({status: 'Task Updated'});
});

router.delete('/:id', async(req,resp)=>{
await Task.findByIdAndRemove(req.params.id);
resp.json({status:'Task Deleted'});
});


module.exports= router;