import { ArchiveComponent } from './components/archive/archive.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { CreateNoteComponent } from './components/create-note/create-note.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent, ResetPasswordSetComponent} from './components/reset-password/reset-password.component';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';


import { AuthGuard } from './guard/auth.guard';
import { TrashComponent } from './components/trash/trash.component';

  const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'resetpassword/:accessToken', component: ResetPasswordSetComponent},
    {path: '', component: TopToolbarComponent, canActivate: [AuthGuard], children: [

      {path: 'home', component: HomeComponent},
      {path: 'reminders', component: ReminderComponent},
      {path: 'archive', component: ArchiveComponent},
      {path: 'trash', component: TrashComponent}

    ]},
    {path: 'test', component: HomeComponent, outlet: 'test'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
