const dotenv = require('dotenv');
dotenv.config({path: '../.env'});
const logger = require('../logger');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/User');
const isAuth = require('../middlewares/isAuth');

//GET: localhost:3000/auth
router.get('/', isAuth, async (req, res) => {
    res.sendStatus(200);
});

//POST: localhost:3000/auth
router.post('/', async (req, res) => {
    const userAuthData = {...req.body}; // {username: String, password: String}
    let user;
    try {
        user = await User.findOne({ username: userAuthData.username, password: userAuthData.password });
    } catch (err) {
        logger.error(`POST: /auth: ${err}`);
        return res.sendStatus(500);
    }
    if(!user) {
        return res.sendStatus(404);
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' });
    logger.info(`Token Created: ${token}`);
    return res.status(200).send({ user, token });
});

module.exports = router;