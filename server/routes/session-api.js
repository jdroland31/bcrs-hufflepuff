/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

const express = require('express');
const User = require('../models/user');
//const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const RoleSchema = require('../schemas/user-role');

const router = express.Router();

/**
 * API: SignIn
 *
 */

router.post('/signin', async(req, res) => {
  try
  {
    //Attempt to find the user with the username given in the request body.
    User.findOne({'username': req.body.userName}, function(err, user){
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
            const invalidPasswordResponse = new BaseResponse(401, 'Invalid username and/or password. Please check your entry and try again.');
            res.status(401).send(invalidPasswordResponse.toObject());
          }
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

module.exports = router;
