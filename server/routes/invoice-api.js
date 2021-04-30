/*
 ============================================
; Title:  invoice-api.js
; Author: Professor Krasso
; Date: 28 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: The invoice api, for CRUD functions of invoices
; Sprint - 3
;===========================================
 */

 //require statements
const express = require('express');
const User = require('../models/user');
const Invoice = require('../models/invoice');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();

/**
 * Create Invoice API
 */
router.post('/:userName', async(req, res) => {
  try
  {
      //variable to get the username
      const userName = req.params.userName;
      /**
       * Invoice variables
       * username to add into specified username,
       * lineItems will be an array of items, with title and price each
       * parts amount is the amount entered
       * labor amount is the amount entered
       * line item total is the total of all the line items added
       * total is the total of all the line items, labor and parts
       */
      const newInvoice = {
          username: userName,
          lineItems: req.body.lineItems,
          partsAmount: req.body.partsAmount,
          laborAmount: req.body.laborAmount,
          lineItemTotal: req.body.lineItemTotal,
          total: req.body.total
      }
      console.log(newInvoice);
      // Create query to invoice model
      Invoice.create(newInvoice, function(err, invoice)
      {
        //Error if the mongodb is not connected
          if (err)
          {
            console.log(err);
            const createInvoiceMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(createInvoiceMongodbErrorResponse.toObject());
          }
        //Success response when the creation is successful
          else
          {
            console.log(invoice);
            const  createInvoiceResponse = new BaseResponse('200', 'Query Successful', invoice);
            res.json(createInvoiceResponse.toObject());
          }
      })
  }
  //Error response when the server is not connected
  catch (e)
  {
    console.log(e);
    const createInvoiceCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }
});

// findPurchasesByService

router.get('/purchases-graph', async (req,res) => {
  try {
    Invoice.aggregate([
      { // un-nest invoice items
        $unwind: '$lineItems'
      },
      { // group items
        $group:
        {
          '_id':
          {
            'title': '$lineItems.title',
            'price': '$lineItems.price'
          }, // items counter
          'count':
          {
            $sum: 1
          }
        }
      },
      { // sort items by title
        $sort:
        {
          '_id.title': 1
        }
      }
    ],
    function(err, purchaseGraph) {
      if (err)
      {
        console.log(err);
        const findPurchasesByServiceGraphMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findPurchasesByServiceGraphMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(purchaseGraph);
        const findPurchasesByServiceGraphResponse = new BaseResponse(200, 'Query successful', purchaseGraph);
        res.json(findPurchasesByServiceGraphResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findPurchasesByServiceCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findPurchasesByServiceCatchErrorResponse.toObject());
  }
});


//Export statement
module.exports = router;
