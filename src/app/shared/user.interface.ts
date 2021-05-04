/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

import { Role } from './interfaces/role.interface';

//This interface defines a User object.
export interface User {
  _id: string;
  userName:  string;
  password:  string;
  firstName:  string;
  lastName: string;
  phoneNumber:  string;
  address:  string;
  email:  string;
  role: Role;
}
