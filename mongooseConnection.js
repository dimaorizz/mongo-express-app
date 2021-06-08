const dotenv = require('dotenv');
dotenv.config('./env');
const mongoose = require('mongoose');
const logger = require('./logger');

const connect = () => {
    mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
        }, (err) => {
        if(err) {
            logger.error(`MongoDB connection error: ${err}`);
        } else {
            logger.info('MongoDB connected')
        }
    });
    mongoose.connection.on('disconnect', connect);
    mongoose.connection.on('error', (err) => {
        logger.error(`MongoDB Error: ${err}`)
    });
};


module.exports = connect;
