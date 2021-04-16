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

let selectedSecurityQuestionSchema = new Schema ({
    questionText: { type: String },
    answerText: { type: String }
})

module.exports = selectedSecurityQuestionSchema;
