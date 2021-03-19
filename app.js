const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.port || 5000;

// mongodb connect
mongoose.connect(process.env.DB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('connected to mongodb'));

// middleares
app.use(express.json());


app.listen(port, () => console.log('server running on port: ', port));