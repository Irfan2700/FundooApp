import { ErrorHandlerService } from './core/services/error-handler.service';
import { InterceptService } from './core/services/intercept.service';
import { MessagingService } from './core/services/messaging.service';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guard/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RatingModule } from 'ngx-rating/index.js'



/**
 *    Angular Material Imports
 */

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
  MatDatepickerModule,
  MatNativeDateModule,
  MatTooltipModule

} from '@angular/material';

// import { MomentDateAdapter } from '@angular/material-moment-adapter'
/**
 *     SubCommponents Imports
 */

import { ResetPasswordComponent, ResetPasswordSetComponent } from './components/reset-password/reset-password.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent, TermsDialog } from './components/signup/signup.component';
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
import { FilterPipe } from './core/pipe/filter.pipe';
import { SearchComponent } from './components/search/search.component';
import { TrashMoreOptionComponent } from './components/trash-more-option/trash-more-option.component';
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { CreateRemainderComponent } from './components/create-remainder/create-remainder.component';
import { UpdateReminderComponent } from './components/update-reminder/update-reminder.component';
import { CollaboratorsComponent } from './components/collaborators/collaborators.component';
import { CollaboratorIconComponent } from './components/collaborator-icon/collaborator-icon.component';
import { TestComponent } from './components/test/test.component';
import { QuesAndAnswerSectionComponent } from './components/ques-and-answer-section/ques-and-answer-section.component';

// import { errorHandler } from '@angular/platform-browser/src/browser';







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
    FilterPipe,
    SearchComponent,
    TrashMoreOptionComponent,
    CropImageComponent,
    CreateRemainderComponent,
    UpdateReminderComponent,
    CollaboratorsComponent,
    CollaboratorIconComponent,
    TestComponent,
    QuesAndAnswerSectionComponent,





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
    MatChipsModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    RatingModule

    // ServicesService
  ],

  schemas: [NO_ERRORS_SCHEMA],

  entryComponents: [SignupComponent, TermsDialog, ResetPasswordComponent, ResetPasswordSetComponent,
    ExpandedNotesComponent, NotesComponent, TopToolbarComponent, CreateLabelComponent, CropImageComponent,
    CollaboratorIconComponent, CollaboratorsComponent],
  providers: [LoggerService, MessagingService, ErrorHandlerService, {
    provide: ErrorHandler,
    useClass: ErrorHandlerService
  }, InterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
