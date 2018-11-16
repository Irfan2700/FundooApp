import { Router } from '@angular/router';
import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from './../../core/services/logger.service';
import { DataShareService } from 'src/app/core/services/data-share.service';
import { ExpandedNotesComponent } from './../expanded-notes/expanded-notes.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  @Input() model: any = [];

  constructor(public dialog: MatDialog, private elementRef: ElementRef,
    private dataShare: DataShareService,
    private noteService: NoteServicesService,
    private myRoute: Router) {
    // let newModel = elementRef.nativeElement.getAttribute('model');
    // this.model = newModel
  }
  @ViewChild('itemName') itemName: ElementRef;

  @Output() updateList = new EventEmitter();
  // @Input() NoteArray;
  @Input() searchInput;

  isPinned = false;
  dateFlag = '';

  labelArr = [];
  tick;
  // SearchInput;
  // noteId(id) {
  //   console.log(id);
  // }
  flag = false;
  modelArr = this.model;
  labelUpdate = []
  labelList;

  updateOptionsNote(event) {
    if (event) {
      this.flag = true;

      if (this.flag) {
        this.updateList.emit(true);
      }
    }
  }

  updateOptionLabel(event) {
    //     // debugger;
    //     if (event) {
    //       // this.labelArr = [];

    // // for(let i=0; i<this.model.length; i++){
    // //   if(this.model[i].noteLabels !== undefined){
    // // //     if()
    // // //       this.labelUpdate.push(this.model[i].noteLabels);
    // //      }

    // // }
    // //       // console.log(this.labelUpdate)
    // //       // console.log("its hitting")
    // //       // this.updateList.emit(true)
    //     }
  }

  showLabel(label) {

    this.myRoute.navigate(['label/' + label])
  }

  updateColor;

  updateBackground(event) {

    if (event) {
      this.updateList.emit(true);
    }
  }

  archiveNote(event) {
    if (event) {
      this.updateList.emit(true);
    }
  }

  openDialog(item) {
    const dialogRef = this.dialog.open(ExpandedNotesComponent,
      {
        data: item,
        width: '550px',

      }
    );

    dialogRef.afterClosed().subscribe(
      result => {
        this.updateList.emit(true);
      },
      error => {
        // console.log("Error Occurs...");
      }
    );

    dialogRef.componentInstance.updateDialog.subscribe(() => {
      this.updateList.emit(true);
    })
  }

  // currentTick(checklist){

  // }
  reminderCompleted = false;

  checkBoxChange(checklist, item) {


  }
  
  completedReminder(reminderChip) {

    
    // if (new Date(reminderChip).getFullYear() === new Date().getFullYear()) {
    //   if (new Date(reminderChip).getMonth() === new Date().getMonth()) {
    //     if (new Date(reminderChip).getDay() === new Date().getDay()) {
    //       if (new Date(reminderChip).getHours() === new Date().getHours()) {
    //         if(new Date(reminderChip).getMinutes() === new Date().getMinutes()){
    //           if(new Date(reminderChip).getSeconds() < new Date().getSeconds()){
    //             this.reminderCompleted = true;
    //           }
              
    //         }else{
    //           this.reminderCompleted = true;
    //         }

    //       } else if (new Date(reminderChip).getHours() < new Date().getHours()) {

    //         this.reminderCompleted = true;
    //       }

    //     } else if (new Date(reminderChip).getDate() < new Date().getDate()) {
    //       this.reminderCompleted = true;
    //     }

    //   } else if (new Date(reminderChip).getMonth() < new Date().getMonth()) {
    //     this.reminderCompleted = true;
    //   }
    // } else if (new Date(reminderChip).getFullYear() < new Date().getFullYear()) {
    //   this.reminderCompleted = true;
    // }
    let saved = new Date(reminderChip).getTime();
    let current = new Date().getTime();
    if(saved < current){
      return true;
    }else{
      return false;
    }
  }


  checkTick(checklist, item, i, j) {

    // console.log(checklist)

    var body = {
      "itemName": this.model[i].noteCheckLists[j].itemName,
      "status": checklist.status
    }

    this.noteService.updateNotesCheckList(this.model[i].noteCheckLists[j].notesId, this.model[i].noteCheckLists[j].id, JSON.stringify(body)).subscribe(
      response => {
        // console.log("checklist Line is Successfully Updated!!");
        this.updateList.emit({})
      },
      error => {
        // console.log("error Occured");
      }
    )
  }

  removeRemainder(item) {

    // item.reminder = 

    let requestBody = {
      "reminder": '',
      "noteIdList": [item.id]
    }
    this.noteService.deleteRemainder(requestBody).subscribe(response => {

      LoggerService.log("Remainder remove SuccessFully");
      this.updateList.emit({});
    })
  }
  viewSwitch;

  ngOnInit() {

    // this.dataShare.showData3.subscribe(
    //   response => {
    //     LoggerService.log(response);
    //     this.SearchInput = response;
    //   }
    // )
    this.dataShare.showData4.subscribe(
      data => {
        
        this.viewSwitch = data;
        
      }
    )


  }
}