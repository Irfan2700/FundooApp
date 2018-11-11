import { NoteServicesService } from './../../core/services/note-services.service';
import { UserServicesService } from 'src/app/core/services/user-services.service';
import { CropImageComponent } from './../crop-image/crop-image.component';
import { environment } from './../../../environments/environment';
import { DataShareService } from './../../core/services/data-share.service';
import { LoggerService } from './../../core/services/logger.service';
import { CreateLabelComponent } from './../create-label/create-label.component';
import { Router } from '@angular/router';
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
    private myRoute: Router,
    public dialog: MatDialog,
    public cropDialog: MatDialog,
    private dataShare: DataShareService,
    private userService: UserServicesService,
    private noteService: NoteServicesService
    ) { }

    arr;
    searchInput;

  logout() {
    this.userService.userLogout().subscribe(
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
  showPic = null;
  updatePic;

  changeProPic(event){
    LoggerService.log("I am here")

    

    let dialogRef = this.cropDialog.open(CropImageComponent, {
      data: event,
      width: "800px"
    })

    dialogRef.afterClosed().subscribe(
      data => {
        
        console.log("qqq",data)
        LoggerService.log(data);

        let requestBody = new FormData()
        requestBody.append("file", data, data.name)

        this.userService.profilePicUploader(requestBody).subscribe(
          response => {
    
            this.showPic = environment.imageURL + response['status'].imageUrl;
            
            this.auth.sendPic(this.showPic)
            // console.log(response);
            LoggerService.log(this.showPic);

            this.updatePic = this.auth.getPic();
          }
        )


      }
    )
  }

  currentUser;
  currentEmail;

  ngOnInit() {

    this.noteService.getNoteLabelList().subscribe(
      response => {
        this.dataShare.sendData1(response);
        this.arr = response['data']['details'];
        LoggerService.log(this.arr);
      },
      error => {
        // console.log("Error Occured")
      }
    )

    this.updatePic = this.auth.getPic();
    
      this.currentUser = this.auth.getUserName();
      this.currentEmail = this.auth.getUserEmail();
  }
}
