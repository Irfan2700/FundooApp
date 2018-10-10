import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
// import { TermsDialog } from './component/signup/signup.component';
import { SignupComponent, TermsDialog } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatToolbarModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDialogModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        } from '@angular/material';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TermsDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDialogModule,
    ScrollDispatchModule,
    MatButtonToggleModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],

  exports: [
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule
  ],
  entryComponents: [SignupComponent, TermsDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
