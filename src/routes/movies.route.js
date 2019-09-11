const { Movie, validateMovie } = require('../models/movie.model')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        let movies = await Movie.find()
            .populate('genres', 'name -_id')
            .sort({ name: 1 })
        res.send(movies)
    }
    catch (ex) {
        res.send({ error: ex.message })
    }
    finally {
        next()
    }
})

router.post('/', async (req, res, next) => {
    let { error } = validateMovie(req.body)

    if (error) {
        res.status(400).send({ error: error.details[0].message })
    }
    //else if (genreExists(req.body))
    //  res.status(400).send({ error: `Genre with that name already exists` })
    else {
        try {
            const newMovie = new Movie(req.body)
            const savedMovie = await newMovie.save()
            res.send(savedMovie)
        }
        catch (ex) {
            res.status(400).send({ error: ex.message })
        }
    }
});

module.exports = router