import { Router } from '@angular/router';
import { ServicesService } from './../../services/services.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    public snackBar: MatSnackBar,
    private myService: ServicesService,
    private myRoute: Router) {}

    logout(){
      this.myService.httpPostlogout("user/logout",'').subscribe(
        data => {
          console.log("logout Successfully");
          this.auth.removeToken();
          this.auth.removeId();

          this.myRoute.navigate(["login"]);
        },
        error => {
          console.log("Error occur")
        }
      )
    }

  ngOnInit() {

  }
}
