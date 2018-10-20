import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ResetPasswordComponent, ResetPasswordSetComponent} from './components/reset-password/reset-password.component';
import { TopToolbarComponent } from './components/top-toolbar/top-toolbar.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { SlidingMaterialComponent } from './components/sliding-material/sliding-material.component';
import { AuthGuard } from './guard/auth.guard';

  const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'reset', component: ResetPasswordComponent},
    {path: 'resetpassword/:accessToken', component: ResetPasswordSetComponent},
    {path: 'home', component: TopToolbarComponent, canActivate: [AuthGuard], children: [

      {path: '', component: HomeComponent, outlet: 'dashboard'},
      {path: '', component: LeftSidebarComponent, outlet: 'sideBarOutlet'},
    ]},
    {path: 'test', component: HomeComponent, outlet: 'test'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
