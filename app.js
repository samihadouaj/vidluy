const express = require('express');
const mongoose = require('mongoose');
const body_parser = require('body-parser');
const genre  = require('./routes/genre')
const customer  = require('./routes/customer')
const movie  = require('./routes/movie')
const app = express();
app.use(body_parser.json());

app.use('/api/genre', genre)
app.use('/api/customer', customer)
app.use('/api/movie', movie)

mongoose.connect('mongodb://localhost:27017/genre', {useNewUrlParser: true})
.then(() => console.log('Connected...'))
.catch((err) => console.log(err.message));

const port = process.env.PORT||3000;
app.listen(port,(() => console.log(`listening on port ${port} `)));