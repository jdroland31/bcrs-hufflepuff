
/*
 ============================================
; Title: role list
; Author: Professor Krasso
; Date: May 1 2021
; Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
; Description: Sprint - 3
;===========================================
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { Role } from '../../shared/interfaces/role.interface';
import { RoleService } from '../../shared/services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

  roles: Role[];
  displayedColumns = ['role', 'functions'];

  constructor(private dialog: MatDialog, private roleService: RoleService) {

       //The role service is called to get all roles and set the roles variable to that data.
       this.roleService.findAllRoles().subscribe(res => {
      this.roles = res.data;

      console.log('Query result:' + this.roles);

    },
    err =>
    {
      console.log(err);
    });

   }

  ngOnInit(): void {  }
//If the user click on the Delete icon, a dialog hosting the Delete Dialog component appears. If the user confirms, the deleteRole API is called via the role service.
  delete(roleId, text) {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        roleId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Are you sure you want to delete role: ${text}?`
      },
      disableClose: true,
      width: '800px'
    });
    //When the dialog closes, if the user confirmed the deletion the role service is called to process the deletion.
    dialogRef.afterClosed().subscribe(result =>
    {
      if (result === 'confirm')
      {
        this.roleService.deleteRole(roleId).subscribe(res =>
        {
          console.log('Role deleted')
          this.roles = this.roles.filter(role => role._id !== roleId);
        })
      }
    });
  }

}
