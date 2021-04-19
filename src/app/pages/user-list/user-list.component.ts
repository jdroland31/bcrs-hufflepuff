/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

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
  displayedColumns = ['username', 'firstname', 'lastname', 'phoneNumber', 'address', 'email', 'functions'];

  constructor(private dialog: MatDialog, private userService: UserService) {

    /**
     * This will find all the users
     */
    this.userService.findAllUsers().subscribe(res => {
      this.users = res['data'];
      console.log(this.users);
    }, err => {
      console.log(err)
    })
  }

  ngOnInit(): void {
  }

/**
 *
 * @param userId
 * @param recordId
 * delete user function
 */
  delete(userId, recordId): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete user ${recordId}?`
      },
      disableClose: true,
      width: '800px'
    });

    /**
     * if the confirm button is clicked, user will be deleted
     */
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.userService.deleteUser(userId).subscribe(res => {
          console.log('User deleted');
          /**
            This will return a new array of users not matching
            the one currently deleted
          */
          this.users = this.users.filter(u => u._id !== userId)
        })
      }
    });
  }
}
