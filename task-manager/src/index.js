const express = require('express');
const User = require('./model/user');
require('./db/mongoose');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())


app.post('/users', (req, res) => {
    console.log(req.body)
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    })
    .catch((err) => res.status(400).send(err))
})

app.listen(port, () => {
    console.log('App listen on port', port)
})
