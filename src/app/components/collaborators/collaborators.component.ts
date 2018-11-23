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

  private notes:Note;
  
  currentUserName;
  currentUserEmail;
  updatePic;
  searchInput;
  userSearchList;
  userAddList = [];

  openCollabList(event){

    this.userSearchList = [];
    if(this.searchInput !== undefined && this.searchInput !== "" && event.keyCode !== 46){

      let requestBody = {

        "searchWord": this.searchInput
      }

      this.userService.searchUserList(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          
          this.userSearchList = response['data']['details'];
          console.log("user List result",this.userSearchList);
        }
      )
    }
  }

  personSelect(item){

    this.userAddList.push(item);
    this.searchInput = '';
  }

  addCollabolater(item){

    let requestBody = {
      // 'firstName': item.firstName,
      // 'lastName': item.lastName,
      // 'email': item.email,
      // 'userId': item.userId

    }

    this.noteService.addCollaborator(this.userAddList, this.data.id)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {

        console.log("person added")
      }
    )
  }
  
  ngOnInit() {

    this.currentUserName = this.auth.getUserName();
    this.currentUserEmail = this.auth.getUserEmail();
    this.updatePic = this.auth.getPic();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}
