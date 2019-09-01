const express = require('express');
const Joi = require('joi');

// app init
const app = express();

// Middleware
app.use(express.json());

let genres = [
  { id: 1, name: 'comedy' },
  { id: 2, name: 'horror' },
  { id: 3, name: 'romantic' }
];

app.get('/api/genres', (req, res) => {
  res.send(genres);
});

app.get('/api/genres/:id', (req, res) => {
  const genre = [genres.find(g => g.id == parseInt(req.params.id))];
  res.send(
    genre.filter(e => {
      return e;
    })
  );
});

app.post('/api/genres', (req, res) => {
  let { error } = validateGenre(req.body);

  if (error) {
    res.send(
      error.details.map(e => {
        e.message;
      })
    );
  }

  let existingGenre = genres.find(
    c => c.name.toLowerCase() == req.body.name.toLowerCase()
  );

  if (genre) {
    res.status(400).send({ error: 'Genere already exist' });
  } else {
    genres.push(req.body);
    res.send(genre);
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

const port = process.env.PORT || 8080;
app.listen(8080, () => {
  console.log(`Listening on PORT: ${port}...`);
});
