/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';

import { AuthLayoutComponent  } from './shared/auth-layout/auth-layout.component';
//import { AuthGuard } from './shared/auth.guard';

import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent  } from './pages/user-create/user-create.component';
import { UserListComponent  } from './pages/user-list/user-list.component';
import { UserDetailsComponent  } from './pages/user-details/user-details.component';


const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      // home
      {
        path: '',
        component: HomeComponent
      },
        // security questions list
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent
      },
      // security question details
      {
        path: 'security-questions/:id',
        component: SecurityQuestionDetailsComponent
      },
      // security questions create
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionCreateComponent
      },
      // users - list
      {
        path: 'users/:userIdd',
        component: UserListComponent
      },
    ],
    //canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component:AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      /*{
        path: 'register',
        component: UserCreateComponent
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
