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
 * API: FindAll
 * @returns All Security Questions documents or null
 * This route returns all security questions from the database
*/

 router.get('/', async (req, res) => {
  try {
    // Attempt to query for all security questions.
    SecurityQuestion.find({})
    .where('isDisabled')
    .equals(false)
    .exec(
     function(err, securityQuestions){

      //If the database encounters an error, log the error to the console and output it as an object.
      if (err) {
        console.log(err);
        const findAllSecurityQuestionsMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllSecurityQuestionsMongodbErrorResponse.toObject());
      }

      //If successful, return the user object that was found.
      else {
        console.log(securityQuestions);
        const findAllSecurityQuestionsResponse = new BaseResponse(200, 'Query successful!', securityQuestions);
        res.json(findAllSecurityQuestionsResponse.toObject());
      }
    });
  }
  // If there is an error with the server, return a 500 code and the error.
  catch (e) {
    console.log(e);
    const findAllSecurityQuestionsCatchErrorResponse = new ErrorResponse (500, 'Internal Server Error', e);
    res.status(500).send(findAllSecurityQuestionsCatchErrorResponse.toObject());
  }

});


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
  }// If there is an error with the server, return a 500 code and the error.
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
  }// If there is an error with the server, return a 500 code and the error.
  catch (e)
  {
      console.log(e);console.log('catch');
      const createSecurityQuestionCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error!', e.message);
      res.status(500).send(createSecurityQuestionCatchErrorResponse.toObject());
  }
});


/**
 * API: UpdateSecurityQuestion
 * @returns
 * @params
*/

router.put('/:_id', async(req,res) => {
  try
  {
    SecurityQuestion.findOne({'_id': req.params._id}, function (err, securityQuestion)
    {
      if(err)
      {
        //If the database encounters an error, log the error to console and output as an object.
        console.log(err);
        const updateSecurityQuestionMongoDBException = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
        res.status(500).send(updateSecurityQuestionMongoDBException.toObject());
      }
      else
      {
        //If no error and the security question is valid, proceed with updating the security question.
        console.log(securityQuestion);
        if(securityQuestion)
        {
          //Set the security question's text attribute to match that in the request body.
          securityQuestion.set({
            text: req.body.text
          });
          //Save the new security question data.
          securityQuestion.save(function(err, updatedSecurityQuestion){
            if(err)
            {
              //If the database encounters an error while attempting to update, log the error to console and output as an object.
              console.log(err);
              const updatedSecurityQuestionMongoDBError = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
              res.status(500).send(updatedSecurityQuestionMongoDBError.toObject());
            }
            else
            {
              //If successful, log and return the updated security question document.
              console.log(updatedSecurityQuestion);
              const updatedSecurityQuestionSuccessResponse = new BaseResponse('200', 'Query Successful', updatedSecurityQuestion);
              res.status(200).send(updatedSecurityQuestionSuccessResponse.toObject());
            }
          })
        }
        else
        {
          //if the security question Id is invalid, log and return null along with error message. 200 code is returned since the request technically succeeded, but lacked a valid user.
          console.log(`Invalid security question id! The passed-in value was ${req.params._id}`);
          const invalidSecurityQuestionIdResponse = new BaseResponse('200','Invalid security question id', securityQuestion);
          res.status(200).send(invalidSecurityQuestionIdResponse.toObject());
        }
      }
    })
  }
  catch (e)
  {
    //If the server encounters an error event, catch it, log it and return the error as an object.
    console.log(e);
    const updateSecurityQuestionCatchResponse = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
    res.status(500).send(updateSecurityQuestionCatchResponse.toObject());
  }
})

 /**
  * Security Questions - Delete
  * Added by: Marie Nicole Barleta
  * Date: April 19 2021
 **/
router.delete('/:id', async(req, res) => {
  try
  {
    //Finds the specific id to delete the specific security question
    SecurityQuestion.findOne({'_id': req.params.id}, function(err, securityQuestion){
      if (err)
      {
        console.log(err);
        const deleteSecurityQuestionMpngpdbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(deleteSecurityQuestionMpngpdbErrorResponse.toObject());
      }
      else
      {
        /** if there's no error the security question will be set as Disabled
         *  and in the read code all disabled items will not be shown.
         * */
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
            //Successful query if everything worked well
            console.log(savedSecurityQuestion);
            const deleteSecurityQuestionResponse = new BaseResponse (200, 'Query successful', savedSecurityQuestion);
            res.json(deleteSecurityQuestionResponse.toObject());
          }
        })
      }
    })
  }
  catch (e)
  {// If there is an error with the server, return a 500 code and the error.
    console.log(e);
    const findAllCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }
});

 module.exports = router;

