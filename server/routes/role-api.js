/*
 ============================================
; Title: role-api.js
; Author: Professor Krasso
; Date: 28 April 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: The role api, for CRUD functions of roles
; Sprint - 3
;===========================================
 */


//require statements
const express = require('express');
const Role = require('../models/role');
const User = require('../models/user');
const ErrorResponse = require('../services/error-response');
const BaseResponse = require('../services/base-response');

const router = express.Router();


/**
 * FindAllRole Api
 */

 router.get('/', async (req, res) => {
  try { // query DB - return all roles that are not disabled
    Role.find({})
      .where('isDisabled')
      .equals(false)
      .exec(function(err, roles)
      {
        if (err)
        { // If there is an error with the server, return a 500 code and the error.
          console.log(err);
          const findAllRolesMongodbErrorResponse = new ErrorResponse(500, 'Internal server error', err);
          res.status(500).send(findAllRolesMongodbErrorResponse.toObject());
        }
        else
        {
          console.log(roles);
          const findAllRolesResponse = new BaseResponse(200, 'Query is successful', roles);
          res.json(findAllRolesResponse.toObject());
        }
      })
  }// If there is an error with the server, return a 500 code and the error.
  catch (e)
  {
    console.log(e);
    const findAllRolesCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(findAllRolesCatchErrorResponse.toObject());
  }
});



 /**
  * FindById API
  * @param roleId
  */
router.get('/:roleId', async(req, res) => {
  try
  {
    //Attempt to find a single role by a specified ID.
    Role.findOne({'_id': req.params.roleId}, function(err, role){
      //If there is a MongoDB error log it and return a 500 code with the error object.
      if(err)
      {
        console.log(err);
        const findRoleByIdMongoErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
        res.status(500).send(findRoleByIdMongoErrorResponse.toObject());
      }
      //If successful return a 200 code and the role object.
      else
      {
        console.log(role);
        const findRoleByIdResponse = new BaseResponse('200', 'Query successful', role);
        res.json(findRoleByIdResponse.toObject());
      }
    })
  }
  //If there is a server error log it and return 500 with the error object.
  catch(e)
  {
    console.log(e);
    const findRoleByIdCatchErrorResponse = new BaseResponse('200', 'Internal Server Error', e.message);
    res.status(500).send(findRoleByIdCatchErrorResponse.toObject());
  }
})

/**
 * CreateRole Api
 * This API uses post request to add the role as a text
 */
router.post('/', async (req, res) => {
  try
  {
      // This is the required text that's added to the database
      const newRole = {
        text: req.body.text,
      };
      // The role will be created once this function is called
      Role.create(newRole, function(err, role)
      {
          // It shows an error message if it can't connect to mongoDB
          if (err)
          {
            console.log(err);
            const createRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
            res.status(500).send(createRoleMongodbErrorResponse.toObject());
          }
          // The successful response once the query was added,  the role added will show as well
          else
          {
            console.log(role);
            const createRoleResponse = new BaseResponse('200', 'Query successful', role);
            res.json(createRoleResponse.toObject());
          }
      })
  }
  // The catch error if it's not connected to the server
  catch (e)
  {
    console.log(' api catch all' + e);
    const createRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
});



/**
 * UpdateRole Api
 */

 router.put('/:roleId', async (req, res) => {
  try
  {
    //finds the role id in the database
    Role.findOne({ '_id': req.params.roleId }, function(err, role)
    {
      if (err)
      {
        //error 500 response if a mongodb error occurs
          console.log(err);
          const updateRoleMongodbErrorResponse = new ErrorResponse(500, "Internal server error", err);
          res.status(500).send(updateRoleMongodbErrorResponse.toObject());
      }
      else
      {
        /**
         * If there is no error the role will be set as a new
         * text and will be saved and an successful query response will show
         */
          console.log(role);

          role.set(
          {
            text: req.body.text
          });

          role.save(function(err, updatedRole) {
            if (err)
            {// If there is an error with the server, return a 500 code and the error.
              console.log(err);
              const updatedRoleCatchErrorResponse = new ErrorResponse(500, "Internal server error", err);
              res.status(500).send(updatedRoleCatchErrorResponse.toObject());
            }
            else
            {// The successful response once the query was added,  the role updated will show as well
              console.log(updatedRole)
              const updatedRoleResponse = new BaseResponse(200, "Query Successful", updatedRole);
              res.json(updatedRoleResponse.toObject());
            }
          })
        }
    })
  }// If there is an error with the server, return a 500 code and the error.
  catch (e)
  {
    console.log(e);
    const updateRoleCatchErrorResponse = new ErrorResponse(500, 'Internal server error', e.message);
    res.status(500).send(updateRoleCatchErrorResponse.toObject());
  }
});

 /**
  * DeleteRole Api
  */

 router.delete('/:roleId', async(req, res) => {
   try
   {
     //Find the role specified by the passed in ID.
    Role.findOne({'_id': req.params.roleId}, function(err, role){
      //If there is an error with MongoDB return 500 and the error object.
      if(err)
      {
        console.log(err);
        const deleteRoleMongoDbErrorResponse = new ErrorResponse('500', 'Internal server error', err);
        res.status(500).send(deleteRoleMongoDbErrorResponse.toObject());
      }
      else
      {
        console.log(role);
        //Use an aggregate query to determine if the role being deleted is already mapped to a user.
        User.aggregate(
          [
            {
              $lookup:
              {
                from: 'roles',
                localField: 'role.role',
                foreignField: 'text',
                as: 'userRoles'
              }
            },
            {
              $match:
              {
                'userRoles.text': role.text
              }
            }
          ], function(err, users)
          {
            //If there is an error with MongoDB when looking for users with this role, log it and send a 500 status and error object.
            if(err)
            {
              console.log(err);
              const usersMongoDbErrorResponse = new ErrorResponse('500','Internal Server Error', err);
              res.status(500).send(usersMongoDbErrorResponse.toObject());
            }
            //If one or more users are returned then the role is in use and must not be disabled.
            else{
              if(users.length > 0)
              {
                console.log(`Role <${role.text}> is already in use and cannot be deleted`);
                const userRoleAlreadyInUseResponse = new BaseResponse('200', `Role <${role.text}> is already in use and cannot be deleted`, role);
                res.json(userRoleAlreadyInUseResponse.toObject());
              }
              else
              {
                //If no users are returned then we can safely disable the role.
                console.log(`Role <${role.text}> is not in active use and can be safely removed`);
                //We do not truly delete data in this application, but set a disabled flag instead.
                role.set({
                  isDisabled: true
                });
                role.save(function(err, updatedRole)
                {
                  //If a MongoDB error occurs while trying to update the role, log the error and return 500 and the error object.
                  if(err)
                  {
                    console.log(err);
                    const updatedRoleMongodbErrorResponse = new ErrorResponse('500', 'Internal Server Error', err);
                    res.status(500).send(updatedRoleMongodbErrorResponse.toObject());
                  }
                  //Otherwise, log the updated role and return 200 and the updated role object.
                  else
                  {
                    console.log(updatedRole);
                    const roleDeletedResponse = new BaseResponse('200', `Role <${role.text}> has been successfully removed.`, updatedRole);
                    res.json(roleDeletedResponse.toObject());
                  }
                })
              }
            }
          }
        )
      }
    })
   } // If there is an error with the server, return a 500 code and the error.
   catch (e)
   {
    console.log(e);
    const deleteRoleCatchErrorResponse = new ErrorResponse('500', 'Internal Server Error', e.message);
    res.status(500).send(deleteRoleCatchErrorResponse.toObject());
   }
 })

  module.exports = router;
