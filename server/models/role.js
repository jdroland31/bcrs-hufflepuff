/*
 ============================================
; Title:  role.js
; Author: Professor Krasso
; Date: 28 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: The role schema to be able to populate roles
; Sprint - 3
;===========================================
 */

 // require statement
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * It accepts text as string and isDisabled is default false,
 * if it's true the interface won't show the type of role.
 */
let roleSchema = new Schema({
  text: { type: String, unique: true },
  isDisabled: { type: Boolean, default: false }
});

//The export module as mongoose model for Role Schema
module.exports = mongoose.model('Role', roleSchema);
