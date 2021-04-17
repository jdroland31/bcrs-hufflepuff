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
// const bcrypt = require('bcryptjs');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');
const RoleSchema = require('../schemas/user-role');

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
    let hashedPassword = bcrypt.hashSync(req.body.passwords, saltRounds); // salting and hashing the password
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
      role: standardRole

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
    User.findOne({'userId':req.params.empId}, function(err, user){
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

module.exports = router;
