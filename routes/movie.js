const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const db = require('./movieDb');

router.post('/', async (req, res) => {
      const movie = await db.addMovie(req.body);
      res.send(movie);
})

router.get('/', async(req, res) => {
    const movies = await db.showMovies();
    res.send(movies);
})
module.exports = router;