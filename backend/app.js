/**
 * Dependency Imports
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { createServer } = require('http');
const cors = require('cors');

/**
 * File Imports
 */
const userRouter = require('./api/routes/userRouter');
const horseRouter = require('./api/routes/horseRouter');
const breedingRouter = require('./api/routes/breedingRouter');
const racingRouter = require('./api/routes/racingRouter');
const trainingRouter = require('./api/routes/trainingRouter');
const contactRouter = require('./api/routes/contactRouter');
const journalRouter = require('./api/routes/journalRouter');

/**
 * Instantiating app
 */
const app = express();

/**
 * Normalizing Port Value
 */
const normalizePort = (val) => {
  const Port = parseInt(val, 10);

  if (Number.isNaN(Port)) {
    // Named pipe
    return val;
  }

  if (Port >= 0) {
    // Port number
    return Port;
  }

  return false;
};

/**
 * Configuring app
 */
const port = normalizePort(process.env.PORT);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setting Routes
 */
app.use('/api/user/', userRouter);
app.use('/api/horse/', horseRouter);
app.use('/api/breeding-center/', breedingRouter);
app.use('/api/training-center/', trainingRouter);
app.use('/api/race/', racingRouter);
app.use('/api/contact-us/', contactRouter);
app.use('/api/journal/', journalRouter);

/**
 * Homepage
 */
app.get('/', (req, resp) => {
  resp.send('Welcome to home page');
});

/**
 * Serving Static Assets
 */
app.use('/images/horse', express.static(path.join(__dirname, 'public/images/horse')));
app.use('/images/user', express.static(path.join(__dirname, 'public/images/user')));

/**
 * Catching 404 requests
 */
app.use((req, resp, next) => {
  resp.status(404).json({
    status: 404,
    error: {
      message: 'Page not found',
    },
    data: null,
  });
});

/**
 * Starting Server
 */
const server = createServer(app);
server.listen(port);

/**
 * Server Event Handling
 */
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // Handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const uri = typeof addr === 'string' ? addr : `http://localhost:${addr.port}`;
  console.log(`Listening on ${uri}`);
});

module.exports = server;
