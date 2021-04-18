/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
Security Questions API
 ***/





// require statements
const express = require('express');
const SecurityQuestion = require('../models/security-question');

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
  * Security Questions - FindById
  * Added by: Marie Nicole Barleta
  * Date: April 15 2021
  */
router.get('/:id', async(req, res) => {
  try
  {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
      if (err)
      {
        console.log(err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);
        const findByIdResponse = new BaseResponse(200, 'Query Successful', securityQuestion);
        res.json(findByIdResponse.toObject());
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});
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
      console.log(e);console.log('catch');
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
router.put('/:id', async(req, res) => {
  try
  {
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
      if (err)
      {
        console.log(err);
        const deleteSecurityQuestionMpngpdbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(deleteSecurityQuestionMpngpdbErrorResponse.toObject());
      }
      else
      {
        console.log(securityQuestion);
        securityQuestion.set({
          isDisabled: true
        });

        securityQuestion.save(function (err, savedSecurityQuestion){
          if (err)
          {
            console.log(err);
            const savedSecurityQuestionMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
            res.status(500).send(savedSecurityQuestionMongodbErrorResponse.toObject());
          }
          else
          {
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse (200, 'Query successful', savedSecurityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

 module.exports = router;

