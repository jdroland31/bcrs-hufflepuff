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
import { SessionGuard } from './shared/session.guard';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent  } from './pages/user-create/user-create.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserDetailsComponent  } from './pages/user-details/user-details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { RegisterComponent } from './pages/register/register.component';

import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [SessionGuard]
      },
      {
        path: 'services',
        component: HomeComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'users/create/new',
        component: UserCreateComponent
      },
      {
        path: 'users/:id',
        component: UserDetailsComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'userlist',
        component: UserListComponent
      },
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent
      },
      {
        path: 'security-question-create',
        component: SecurityQuestionCreateComponent
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
         path: 'verify-users/:username',
         component: VerifyUsernameFormComponent
       }
    ],
    canActivate: [SessionGuard] //TODO: reactivate the SessionGuard BEFORE deployment to master or assignment submission!
  },
  {
    path: 'session',
    component:AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      /*/ {
      //   path: 'forgot',
      //   component: VerifyUsernameFormComponent
      // },
      // {
      //   path: 'verify-security-questions',
      //   component: VerifySecurityQuestionsFormComponent
      // },
      {
         path: 'verify-users/:username',
         component: VerifyUsernameFormComponent
      }*/
      {
        path: 'reset-password',
        component: ResetPasswordFormComponent
      },
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: '500',
        component: ErrorComponent
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
