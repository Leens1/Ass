const fs = require('fs')
const uuid = require('uuid')
const path = require('path');
const { status } = require('init');

function readFile() {
    const filePath = path.resolve(__dirname, '../Task.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading file:', error);
        return null;
    }
}

function writeFile(data) {
    fs.writeFileSync(`${__dirname}/../Task.json`, JSON.stringify(data), 'utf8')
}

const getAll = (req, res) => {
    try {
        res.status(200).json({task: readFile()})
    } catch(e) {
        res.status(500).json({ error: e })
    }
}

const getByStatus= (req, res) => {
    try {
        const allStatus = ["Completed", "Peading", "In progress"];
     
        let task = readFile()
       
        if (req.params.status in allStatus){
            const foundTasks = Object.values(task).filter(ta => ta.status === req.params.status)
        return res.status(200).json({'message': foundTasks});
    }return res.status(404).json({'message':`Task status  ${status} not found || non-existing resources`});
   
    } catch(e) {
        
       res.status(500).json({ error: e })
    }
}

const create_ta = (req, res) => {
    const data = req.body
    let task = readFile()
    const id = uuid.v4()
    if (task[id]) {
        return res.json({'message':`Task id ${id} is already exists`});
    }
    data['t_id'] = id 
    task[id] = data 
    writeFile(task) 
    res.status(201).json({'task':task[id]})
}

const update_ta = (req, res) => {
    const data = req.body
    const id = req.params.id
    let task = readFile()
    if (!task[id]) return res.status(404).json({'message':'not found'});
    data['t_id'] = id
    task [id] = data
    writeFile(task)
    res.status(200).json({'task':task[id]})
}

const remove_ta = (req, res) => {
    const t_id = req.params.id
    let task = readFile()
    if (task[id]) {
        return res.json({'message':`Task id ${id} is already exists`});
    }

    
    delete task[id];
    writeFile(task)
    res.json({'message':'task deleted successfully'})
}

module.exports = {
    getAll,
    getById,
    create_ta,
    update_ta,
    remove_ta
}