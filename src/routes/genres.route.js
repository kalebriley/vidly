const Joi = require('joi')
const express = require('express')

const router = express.Router()

let genres = [
    { id: 1, name: 'comedy' },
    { id: 2, name: 'horror' },
    { id: 3, name: 'romantic' }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const genre = [genres.find(g => g.id == parseInt(req.params.id))];
    res.send(
        genre.filter(e => {
            return e;
        })
    );
});

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

router.delete('/:id', (req, res) => {

    const existingGenre = genres.find(g => g.id == parseInt(req.params.id))
    if (existingGenre) {
        genres = genres.filter(g => g.id !== existingGenre.id)
        res.send(genres)
    } else {
        res.status(400).send({ error: `That genre does not exist` })
    }
});

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