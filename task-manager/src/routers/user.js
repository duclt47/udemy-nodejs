const express = require('express');
const User = require('../model/user');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = new express.Router();
const upload = multer({
    // dest: 'images/avatars',
    limits: {
        fileSize: 1024 * 1000
    },
    fileFilter(request, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('please upload image'))
        }
        cb(undefined, true)
    }
})


router.post('/users', async (req, res) => {
    try {
        const user = await new User(req.body);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/me/avatar',auth ,upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg');
        res.send(user.avatar)
    } catch (error) {
        
    }
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar',auth ,upload.single('avatar'), async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.post('/users/login' ,async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/logout',auth ,async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/logoutAll',auth ,async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.status(200).send();
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/users',auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})


router.patch('/users/me',auth ,async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const user = req.user;
        if (!user) return res.status(400).send({error: 'Cannot find user!'});

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user)
    } catch (error) {
        res.status(500).send({error: 'Something went wrong!'});
    }
})

router.get('/users',auth, async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.get('/users/me',auth ,async (req, res) => {
    console.log(req.user)
    res.send(req.user)
})

router.delete('/users/me',auth ,async (req, res) => {
    try {
        const user = req.user;
        // const user = await User.findByIdAndDelete(_id);
        if (!user) return res.status(404).send("User not found");
        user.remove()
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router