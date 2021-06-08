const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const jwt = require('jsonwebtoken');
const logger = require('../logger');

const isAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.sendStatus(403);
        }
        req.user = decoded.id;
        logger.info(`User authenticated successfuly`);
        next();
    });
};

module.exports = isAuth;