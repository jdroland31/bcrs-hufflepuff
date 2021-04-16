/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Rodlan, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/
// //These are the require statements for mongoose and the mongoose Schema library.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Here we define a model for security questions based on the 'security_questions" collection.
let selectedSecurityQuestionSchema = new Schema({
    questionText: { type: String},
    answerText:   { type: String}
});

module.exports = selectedSecurityQuestionSchema;
