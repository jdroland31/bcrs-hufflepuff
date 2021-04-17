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
import { SecurityQuestionsDetailsComponent } from './pages/security-questions-details/security-questions-details.component';
import { SecurityQuestionsListComponent } from './pages/security-questions-list/security-questions-list.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
        // security questions
      {
        path: 'security-questions',
        component: SecurityQuestionsListComponent
      },
      {
        path: 'security-questions/:questionId',
        component: SecurityQuestionsDetailsComponent
      },
      {
        path: 'security-questions/create/new',
        component: SecurityQuestionsDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
