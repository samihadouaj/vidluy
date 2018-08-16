const mongoose = require('mongoose');
const genreDb = require('./genreDb');
const Movie = mongoose.model('Movie', mongoose.Schema({
    title: String,
    genre: genreDb.genreSchema, 
    numberInStock: Number,
    dailyRentalRate: Number
}))

const db = {
        addMovie: async function (movi) {
            let movie = new Movie(movi);
            movie = await movie.save();
            return movie
        },
        
        showMovies: async function() {
            let movies = Movie.find()
            return movies;
        }   
}

module.exports = db;