/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const RoleSchema = require('../schemas/user-role');

const router = express.Router();

/**
 * API: SignIn
 *
 */

router.post('/signin', async(req, res) => {
  console.log('This is the Session Sign In API call');
  console.log(req.body.userName);
  console.log(req.body.password);
  // console.log(res);
  try
  {
    //Attempt to find the user with the username given in the request body.
    User.findOne({'userName': req.body.userName}, function(err, user){
      //If there is a server side error log it.
      if(err)
      {
        console.log(err);
        const signInMongoDbErrorResponse = new ErrorResponse(500, `Internal Server Error`, err);
        res.status(500).send(signInMongoDbErrorResponse.toObject());
      }
      else
      {
        console.log(user);
        //If the user is found, check the password for validity.
        if(user)
        {
          //Compare the password in the request body to the stored password for the user.
          let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

          //If the password is valid return 200.
          if(passwordIsValid)
          {
            console.log('Login successful');
            const signInResponse = new BaseResponse(200, 'Login successful', user);
            res.json(signInResponse.toObject());
          }
          //If the password is invalid return 401
          else{
            console.log(`Invalid password for user: ${user.userName}`);
            const invalidPasswordResponse = new BaseResponse(401, 'Invalid password. Please check your entry and try again.');
            res.status(401).send(invalidPasswordResponse.toObject());
          }
        }
        else{
          console.log('user not found');
          const invalidUserNameResponse = new BaseResponse(401, 'Invalid userName. Please check your entry and try again.');
          res.status(401).send(invalidUserNameResponse.toObject());
        }
      }
    })
  }
  catch(e)
  {
    //If the server encounters an error event, catch it, log it and return the error as an object.
    console.log(e);
    const userSignInCatchResponse = new BaseResponse('500',`Internal Server Error ${err.message}`,null);
    res.status(500).send(userSignInCatchResponse.toObject());
  }
})

/**
 * Register
 *
 */


/**
 * Verify User
 *
 */

/**
 * Verify Security Questions
 *
 */

/**
 * Reset Password,
 * Post request to create a new password
 */
router.post('/users/userName/reset-password', async(req, res) => {

  try
  {
    const password = req.body.password;
    //finds the specific username
    User.findOne({'userName': req.params.userName}, function(err, user){
      if (err)
      {
        //error trapping if the mongodb does not respond
        console.log(err);
        const resetPasswordMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(resetPasswordMongodbErrorResponse.toObject());
      }
      else
      {
        /**
         * If it's connected successfully it will get the password
         * and the new set of password will be hashed, it will then be set
         * and saved as a new password  if the connections are right.
         */
          console.log(user);

          let hashedPassword = bcrypt.hashSync(password, saltRounds);

          user.set({
            password: hashedPassword
          });

          user.save(function(err, updatedUser)
          {
              if (err)
              {
                console.log(err);
                const updatedUserMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
                res.status(500).send(updatedUserMongodbErrorResponse.toObject());
              }
              else
              {
                  console.log(updatedUser);
                  const updatedPasswordResponse = new BaseResponse('200', 'Query Successful', updatedUser);
                  res.json(updatedPasswordResponse.toObject());
              }
          })
      }
    })
  }
  //Error message if the server is not responding
  catch (e)
  {
    console.log(e);
    const resetPasswordCatchError = new ErrorResponse('500', 'Internal server error', e);
    res.status(500).send(resetPasswordCatchError.toObject());
  }
});


module.exports = router;
