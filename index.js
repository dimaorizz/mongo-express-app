const dotenv = require('dotenv');
dotenv.config();
const logger = require('./logger');
const mongooseConnection = require('./mongooseConnection');
const express = require('express');


const UsersRouter = require('./routes/users');
const AuthRouter = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const app = express();

mongooseConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/users', UsersRouter);
app.use('/auth', AuthRouter);

app.listen(PORT, () => {
    logger.info(`Server is running on port: ${PORT}`);
});