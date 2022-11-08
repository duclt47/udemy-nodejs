const express = require('express');
const UserRoute = require('./routers/user');
const TaskRoute = require('./routers/task');
const Task = require('./model/task');
const User = require('./model/user');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;


app.use(express.json())
app.use(UserRoute);
app.use(TaskRoute);

app.listen(port, () => {
    console.log('App listen on port', port)
})

main = async () => {
    // const task = await Task.findById('6356b3ec7c67cd972a092cb2');
    // await task.populate('owner');
    // console.log(task)

    // const user = await User.findById('6353b20514e04012a198bda5');
    // await user.populate('tasks')

    // console.log(user.tasks)
}

main();