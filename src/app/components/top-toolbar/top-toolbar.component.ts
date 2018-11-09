import { CropImageComponent } from './../crop-image/crop-image.component';
import { environment } from './../../../environments/environment';
import { DataShareService } from './../../core/services/data-share.service';
import { LoggerService } from './../../core/services/logger.service';
import { CreateLabelComponent } from './../create-label/create-label.component';
import { Router } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { MatSnackBar, MatDialog, MatDialogModule } from '@angular/material';
import { AuthService } from '../../core/services/auth.service';
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
    public dialog: MatDialog,
    public cropDialog: MatDialog,
    private dataShare: DataShareService,
    ) { }

    arr;
    searchInput;

  logout() {
    this.myService.httpPostlogout("user/logout", '').subscribe(
      data => {
        // console.log("logout Successfully");
        this.auth.removeToken();
        this.auth.removeId();

        this.myRoute.navigate(["login"]);
      },
      error => {
        // console.log("Error occur")
      }
    )
  }

  imageReloader = false;
  // console.log("0st one",this.imageReloader);
  updateReload(event) {
    //   console.log("1st one",this.imageReloader);
    if (event) {
      setTimeout(() => {
        //       console.log("2nd one",this.imageReloader);
        this.imageReloader = true
      }, 3000)
      this.imageReloader = false;
    }
  }

  addLabel() {

    this.dialog.open(CreateLabelComponent);
  }

  showlabelList(item){

    this.myRoute.navigate(['label/'+ item.label])
  }

  searchNotes(){

    this.myRoute.navigate(['search']);
  }

  pressSearch(){

    this.dataShare.sendData2(this.searchInput)
  }

  selectPic: File;
  showPic;

  changeProPic(event){
    LoggerService.log("I am here")

    

    let dialogRef = this.cropDialog.open(CropImageComponent, {
      data: event,
      width: "800px"
    })

    dialogRef.afterClosed().subscribe(
      data => {
        let requestBody = data
        LoggerService.log(data);

        this.myService.httpPostEncoded2("user/uploadProfileImage", data).subscribe(
          response => {
    
            this.showPic = environment.imageURL+response['status'].imageUrl;
            LoggerService.log("I am here")
          }
        )


      }
    )
  }

  


  ngOnInit() {

    this.myService.httpGetJson("noteLabels/getNoteLabelList").subscribe(
      response => {
        this.dataShare.sendData1(response);
        this.arr = response['data']['details'];
        LoggerService.log(this.arr);
      },
      error => {
        // console.log("Error Occured")
      }
    )

    
  }
}
