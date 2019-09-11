const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const config = require('config')
const Mongoose = require('mongoose')
const startupDebugger = require('debug')('app:startup')
const routes = require('./src/routes')

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

// Connect to data base
const db = `mongodb+srv://${config.get('db.db_username')}:${config.get('db.db_password')}@cluster0-sspue.mongodb.net/main?retryWrites=true&w=majority`
Mongoose.connect(db, { useNewUrlParser: true })
  .then(() => startupDebugger('MongoDB connected...'))
  .catch(ex => startupDebugger('MongoDB failled to connect...'))

// configure view engine
app.set('view engine', 'pug')
app.set('views', './src/views')

// configure routes
app.use(express.static('./src/public'))
app.use('/api/genres', routes.genres)
app.use('/api/customers', routes.customers)
app.use('/api/movies', routes.movies)
app.use('/', routes.home)
startupDebugger('Routes configured...')

// start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  startupDebugger(`Listening on PORT: ${port}...`);
});
