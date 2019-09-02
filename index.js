const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const startupDebugger = require('debug')('app:startup')
const genres = require('./src/routes/genres.route')
const home = require('./src/routes/home.route')

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

// configure view engine
app.set('view engine', 'pug')
app.set('views', './src/views')

// configure routes
app.use(express.static('./src/public'))
app.use('/api/genres', genres)
app.use('/', home)
startupDebugger('Routes configured...')

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  startupDebugger(`Listening on PORT: ${port}...`);
});
