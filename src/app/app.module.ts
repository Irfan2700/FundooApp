import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
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


import {
  MatFormFieldModule,
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
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatExpansionModule,
  MatChipsModule,
} from '@angular/material';
import { ResetPasswordComponent, ResetPasswordSetComponent } from './components/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NotesComponent } from './components/notes/notes.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { LabelComponent } from './components/label/label.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { MoreOptionsComponent } from './components/more-options/more-options.component';
import { PaletteComponent } from './components/palette/palette.component';
import { CreateArchiveComponent } from './components/create-archive/create-archive.component';
import { ExpandedNotesComponent } from './components/expanded-notes/expanded-notes.component';
import { CreateLabelComponent } from './components/create-label/create-label.component';
import { ChecklistModule } from 'angular-checklist';
import { CreatNoteMoreOptionComponent } from './components/creat-note-more-option/creat-note-more-option.component';
import { LoggerService } from './core/services/logger.service';






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
    NotesComponent,
    ReminderComponent,
    LabelComponent,
    ArchiveComponent,
    TrashComponent,
    CreateNoteComponent,
    MoreOptionsComponent,
    PaletteComponent,
    CreateArchiveComponent,
    ExpandedNotesComponent,
    CreateLabelComponent,
    CreatNoteMoreOptionComponent,
    



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
    MatSidenavModule,
    MatMenuModule,
    LayoutModule,
    MatListModule,
    MatExpansionModule,
    ChecklistModule,
    MatChipsModule


    // ServicesService
  ],

  schemas: [NO_ERRORS_SCHEMA],

  entryComponents: [SignupComponent, TermsDialog, ResetPasswordComponent, ResetPasswordSetComponent, ExpandedNotesComponent, NotesComponent, TopToolbarComponent, CreateLabelComponent],
  providers: [LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
