const express = require('express');
const Joi = require('joi');
const genres = require('./src/routes/genres.route')

// app init
const app = express();

// Middleware
app.use(express.json());
app.use('/api/genres', genres)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT: ${port}...`);
});
