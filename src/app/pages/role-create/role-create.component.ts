/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 29 2021
** Description: create user role
 ***/
// file import
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';


@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css']
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private roleService: RoleService) {
   }

  ngOnInit(): void {
    this.form = this.fb.group({
       //When initialized, make field required.
      text: [null, Validators.compose([Validators.required])]
    });
  }

  create()
  {
    //This function creates a role from the provided data.
    const newRole = {
      text: this.form.controls['text'].value
    } as Role
    //Call the role service and pass the values to the createRole() function.
    this.roleService.createRole(newRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
        console.log(err);
    })
  }
  //This provides for navigation back to the role list.
  cancel() {
    this.router.navigate(['/roles']);
  }
}
