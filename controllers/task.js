const fs = require('fs')
const uuid = require('uuid')
const path = require('path');

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

const getById =  (req, res) => {
    try {
        const id = req.params.id
      
        const task = readFile()[id]
       
        if (!task) return res.status(404).json({'message':`Task id ${id} not found`});
        res.status(200).json({tast:task})
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
    if (!task[t_id]) return res.status(404).json({'message':'not found'});
    data['t_id'] = id
    task [id] = data
    writeFile(task)
    res.status(200).json({'task':task[id]})
}

const remove_ta = (req, res) => {
    const t_id = req.params.id
    let task = readFile()
 
    if (!task[t_id]) {
        return res.json({'message':`Task id ${t_id} not found`});
    }    
    delete task[t_id];
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