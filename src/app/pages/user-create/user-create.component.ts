/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router'

import { User } from 'src/app/shared/user.interface';

import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: any;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])]
    });
  }

  createUser() {
    const newUser = {} as User;
    newUser.userName = this.form.controls.userName.value,
    newUser.password = this.form.controls.password.value,
    newUser.firstName = this.form.controls.firstName.value,
    newUser.lastName = this.form.controls.userName.value,
    newUser.phoneNumber = this.form.controls.phoneNumber.value,
    newUser.address = this.form.controls.address.value,
    newUser.email = this.form.controls.email.value,

    this.userService.createUser(newUser).subscribe(res => {
      this.router.navigate(['/userlist'])
    },
    err=> {
      console.log(err);
    })
  }
  cancel () {
    this.router.navigate(['/userlist']);
  }
}
