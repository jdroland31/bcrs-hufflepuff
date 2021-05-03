/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 29 2021
** Description: Role service
 ***/
//This component provides an interface for the role API

// file import
import { Injectable } from '@angular/core';
import { Role } from '../interfaces/role.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  findAllRoles(): Observable<any> {
    return this.http.get('/api/roles');
  }

  findRoleById(roleId: string): Observable<any> {
    return this.http.get('/api/roles/' + roleId);
  }

  createRole(role: Role): Observable<any> {
    return this.http.post('/api/roles/', {
<<<<<<< HEAD
      text: role.text,
=======
      text: role.text
>>>>>>> aef09891c6d94ac637e51e531a2c72ffee4dfdc8
    });
  }

  updateRole(roleId: string, role: Role): Observable<any> {
    return this.http.put('/api/roles/' + roleId, {
      text: role.text,
    })
  }

  deleteRole(roleId: string): Observable<any> {
    return this.http.delete('/api/roles/' + roleId);
  }

  findUserRole(userName: string): Observable<any> {
    return this.http.get('/api/users/' + userName + '/role');
  }

}
