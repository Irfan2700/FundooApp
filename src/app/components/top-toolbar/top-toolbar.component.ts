// import { ActivatedRoute } from '@angular/router';
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
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Medium,])
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
    private noteService: NoteServicesService,

  ) { }

  arr = [];
  searchInput;
  listView = false;
  topTitle = "Fundoo";
  keepTitle = "Keep";
  enableSearch = false;
  sidebarTabSelect;

  logout() {
    this.userService.userLogout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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

  listSwitcher() {
    this.listView = !this.listView;
    this.dataShare.sendData4(this.listView);
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

    let dialogRef = this.dialog.open(CreateLabelComponent);

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        result => {

          this.getLabelList();
        }
      )
  }

  showlabelList(item) {

    this.myRoute.navigate(['label/' + item.label]);
  }

  searchNotes() {

    this.myRoute.navigate(['search']);
  }

  pressSearch() {

    this.dataShare.sendData2(this.searchInput)
  }

  selectPic: File;
  showPic = null;
  updatePic;

  changeProPic(event) {
    LoggerService.log("I am here")



    let dialogRef = this.cropDialog.open(CropImageComponent, {
      data: event,
      width: "800px"
    })

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {

          console.log("qqq", data)
          LoggerService.log(data);

          let requestBody = new FormData()
          requestBody.append("file", data, data.name)

          this.userService.profilePicUploader(requestBody)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
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

  getLabelList() {

    this.noteService.getNoteLabelList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          this.dataShare.sendData1(response);
          this.arr = response['data']['details'];

          LoggerService.log(this.arr);
          this.arr.sort(function (a, b) {
            const obj1 = a.label.toUpperCase();
            const obj2 = b.label.toUpperCase();

            let comp = 0;
            if (obj1 > obj2) {
              comp = 1;
            } else if (obj1 < obj2) {
              comp = -1;
            }
            return comp;
          }
          );

          return this.arr;
        },
        error => {
          // console.log("Error Occured")
          throw error;
        }
      )
  }
  account;

  currentUser;
  currentEmail;

  closeSearchInput(event) {

    if (event.keyCode === 13) {
      this.enableSearch = !this.enableSearch;
    }
  }
  tabFlag;
  tabColor1 = "#d3d3d3";
  tabColor2 = "#d3d3d3";
  tabColor3 = "#d3d3d3";
  tabColor4 = "#d3d3d3";
  labelTabColor = [];

  changeTabColor(tabName) {

    this.sidebarTabSelect = this.myRoute.url;

    if (tabName == '/home') {

      this.tabColor1 = "#05f6f6";
      this.tabColor2 = "#d3d3d3";
      this.tabColor3 = "#d3d3d3";
      this.tabColor4 = "#d3d3d3";
      this.topTitle = 'Fundoo';
      this.keepTitle = 'Keep';

    } else if (tabName == '/reminders') {

      this.tabColor2 = "#05f6f6";
      this.tabColor1 = "#d3d3d3";
      this.tabColor3 = "#d3d3d3";
      this.tabColor4 = "#d3d3d3";

      this.topTitle = ''; 
      this.keepTitle = 'Reminders';

    } else if (tabName == '/archive') {

      this.tabColor3 = "#05f6f6";
      this.tabColor1 = "#d3d3d3";
      this.tabColor2 = "#d3d3d3";
      this.tabColor4 = "#d3d3d3";

      this.topTitle = ''; 
      this.keepTitle = 'Archive';

    } else if (tabName == '/trash') {

      this.tabColor4 = "#05f6f6";
      this.tabColor1 = "#d3d3d3";
      this.tabColor2 = "#d3d3d3";
      this.tabColor3 = "#d3d3d3";

      this.topTitle = ''; 
      this.keepTitle = 'Trash';

    }



  }

  changeLabelTab(label) {


    this.tabFlag = label;

    // console.log("label detail", this.myRoute.url.split('/'))
    // this.myRoute.url.split('/')

    this.tabColor1 = "#d3d3d3";
    this.tabColor2 = "#d3d3d3";
    this.tabColor3 = "#d3d3d3";
    this.tabColor4 = "#d3d3d3";

    this.topTitle = ''; 
    this.keepTitle = label;
  }

  arr1 = []

  ngOnInit() {



    this.getLabelList();

    this.updatePic = this.auth.getPic();

    this.currentUser = this.auth.getUserName();
    this.currentEmail = this.auth.getUserEmail();

    this.account = this.currentUser;

    this.sidebarTabSelect = this.myRoute.url;

    // this.changeTabColor(this.myRoute.url);


    // for (let i = 0; i < this.arr.length; i++) {

    //   this.labelTabColor.push({
    //     'labelName': this.arr[i].label,
    //     'labelColor': "#d3d3d3"
    //   })
    // }
    let temp = this.myRoute.url.split('/');
    let temp1 = temp.pop();
    this.changeLabelTab(temp1);

    this.changeTabColor(this.myRoute.url)

  }




  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.


    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }
}
