/***
** Title: Bob's Computer Repair Shop
** Author:  Professor Krasso
** Modified by: Jonathan Roland, Nicole Barleta, Wendy Leon
** Date: April 15 2021
** Description: API - Sprint 1
 ***/

//Import the required modules for the application.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';


//Imported component of the application
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { SigninComponent } from './pages/signin/signin.component';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { DeleteRecordDialogComponent } from './shared/delete-record-dialog/delete-record-dialog.component';
import { SecurityQuestionDetailsComponent } from './pages/security-question-details/security-question-details.component';
import { SecurityQuestionListComponent } from './pages/security-question-list/security-question-list.component';
import { SecurityQuestionCreateComponent } from './pages/security-question-create/security-question-create.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorComponent } from './pages/error/error.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ResetPasswordFormComponent } from './pages/reset-password-form/reset-password-form.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyUsernameFormComponent } from './pages/verify-username-form/verify-username-form.component';
import { VerifySecurityQuestionsFormComponent } from './pages/verify-security-questions-form/verify-security-questions-form.component';
import { RoleCreateComponent } from './pages/role-create/role-create.component';
import { InvoiceSummaryDialogComponent } from './dialogs/invoice-summary-dialog/invoice-summary-dialog.component';
import { ErrorInterceptor } from './shared/error.interceptor';
import { RoleListComponent } from './pages/role-list/role-list.component';
import { RoleDetailsComponent } from './pages/role-details/role-details.component';


//Imported angular material modules of th application
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { PurchasesByServiceGraphComponent } from './pages/purchases-by-service-graph/purchases-by-service-graph.component';
import { InvoiceConfirmationComponent } from './dialogs/invoice-confirmation/invoice-confirmation.component';

@NgModule({
  //Declare the components used in the application.
  declarations: [
    AppComponent,
    HomeComponent,
    BaseLayoutComponent,
    AuthLayoutComponent,

    SigninComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserListComponent,
    DeleteRecordDialogComponent,

    SecurityQuestionDetailsComponent,
    SecurityQuestionListComponent,
    SecurityQuestionCreateComponent,
    ContactComponent,
    AboutComponent,
    ErrorComponent,
    NotFoundComponent,
    ResetPasswordFormComponent,
    RegisterComponent,
    VerifyUsernameFormComponent,
    VerifySecurityQuestionsFormComponent,
    RoleCreateComponent,
    InvoiceSummaryDialogComponent,
    PurchasesByServiceGraphComponent,
    RoleListComponent,
    RoleDetailsComponent,
    InvoiceConfirmationComponent,
  ],
  //Declare the imported modules being used.
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatListModule,
    MatStepperModule,
    MatDividerModule,
    ChartModule
  ],
  providers: [
    //the error interceptor it intercepts all the error codes that was declared in the error interceptor ts file
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
