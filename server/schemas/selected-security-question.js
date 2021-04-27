/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
** This is the selected security schema
 ***/

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
// the schemas for the security questions
let selectedSecurityQuestionSchema = new Schema ({
    questionText: { type: String },
    answerText: { type: String }
})
//Export the selectedSecurityQuestionsSchema.
module.exports = selectedSecurityQuestionSchema;
