const Joi = require('joi')
const Mongoose = require('mongoose')
const Joigoose = require('joigoose')(Mongoose)

const joiMovieSchema = new Joi.object({
    title: Joi.string().min(3).max(255).required(),
    genres: Joi.array().items(Joi.string().meta({ type: 'ObjectId', ref: 'Genre' })).max(2).default([]),
    numberInStock: Joi.number().default(5).min(0).max(255),
    dailyRentalRate: Joi.number().default(0.0)
})
const mongooseMovieSchema = new Mongoose.Schema(Joigoose.convert(joiMovieSchema))
const Movie = Mongoose.model('Movie', mongooseMovieSchema)

function validateMovie(movie) {
    return Joi.validate(movie, joiMovieSchema)
}

module.exports.Movie = Movie
module.exports.validateMovie = validateMovie