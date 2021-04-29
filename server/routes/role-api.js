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


 /**
  * FindRoleById Api
  */


/**
 * CreateRole Api
 * This API uses post request to add the role as a text
 */
router.post('/', async (req, res) => {
  try
  {
      // This is the required text that's added to the database
      const newRole = {
        text: req.body.text
      }
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
    console.log(e);
    const createRoleCatchErrorResponse = new ErrorResponse('500', 'Internal server error', e.message);
    res.status(500).send(createRoleCatchErrorResponse.toObject());
  }
})



/**
 * UpdateRole Api
 */

 /**
  * DeleteRole Api
  */

  module.exports = router;
