/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1,
** This is the user roles schema
 ***/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//the schema for user roles
let userRoleSchema = new Schema({
  //Default all users to standard role on creation.
  role: {type: String, default: 'standard'},
  isDisabled: {type: Boolean, default: false}
})
//Export the userRoleSchema.
module.exports = userRoleSchema;
