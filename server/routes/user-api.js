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
const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();
const saltRounds = 10; // set salt rounds for hashing algorithm

/**
 * FindAll
 */

 /**
  *FindById
  */



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

router.get('/:userId', async(req, res) => {
  try
  {
    //Attempt to query for a single user by id using the findOne() function.
    User.findOne({'userId':req.params.userId}, function(err, user){
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
  {
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

 router.put('/:userId', async(req,res) => {
  try
  {
    User.findOne({'userId': req.params.userId}, function (err, user)
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
          let hashedPassword = bcrypt.hashSync(req.body.passwords, saltRounds); // salting and hashing the password
          //Set the user's attributes to match those in the request body.
          user.set({
            userName: req.body.userName,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            isDisabled: req.body.isDisabled,
            role: req.body.role,
            securityQuestions: req.body.securityQuestions,
            date_modified: new Date()

          });
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
              res.status(200).send(updatedUserSuccessResponse.toObject());
            }
          })
        }
        else
        {
          //if the userId is invalid, log and return null along with error message. 200 code is returned since the request technically succeeded, but lacked a valid user.
          console.log(`Invalid userId! The passed-in value was ${req.params.userId}`);
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
 * API: DeleteUser
 * @param userId
 * @returns User document or null
 * This route updates a user identified by user ID to be 'disabled' rather than act as a true deletion.
 */

router.put('/:userId', async(req,res) => {
  try
  {
    User.findOne({'userId': req.params.userId}, function (err, user)
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
              res.status(500).send(updateUserMongoDBError.toObject());
            }
            else
            {
              //If successful, log and return the updated user document.
              console.log(updatedUser);
              const updatedUserSuccessResponse = new BaseResponse('200', 'Query Successful', updatedUser);
              res.status(200).send(updatedUserSuccessResponse.toObject());
            }
          })
        }
        else
        {
          //if the userId is invalid, log and return null along with error message. 200 code is returned since the request technically succeeded, but lacked a valid user.
          console.log(`Invalid userId! The passed-in value was ${req.params.userId}`);
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

module.exports = router;
