const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const router = require('../backend/routes/todo.Route');
const app = express();

app.use(express.json());
app.use(cors());
console.log('Connecting to Database.....');
mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Connected to mongodb database successfully.')
}).catch((error)=>{
    console.log(error);
})

app.use('/',router);

module.exports = app;