const { Product } = require('../model/product');
const model = require('../model/task');

const Task = model.Task;

//Create Task
exports.createTask = (req,res)=>{
    const task = new Task(req.body);

    task.save()
    .then((doc) => {
        console.log({doc});
        res.status(201).json(doc)
        
    }).catch((err) => {
        console.log({err});
        req.status(500).json({error:err})
    });
}

//Read All Tasks
exports.getAllTasks = async (req,res)=>{
    const tasks = await Task.find({})
    console.log(tasks);
    res.status(200).json(tasks)
}

//Read specific Task
exports.getTask = async (req,res)=>{
    const task = await Task.find({title:req.params.name})
    res.json(task)

}

exports.replaceTask = async (req,res)=>{
    const title = req.params.name;
    try {
        const task = await Task.findOneAndReplace({title},req.body,{new:true}) 
        res.status(201).json(task)
    } catch (error) {
        res.status(400).json(error)
    }

}

exports.updateTask = async(req,res)=>{
    const title = req.params.name;
    const {statusTag} = req.body
    console.log(statusTag);
    if(statusTag === undefined){
      return res.status(400).json({error: 'statusTag Field is required'});
    }

    try {
        const task = await Task.findOneAndUpdate({title},req.body,{new:true}) 
        if(!task){
            return res.status(404).json({error: 'Task Not Found'})
        }
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({error: 'Internal Server Error'})
    }

}

exports.deleteTask = async (req,res)=>{
const title = req.params.name
try {
    const task = await Task.findOneAndDelete({title})
    res.status(200).json(task)
} catch (error) {
    res.status(400).json(error)
}
}