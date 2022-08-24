require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 8800;
const mongoose = require('mongoose');
const useRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const conversation = require('./routes/conversation');
const message = require('./routes/message');

const app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/login', authRoutes);
app.use('/user', useRoutes);
app.use('/conversation', conversation);
app.use('/message', message);

//Connect to db
mongoose.connect('mongodb://127.0.0.1:27017/chatsapp')
    .then(() => {
        //Listen for requests
        app.listen(port, (req, res) => {
            console.log('Listen on port ' + port);
        });
        console.log('Connect successfully!');
    })
    .catch(err => {
        console.log(err);
    })


