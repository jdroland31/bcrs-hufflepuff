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


  /** FindAll users by ID **/

  findAllSecurityQuestion(): Observable<any> {
    return this.http.get('/api/security-questions');
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

  /** Update SQ **/


  /** Delete SQ **/

}
