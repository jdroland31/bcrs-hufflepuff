/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: User Details - Sprint 1
 ***/

// this component displays the details of a selected user
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { RoleService} from 'src/app/shared/services/role.service';
import { User } from 'src/app/shared/user.interface';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: Role[];

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private router: Router, private userService: UserService, private roleService: RoleService) {
    this.userId = this.route.snapshot.paramMap.get('id');
    // console.log(this.userId);
    //Get the current values of the user's editable field via the passed in userId.
    this.userService.findUserById(this.userId).subscribe(res => {
      this.user = res['data'];
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls.firstName.setValue(this.user.firstName);
      this.form.controls.lastName.setValue(this.user.lastName);
      this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
      this.form.controls.address.setValue(this.user.address);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.role.setValue(this.user.role);

      this.roleService.findAllRoles().subscribe(res => {
        console.log(res);
        this.roles = res['data'];
      }, err => {
        console.log(err);
      })
    })
   }



  ngOnInit(): void {
    //Set the validation standards on the field forms.
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      role: [null, Validators.compose([Validators.required])]
    });
  }
  //When called, this collects the values in the editable fields and updates the user, then returns them to the user list.
  saveUser() {
    // console.log("saveUser() was called");
    const updatedUser = {} as User;
    updatedUser.firstName = this.form.controls.firstName.value;
    updatedUser.lastName = this.form.controls.lastName.value;
    updatedUser.phoneNumber = this.form.controls.phoneNumber.value;
    updatedUser.address = this.form.controls.address.value;
    updatedUser.email = this.form.controls.email.value;
    updatedUser.role = this.form.controls.role.value;

    this.userService.updateUser(this.userId, updatedUser).subscribe(res => {
      this.router.navigate(['/userlist'])
    }, err => {
      console.log(err);
    })
  }
  //If the user cancels editing, they are navigated back to the user list component.
  cancel () {
    this.router.navigate(['/userlist']);
  }

}
