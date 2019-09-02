const express = require('express');
const helmet = require('helmet')
const genres = require('./src/routes/genres.route')
const morgan = require('morgan')
const config = require('config')
const startupDebugger = require('debug')('app:startup')

// app init
const app = express();

// configure development middleware
if (app.get('env') === 'development') {
  startupDebugger(config.get('name'))
  app.use(morgan('tiny'))
  startupDebugger('Morgan enabled...')
}

// configure middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(helmet())

// configure routes
app.use(express.static('./src/public'))
app.use('/api/genres', genres)
startupDebugger('Routes configured...')

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  startupDebugger(`Listening on PORT: ${port}...`);
});
