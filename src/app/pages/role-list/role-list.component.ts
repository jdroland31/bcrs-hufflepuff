
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
