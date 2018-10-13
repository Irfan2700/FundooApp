import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent, ResetPasswordSetComponent} from './components/reset-password/reset-password.component';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';

  const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'resetpassword/:accessToken', component: ResetPasswordSetComponent},
    {path: 'home', component: HomeComponent, children: [
      {path: '', component: TopToolbarComponent},
      {path: 'toolbar', component: LeftSidebarComponent}
    ]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
