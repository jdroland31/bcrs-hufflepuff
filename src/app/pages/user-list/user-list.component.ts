/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { CookieService } from 'ngx-cookie-service'
import { User } from 'src/app/shared/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../shared/user.service';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

// variables
users: User[];
displayedColumns: any = [ 'username', 'fistName', 'lastName', 'phoneNumber', 'address','email','functions'];

constructor(private http: HttpClient, private dialog: MatDialog, private userService: UserService) {

  // findAll Users
  this.userService.findAllUsers().subscribe(res => {
    this.users = res['data'];
    console.log(this.users);
  }, err => {
    console.log(err);
  });
  }

  ngOnInit() {}

  delete (userId, recordId){
   const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
    data: {
      recordId,
      dialogHeader: 'Delete Record Dialog',
      dialogBody: `Are you sure you want to delete user ${recordId}?`
    },
      disableClose: true,
      width:'800px'});

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm'){
        this.userService.deleteUser(userId).subscribe(result => {
        this.users = this.users.filter(u => u._id !== userId);
         })
      }
    });
  }
}
