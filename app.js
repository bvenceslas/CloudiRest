const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.port || 5000;

app.listen(port, () => console.log('server running on port: ', port));