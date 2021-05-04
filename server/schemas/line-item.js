/*
 ============================================
; Title: line-item.js
; Author: Professor Krasso
; Date: 29 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: The line-item schema to connect to mongodb
; Sprint - 3
;===========================================
 */

 //Declaration of required statements and variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// The Schema declaration, title is string and price is a number
let lineItemSchema = new Schema({
  title: { type: String },
  price: { type: Number }
});
//Export statement
module.exports = lineItemSchema;
