/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
User API's
 ***/

const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();
const saltRounds = 10; // set salt rounds for hashing algorithm

/**
 * FindAll
 */

 router.get('/', async (req, res) => {
  try {
    // get all users that are not disabled
    User.find({}).where('isDisabled').equals(false).exec(function(err, users){

      // server error message if there is one
      if (err) {
        console.log('inside error 500' + err);
        const findAllMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(findAllMongodbErrorResponse.toObject());
      }

      // if query returns results
      else {
        console.log('inside error 200' + users);
        const findAllUsersResponse = new BaseResponse(200, 'Query successful!', users);
        res.json(findAllUsersResponse.toObject());
      }
    });
  }
   // // If there is an error with the server, return a 500 code and the error.
  catch (e) {
    console.log('inside catch error' + error);
    const findAllCatchErrorResponse = new ErrorResponse (500, 'Internal Server Error', error);
    res.status(500).send(findAllCatchErrorResponse.toObject());
  }

});

  /**
  * CreateUser
  * Added by: Marie Nicole Barleta
  * Date: April 15 2021
  * Post request to create a new user
  */

router.post('/', async(req, res) => {
  try {
    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salting and hashing the password
    //the standard role for all newly created user
    standardRole ={
      role: 'standard'
    }
    // objects of the user
    let newUser = {
      userName: req.body.userName,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      email: req.body.email,
      role: standardRole,
      date_created: new Date(),
      date_modified: null

    };
    // create query on database
    User.create(newUser, function(err, user) {
      if (err) {
        console.log(err);
        const createUserMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
        res.status(500).send(createUserMongodbErrorResponse.toObject());
      } else {
          console.log(user);
          const createUserResponse = new BaseResponse(200, 'Query successful', user);
          res.json(createUserResponse.toObject());
      }

    })
  } catch (e){
    // If there is an error with the server, return a 500 code and the error.
    console.log(e);
    const findByIdCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e);
    res.status(500).send(findByIdCatchErrorResponse.toObject());

  }
});

/**
 * API: findById
 * @param userId
 * @returns User document or null
 * This route gets a single user by ID and provides data or error handling as appropriate.
 */

router.get('/:_id', async(req, res) => {
  try
  {
    //Attempt to query for a single user by id using the findOne() function.
    User.findOne({'_id':req.params._id}, function(err, user){
      if(err)
      {
        //If the database encounters and error, log the error to the console and output it as an object.
        console.log(err);
        const mongoDbErrorResponse = new BaseResponse('500',`MongoDB Native Error ${err.message}`,null);
        res.json(mongoDbErrorResponse.toObject());
      }
      else
      {
        //If successful, return the user object that was found.
        console.log(user);
        const userResponse = new BaseResponse('200', 'Successful Query', user);
        res.json(userResponse.toObject());
      }
    })
  }
  catch(e)
  {// If there is an error with the server, return a 500 code and the error.
    console.log(e);
    const findUserCatchError = new BaseResponse('500', `Internal Server Error ${err.message}`,null);
    res.json(findUserCatchError)
  }
})

/**
 * API: updateUser
 * @param userId
 * @returns User document or null
 * This route updates a user identified by user ID
 */

 router.put('/:id', async(req,res) => {
  try
  {
    User.findOne({'_id': req.params.id}, function (err, user)
    {
      if(err)
      {
        //If the database encounters an error, log the error to console and output as an object.
        console.log("inside error 500 if" + err);
        const updateUserMongoDBException = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
        res.status(500).send(updateUserMongoDBException.toObject());
      }
      else
      {
        //If no error and the user is valid, proceed with updating the user.
        console.log('no error found updating: ' + user);
        if(user)
        {
          //let hashedPassword = bcrypt.hashSync(req.body.passwords, saltRounds); // salting and hashing the password
          //Set the user's attributes to match those in the request body.
          user.set({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email
          });
          //it sets the new role text
          user.role.set({role: req.body.role});

          //Save the new user data.
          user.save(function(err, updatedUser){
            if(err)
            {
              //If the database encounters an error while attempting to update, log the error to console and output as an object.
              console.log(err);
              const updateUserMongoDBError = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
              res.status(500).send(updateUserMongoDBError.toObject());
            }
            else
            {
              //If successful, log and return the updated user document.
              console.log(updatedUser);
              const updatedUserSuccessResponse = new BaseResponse('200', 'Query Successful', updatedUser);
              res.json(updatedUserSuccessResponse.toObject());
            }
          })
        }
        else
        {
          //if the userId is invalid, log and return null along with error message. 200 code is returned since the request technically succeeded, but lacked a valid user.
          console.log(`Invalid userId! The passed-in value was ${req.params.userId}`);
          const invalidUserIdResponse = new BaseResponse('200','Invalid user ID', user);
          res.json(invalidUserIdResponse.toObject());
        }
      }
    })
  }
  catch (e)
  {
    //If the server encounters an error event, catch it, log it and return the error as an object.
    console.log(e);
    const updateUserCatchResponse = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
    res.status(500).send(updateUserCatchResponse.toObject());
  }
})

/**
 * API: DeleteUser
 * @param _id
 * @returns User document or null
 * This route updates a user identified by user ID to be 'disabled' rather than act as a true deletion.
 */

router.delete('/:id', async(req,res) => {
  try
  {
    User.findOne({'_id': req.params.id}, function (err, user)
    {
      if(err)
      {
        //If the database encounters an error, log the error to console and output as an object.
        console.log(err);
        const updateUserMongoDBException = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
        res.status(500).send(updateUserMongoDBException.toObject());
      }
      else
      {
        //If no error and the user is valid, proceed with updating the user.
        console.log(user);
        if(user)
        {
          //Set the user's isDisabled attribute to true to disable the user.
          user.set({
            isDisabled: true
          });
          //Save the new user data.
          user.save(function(err, updatedUser){
            if(err)
            {
              //If the database encounters an error while attempting to update, log the error to console and output as an object.
              console.log(err);
              const updateUserMongoDBError = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
              res.json(updateUserMongoDBError.toObject());
            }
            else
            {
              //If successful, log and return the updated user document.
              console.log(updatedUser);
              const updatedUserSuccessResponse = new BaseResponse('200', 'Query Successful', updatedUser);
              res.json(updatedUserSuccessResponse.toObject());
            }
          })
        }
        else
        {
          //if the userId is invalid, log and return null along with error message. 200 code is returned since the request technically succeeded, but lacked a valid user.
          console.log(`Invalid userId! The passed-in value was ${req.params.id}`);
          const invalidUserIdResponse = new BaseResponse('200','Invalid user ID', user);
          res.status(200).send(invalidUserIdResponse.toObject());
        }
      }
    })
  }
  catch (e)
  {
    //If the server encounters an error event, catch it, log it and return the error as an object.
    console.log(e);
    const updateUserCatchResponse = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
    res.status(500).send(updateUserCatchResponse.toObject());
  }
})


 /**
  * FindSelectedSecurityQuestions
  * Get request to retrieve user's selected
  * security questions for request password validation
  */
router.get('/:userName/security-questions', async (req, res) => {
  try
  {
    //Find query to find specific username
    User.findOne({'userName': req.params.userName}, function(err, user){
      if (err)
      {
        console.log(err);
        const findSelectedSecurityQuestionsMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(findSelectedSecurityQuestionsMongodbErrorResponse.toObject());
      }
      /**
       * if it connects properly to the database the console
       * will respond successful query and the data objects
       * that was found
       */
      else
      {
        console.log(user);
        const findSelectedSecurityQuestionsResponse = new BaseResponse('200', 'Query successful', user.selectedSecurityQuestions);
        res.json(findSelectedSecurityQuestionsResponse.toObject());
      }
    })
  }
  catch (e)
  {
    //the catch response when the node server didn't work
    console.log(e);
    const findSelectedSecurityQuestionsCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e);
    res.status(500).send(findSelectedSecurityQuestionsCatchErrorResponse.toObject());
  }
});

/**
 * findUserRole Api
 * This API uses get request to get the role of a specific username
 */
router.get('/:userName/role', async (req, res) => {
  try
  {
    //Finds the username, but gets the role based on the query
      User.findOne({'userName': req.params.userName}, function(err, user)
      {
          if (err)
          {
            //The error response if the mongodb is not connected
            console.log(err);
            const findUserRoleMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(findUserRoleMongoDbErrorResponse.toObject());
          }
          else
          {
            //The successful response if the query ran
              console.log(user);
              const findUserRoleResponse = new BaseResponse('200', 'Query successful', user.role);
              res.json(findUserRoleResponse.toObject());
          }
      })
  }
  catch (e)
  {
    //The catch response if the server is not working
      console.log(e);
      const findUserRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
      res.status(500).send(findUserRoleCatchErrorResponse.toObject());
  }
})
module.exports = router;


