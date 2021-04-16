/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Rodlan, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/
// require statements
const express = require('express');
const SecurityQuestion = require('../models/securityQuestion');

// file import - baseresponse & errorresponse classes
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

// configurations
const router = express.Router();

/**
 **
 ** Find All SQ
 **
 **/



 /**
 **
 ** Find SQ bu ID
 **
 **/


 /**
 **
 ** Create SQ
 **
 **/

 router.post('/', async(req, res) => {
  try
  {
      let newSecurityQuestion = {
          text: req.body.text
      };

      SecurityQuestion.create(newSecurityQuestion, function(err, securityQuestion) {
          // internal server error
          if (err)
          {
              console.log(err);
              const createSecurityQuestionMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error!', err);
              res.status(500).send(createSecurityQuestionMongodbErrorResponse.toObject());
          }
          // query executed successfully
          else {
              console.log(securityQuestion);
              const createSecurityQuestionResponse = new BaseResponse('200', 'Successful', securityQuestion);
              res.json(createSecurityQuestionResponse.toObject());
          }
      })
  }
  catch (e)
  {
      console.log(e);
      const createSecurityQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
      res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});


 /**
 **
 ** Update SQ
 **
 **/


 /**
 **
 ** Delete SQ
 **
 **/

