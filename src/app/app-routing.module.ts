/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

//These imports are the components that the application will route to as specified below.
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
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';
import { RoleGuard } from './shared/guards/role-guard';
//This variable defines the routes used in the application.
const routes: Routes = [
  {
    path: '',
    //The baseLayout can only be navigated if a valid user is logged-in
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
      /**
       * All the components with RoleGuard
       * will only show for admin users
       */
      {
        path: 'users/create/new',
        component: UserCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'users/:id',
        component: UserDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'userlist',
        component: UserListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions',
        component: SecurityQuestionListComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-question-create',
        component: SecurityQuestionCreateComponent,
        canActivate: [RoleGuard]
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionDetailsComponent,
        canActivate: [RoleGuard]
      },
      {
         path: 'verify-users/:username',
         component: VerifyUsernameFormComponent
       },
      {
        path: 'roles/:roleId',
        component: RoleDetailsComponent,
        canActivate: [RoleGuard]
      },
       {
         path: 'roles',
         component: RoleListComponent,
         canActivate: [RoleGuard]
       },
       {
        path: 'roles/create/new',
        component: RoleCreateComponent,
        canActivate: [RoleGuard]
       },
       {
         path:'chart',
         component: PurchasesByServiceGraphComponent,
         canActivate: [RoleGuard]

       }
    ],
    canActivate: [SessionGuard] //The SessionGuard can be called by the BaseLayout to prevent unauthorized users from accessing the routes within it's hierarchy.
  },
  {
    path: 'session', //The session routes are those accessible to users who have not yet signed in.
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
       {
         path: 'forgot',
         component: VerifyUsernameFormComponent
       },
      {
        path: 'verify-security-questions',
        component: VerifySecurityQuestionsFormComponent
      },
      {
         path: 'verify-users/:username',
         component: VerifyUsernameFormComponent
      },
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
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    enableTracing: false,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
