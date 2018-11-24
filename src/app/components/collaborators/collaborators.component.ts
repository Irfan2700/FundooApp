import { LoggerService } from 'src/app/core/services/logger.service';
import { NoteServicesService } from './../../core/services/note-services.service';
import { UserServicesService } from './../../core/services/user-services.service';
import { Note } from './../../core/Model/note';
import { OnDestroy, Inject } from '@angular/core';
import { AuthService } from './../../core/services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ExpandedNotesComponent } from '../expanded-notes/expanded-notes.component';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private auth: AuthService,
    private userService: UserServicesService,
    public dialogRef: MatDialogRef<ExpandedNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteServicesService) { }

  private notes: Note;

  currentUserName;
  currentUserEmail;
  currentUserId;
  updatePic;
  searchInput;
  userSearchList;
  userAddList = [];
  ownerFlag = false;
  // isDelete = false;

  openCollabList(event) {

    this.userSearchList = [];
    if (this.searchInput !== undefined && this.searchInput !== "" && event.keyCode !== 46) {

      let requestBody = {

        "searchWord": this.searchInput
      }

      this.userService.searchUserList(requestBody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {


            this.userSearchList = response['data']['details'];
            console.log("user List result", this.userSearchList);
          }
        )
    }
  }

  personSelect(item) {

    let firstLetter = item.firstName.split('');

    this.userAddList.push({
      'collaborators': item,
      'isAdded': false,
      'firstLetter': firstLetter[0],
      'proColor': this.getRandomColor(),
      'owner': false
    });
    this.searchInput = '';


  }

  ownerCheck() {
    // debugger;

    for (let i = 0; i < this.data.collaborators.length; i++) {
      if (this.currentUserId == this.data.collaborators[i].userId) {

        this.ownerFlag = true;
      }else{
        this.ownerFlag = false;
      }
    }
  }

  allAdd() {
    // debugger;
    for (let i = 0; i < this.userAddList.length; i++) {
      if (this.userAddList[i].isAdded === false) {

        this.addCollabolater(this.userAddList[i]);

      }
    }
    this.dialogRef.close();
  }



  addCollabolater(item) {
    // debugger;
    this.noteService.addCollaborator(item.collaborators, this.data['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          console.log("person added")
          // this.userAddList.
        }
      )
  }

  // isDeleted(){
  //   // this.isDelete = true;
  // }

  closeDialog() {

    this.dialogRef.close();
  }

  deleteCollabolater(item, index) {

    this.userAddList[index].isAdded = false;

    this.noteService.deleteCollaborator(this.data['id'], item.collaborators.userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        respo => {
          LoggerService.log("person Removed");
          this.userAddList.splice(index, 1);
          this.userAddList[index].isAdded = false;

        },
        error => {

          LoggerService.error("Error is Occur While Deleting Collaborator Person");
          this.userAddList.splice(index, 1);

        }
      )
  }
  buttonColor;

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // console.log(color)
    return color;
  }

  // ngAfterViewInit(){


  //   this.getRandomColor(); 
  // }

  ngOnInit() {

    //   var letters = '0123456789ABCDEF';
    // this.buttonColor = '#';
    //   for (var i = 0; i < 6; i++) {
    //     this.buttonColor += letters[Math.floor(Math.random() * 16)];
    //   }



    if (this.data.collaborators.length !== 0)

      for (let i = 0; i < this.data.collaborators.length; i++) {

        this.ownerCheck()

        let firstLetter = this.data.collaborators[i].firstName.split('');
        this.userAddList.push({
          'collaborators': this.data.collaborators[i],
          'isAdded': true,
          'firstLetter': firstLetter[0].toUpperCase(),
          'proColor': this.getRandomColor(),
          'owner': this.ownerFlag
        })
      }


    console.log(this.userAddList)

    this.currentUserName = this.auth.getUserName();
    this.currentUserEmail = this.auth.getUserEmail();
    this.updatePic = this.auth.getPic();
    this.currentUserId = this.auth.getId();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.


    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}
