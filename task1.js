const express = require('express')
const task1 = express()

task1.use(express.json())


const task_route = require('./routes/task')

task1.use('/task',task_route)



    task1.listen(3100, console.log('listening on port 3100'))


    