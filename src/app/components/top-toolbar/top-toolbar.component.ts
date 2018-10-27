import { CreateLabelComponent } from './../create-label/create-label.component';
import { Router } from '@angular/router';
import { ServicesService } from './../../services/services.service';
import { MatSnackBar, MatDialog } from '@angular/material';
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
    private myRoute: Router,
    public dialog: MatDialog) {}

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

    imageReloader = false;
    // console.log("0st one",this.imageReloader);
    updateReload(event){
    //   console.log("1st one",this.imageReloader);
      if(event){
        setTimeout(() => {
    //       console.log("2nd one",this.imageReloader);
          this.imageReloader = true
        }, 3000)
        this.imageReloader = false;
      }
    }

    addLabel(){

      this.dialog.open(CreateLabelComponent);
    }


  ngOnInit() {

  }
}
