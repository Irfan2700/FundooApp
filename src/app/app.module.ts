import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
// import { TermsDialog } from './component/signup/signup.component';
import { SignupComponent, TermsDialog } from './components/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// import {ScrollDispatchModule} from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';

// import { ServicesService } from './services/services.service';
import { FormsModule } from '@angular/forms';

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
import { ResetPasswordComponent,  ResetPasswordSetComponent} from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    TermsDialog,
    ResetPasswordComponent,
    ResetPasswordSetComponent,
    HomeComponent,
    TopToolbarComponent,
    LeftSidebarComponent
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
    MatButtonToggleModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,

    // ServicesService
  ],

  entryComponents: [SignupComponent, TermsDialog, ResetPasswordComponent, ResetPasswordSetComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
