const express = require('express');
const logger = require('../logger');
const User = require('../models/User');
const isAuth = require('../middlewares/isAuth');

const router = express.Router();

// GET: localhost:3000/users
router.get('/', isAuth, async (req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (err) {
        logger.error(`GET: /users: ${err}`)
        res.sendStatus(500);
    }
    res.status(200).send(users);
    }
);

//POST: localhost:3000/users
router.post('/', isAuth, async (req, res) => {
    let newUser;
    try {
        newUser = new User({...req.body});
        await newUser.save();
    } catch (err) {
        logger.error(`POST: /users ${err}`);
        return res.sendStatus(500);        
    }
    res.status(200).send(newUser);
});

//PATCH: localhost:3000/users/:username
router.patch('/:username', isAuth, async (req, res) => {
    const usernameToEdit = req.params.username;
    const newUserData = {...req.body};
    try {
        const newUser = await User.findOneAndUpdate({ username: usernameToEdit }, { ...newUserData });
        res.status(200).send(newUser);
    } catch (error) {
        logger.error(`PATCH: /users:username: ${err}`);
        res.sendStatus(500);
    }
});

//DELETE: localhost:3000/users/:username
router.delete('/:username', isAuth, async (req, res) => {
    const usernameToDelete = req.params.username;
    try {
        const deletedUser = await User.findOneAndDelete({ username: usernameToDelete });
        res.status(200).send(deletedUser);
    } catch (err) {
        logger.error(`DELETE: /users/:username`);
        res.sendStatus(500);
    }
});

module.exports = router;