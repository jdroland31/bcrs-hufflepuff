import { Injectable } from '@angular/core';
import { User } from './user.interface';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  /** FindAll users **/
  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  /** Find users by ID **/
  findUserById(userId: string): Observable<any> {
    return this.http.get(`/api/users/${userId}`);
  }

  /** Create user **/
  createUser(user: User): Observable<any>{
    return this.http.post('/api/users', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    })
  }

  /** Update User **/

  updateUser(userId: string, user: User): Observable<any> {

    return this.http.put(`/api/users/` + userId,
    {
      userName: user.firstName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email
    })

  }
  /** Delete User **/

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`/api/users/` + userId);
  }

}
