/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

//Here we add required libraries like mongoose, user role, and selection security question schema.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserRoleSchema = require('../schemas/user-role');
const SelectedSecurityQuestionSchema = require('../schemas/selected-security-question');
//Here we define the user schema.
let userSchema = new Schema({
  userName:                    {type: String, required: true, unique: true, dropDups: true},
  password:                    {type: String, required: true},
  firstName:                   {type: String},
  lastName:                    {type: String},
  phoneNumber:                 {type: String},
  address:                     {type: String},
  email:                       {type: String},
  isDisabled:                  {type: String, default: false },
  role:                        UserRoleSchema,
  selectedSecurityQuestions:  [SelectedSecurityQuestionSchema],
  dateCreated:                 {type: Date, default: new Date()},
  dateModified:                {type: Date}
}, {collection: 'users'});
//Here we export the model.
module.exports = mongoose.model('User', userSchema);
