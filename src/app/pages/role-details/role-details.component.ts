/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: User Details - Sprint 1
 ***/

import { Component, OnInit } from '@angular/core';
import { Role } from '../../shared/interfaces/role.interface';
import { RoleService } from '../../shared/services/role.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css']
})

export class RoleDetailsComponent implements OnInit {

  role: Role;
  form: FormGroup;
  roleId: string;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private roleService: RoleService) {
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    this.roleService.findRoleById(this.roleId).subscribe(res => {
      this.role = res['data'];
    }, err => {
      console.log(err);
    }, () => {
      console.log(this.role.text);
      this.form.controls['text'].setValue(this.role.text);
    });
  }

  ngOnInit(): void {
    console.log(this.role.text);
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  save() {

    const updatedRole = {
      text: this.form.controls['text'].value
    } as Role;
    this.roleService.updateRole(this.roleId, updatedRole).subscribe(res => {
      this.router.navigate(['/roles']);
    }, err => {
      console.log(err);
    });
  }

  cancel() {
    this.router.navigate(['/roles']);
  }
}

