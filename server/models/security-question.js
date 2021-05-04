/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

//These are the require statements for mongoose and the mongoose Schema library.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Here we define a model for security questions based on the 'security_questions" collection.
let securityQuestionSchema = new Schema(
  {
    text: {
            type: String
            //unique: true mongoose schema field validation*/,
            //required: true mongoose required field validadtion*/
          },
    isDisabled: {type: Boolean, default: false}
  },
  {collection: 'security_questions'})
//Here we export the model.
module.exports = mongoose.model('SecurityQuestion', securityQuestionSchema);
