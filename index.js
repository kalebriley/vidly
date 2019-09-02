const express = require('express');
const Joi = require('joi');
const helmet = require('helmet')
const genres = require('./src/routes/genres.route')

// app init
const app = express();

// configure middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(helmet())

// configure routes
app.use(express.static('./src/public'))
app.use('/api/genres', genres)

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on PORT: ${port}...`);
});
