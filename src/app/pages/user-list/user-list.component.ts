/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: User List - Sprint 1
 ***/
// this component displays a list with the existing users
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  users: User[];
  displayedColumns = ['userName', 'firstName', 'lastName', 'role', 'phoneNumber', 'address', 'email', 'functions'];

  constructor(private dialog: MatDialog, private userService: UserService) {

    //The user service is called to get all users and set the users variable to that data.
    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(this.users);
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

  //If the user click on the Delete icon, a dialog hosting the Delete Dialog component appears. If the user confirms, the deleteUser API is called via the user service.
  delete(userId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${userId}?`
      },
      disableClose: true,
      width: '800px'
    });

    //When the dialog closes, if the user confirmed the deletion the user service is called to process the deletion.
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe(res => {
          console.log('User deleted');

          this.users = this.users.filter(u => u._id !== userId)
        })
      }
    });
  }
}
