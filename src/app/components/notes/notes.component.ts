import { Note } from './../../core/Model/note';
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
  @Input() pinStatus: any = [];
  @Input() pinHead;

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
  private notes:Note[] = [];

  private isPinned = false;
  dateFlag = '';

  private labelArr = [];
  private pinArr;
  private tick;
  // SearchInput;
  // noteId(id) {
  //   console.log(id);
  // }
  private flag = false;
  modelArr = this.model;
  private labelUpdate = []
  private labelList;

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

  private updateColor;

  updateBackground(event) {

    if (event) {
      this.updateList.emit(true);
    }
  }

  currentItemArr="test";

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
  private reminderCompleted = false;

  checkBoxChange(checklist, item) {


  }
  
  completedReminder(reminderChip) {

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

  reminderOption(item){
    this.currentItemArr = item;
  }

  checkPin(item){
// debugger
    // console.log(this.pinArr[index].title,this.pinArr[index].isPined)
    if(item.isPined)
    {return true}
    else{
    return false;}
  }

  changePin(item, index){

    if(item.isPined === true){
      item.isPined = false;
      this.model[index].isPined = false;
      
    }else{
      item.isPined = true;
      this.model[index].isPined = true;
    }
    this.checkPin(item);
    let requestBody = {
      "noteIdList": [item.id],
      "isPined": this.checkPin(item)
    }

    this.noteService.pinUnpinNotes(requestBody).subscribe(
      response => {
        LoggerService.log("pin change successfully");
        this.updateList.emit({})
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
  private labeldisable = [];

  removeLabel(label,item, index){
    // for(let i=0; i<item.noteLabels.length; i++){
    //   this.labeldisable.push(false);
    // }
    // console.log("remove label", label)
    this.dataShare.sendData5(label);


    this.noteService.removeLabelFromNotes(item.id,label.id).subscribe(
      response => {

        // console.log("Label remove Successfull",response);
        // this.labeldisable[index] = true;
        this.updateList.emit({});
        
      },
      error => { }
    )
    
  }

  ngOnInit() {
    
    this.dataShare.showData3.subscribe(
      response => {
        this.pinArr = response;
      }
    )
    this.dataShare.showData4.subscribe(
      data => {
        
        this.viewSwitch = data;
        
      }
    )

    // this.dataShare.showData6.subscribe(
    //   respo => {

    //     this.pinArr = respo;
        
    //   }
    // )<div *ngIf="!(completedReminder(remainderChip))">

    console.log("aaaa", this.labeldisable)

  }
}