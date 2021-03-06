/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/


/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

/**
 * API Routes
 */

const SecurityQuestionAPI = require('./routes/security-question-api');
const SessionAPI = require('./routes/session-api');
const UserAPI = require('./routes/user-api');
const RoleAPI = require('./routes/role-api');
const InvoiceAPI = require('./routes/invoice-api');

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));



/**
 * Variables
 */
const port = process.env.PORT || 3000; // server port

// DB connection
const conn = 'mongodb+srv://bcrs_user:hufflepuffers21@buwebdev-cluster-1.oqsoi.mongodb.net/bcrs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * API use statements
 */
app.use('/api/security_questions', SecurityQuestionAPI);
app.use('/api/session', SessionAPI);
app.use('/api/users', UserAPI);
app.use('/api/roles', RoleAPI);
app.use('/api/invoices', InvoiceAPI);

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
