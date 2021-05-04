/*
 ============================================
; Title: invoice.js
; Author: Professor Krasso
; Date: 29 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: The invoice model to populate invoice
; Sprint - 3
;===========================================
 */

 //Require statements
 const mongoose = require('mongoose');
 const LineItemSchema = require('../schemas/line-item');
//declaration of mongoose schema, to be recognize by mongodb
const Schema = mongoose.Schema;
//the declared variables needed for the invoice
let invoiceSchema = new Schema({
    userName: { type: String },
    lineItems: [LineItemSchema],
    partsAmount: { type: Number},
    laborAmount: { type: Number },
    lineItemTotal: { type: Number},
    total: { type: Number },
    orderDate: { type: Date, default: new Date() }
})
//the exports statement
module.exports = mongoose.model('Invoice', invoiceSchema);
