const Joi = require('joi')
const Mongoose = require('mongoose')
const Joigoose = require('joigoose')(Mongoose)
const express = require('express')
const router = express.Router()

// Define model
const joiGenreSchema = Joi.object({
    name: Joi.string().min(3).required()
})
const mongooseGenreSchema = new Mongoose.Schema(Joigoose.convert(joiGenreSchema))
const Genre = Mongoose.model('Genre', mongooseGenreSchema)

// @route  GET /api/genres
// @desc   Get all genres
// @access Public
router.get('/', async (req, res) => {
    try {
        let genres = await Genre.find().sort('name')
        res.send(genres);
    }
    catch (ex) {
        res.status(400).send({ error: ex.message })
    }
});

// @route  GET /api/genres/:id
// @desc   Get genre with id
// @access Public
router.get('/:id', async (req, res, next) => {
    try {
        const genre = await Genre.findById(req.params.id)
        res.send(genre)
    }
    catch (ex) {
        res.status(400).send({ error: `Genre with ID: ${req.params.id} does not exist` })
    }
});

// @route  POST /api/genres
// @desc   Create a genere with name
// @access Public
router.post('/', async (req, res, next) => {
    let { error } = validateGenre(req.body)

    if (error) {
        res.status(400).send({ error: error.details[0].message })
    }
    //else if (genreExists(req.body))
    //  res.status(400).send({ error: `Genre with that name already exists` })
    else {
        try {
            const newGenre = new Genre(req.body)
            const savedGenre = await newGenre.save()
            res.send(savedGenre)
        }
        catch (ex) {
            res.status(400).send({ error: ex.message })
        }
    }
});

// @route  PUT /api/genres
// @desc   Update genre with id
// @access Public
router.put('/:id', async (req, res, next) => {
    let { error } = validateGenre(req.body)

    if (error) {
        res.status(400).send({ error: error.details[0].message })
    }

    const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name.toLowerCase(),
        }
    }, { new: true })

    if (updatedGenre) {
        res.send(updatedGenre)
    } else {
        res.status(400).send({ error: `That genre does not exist` })
    }
});

// @route  DELETE /api/genres/:id
// @desc   Delete genre with id
// @access Public
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedGenre = await Genre.findByIdAndRemove(req.params.id)
        res.send(deletedGenre)
    }
    catch (ex) {
        res.status(400).send({ error: `That genre does not exist` })
    }
});

// @desc validates a req.body against the joi schema
function validateGenre(genre) {
    return Joi.validate(genre, joiGenreSchema);
}

// @desc checks if genre exists
async function genreExists(genre) {
    return await Genre.find({ name: genre.name })
}

// @desc convenience func for populating db
// async function populateDB() {
//     const romanceGenre = new Genre({
//         name: 'romance'
//     })

//     const horrorGenre = new Genre({
//         name: 'horror'
//     })

//     const animationGenre = new Genre({
//         name: 'animation'
//     })

//     try {
//         await romanceGenre.save()
//         await horrorGenre.save()
//         await animationGenre.save()
//         console.log('genres saved')
//     }
//     catch (ex) {
//         console.log(ex.message)
//     }
// }

module.exports = router