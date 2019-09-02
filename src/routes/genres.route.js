const Joi = require('joi')
const express = require('express')

const router = express.Router()

let genres = [
    { id: 1, name: 'comedy' },
    { id: 2, name: 'horror' },
    { id: 3, name: 'romantic' }
];

// @route  GET /api/genres
// @desc   Get all genres
// @access Public
router.get('/', (req, res) => {
    res.send(genres);
});

// @route  GET /api/genres/:id
// @desc   Get genre with id
// @access Public
router.get('/:id', (req, res) => {
    const genre = [genres.find(g => g.id == parseInt(req.params.id))];
    res.send(
        genre.filter(e => {
            return e;
        })
    );
});

// @route  POST /api/genres
// @desc   Create a genere with name
// @access Public
router.post('/', (req, res) => {
    let { error } = validateGenre(req.body)

    if (error) {
        res.status(400).send({ error: error.details[0].message })
    } else if (genreExists(req.body))
        res.status(400).send({ error: `Genre with that name already exists` })
    else {
        const newGenre = { id: genres.length + 1, name: req.body.name.toLowerCase() }
        genres.push(newGenre)
        res.send(newGenre)
    }
});

// @route  PUT /api/genres
// @desc   Update genre with id
// @access Public
router.put('/:id', (req, res) => {
    let { error } = validateGenre(req.body)

    if (error) {
        res.status(400).send({ error: error.details[0].message })
    }

    const existingGenre = genres.find(g => g.id == parseInt(req.params.id))
    if (existingGenre) {
        existingGenre.name = req.body.name.toLowerCase()
        res.send(existingGenre)
    } else {
        res.status(400).send({ error: `That genre does not exist` })
    }
});

// @route  DELETE /api/genres/:id
// @desc   Delete genre with id
// @access Public
router.delete('/:id', (req, res) => {
    const existingGenre = genres.find(g => g.id == parseInt(req.params.id))

    if (existingGenre) {
        genres = genres.filter(g => g.id !== existingGenre.id)
        res.send(genres)
    } else {
        res.status(400).send({ error: `That genre does not exist` })
    }
});

// @desc validates a req.body against the joi schema
function validateGenre(genre) {
    const schema = {
        name: Joi.string()
            .min(3)
            .required()
    };

    return Joi.validate(genre, schema);
}

function genreExists(genre) {
    return genres.find(g => g.name == genre.name.toLowerCase())
}

module.exports = router