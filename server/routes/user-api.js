/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
User API's
 ***/

const bcrypt = require('bcryptjs');
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
