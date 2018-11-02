import { ServicesService } from './../../services/services.service';
import { ExpandedNotesComponent } from './../expanded-notes/expanded-notes.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  @Input() model: any = [];

  constructor(public dialog: MatDialog, private elementRef: ElementRef,
    private myService: ServicesService) {
    // let newModel = elementRef.nativeElement.getAttribute('model');
    // this.model = newModel
  }
  @ViewChild('itemName') itemName: ElementRef;

  @Output() updateList = new EventEmitter();

  isPinned = false;

  tick;

  // noteId(id) {
  //   console.log(id);
  // }
  flag = false;
  modelArr = this.model;


  deleteNote(event) {
    if (event) {
      this.flag = true;

      if (this.flag) {
        this.updateList.emit(true);
      }
    }
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
        console.log("Error Occurs...");
      }
    );

    dialogRef.componentInstance.updateDialog.subscribe(() => {
      this.updateList.emit(true);
    })
  }

  // currentTick(checklist){

  // }


  checkBoxChange(checklist, item) {

    // for(var i=0; i<item.length; i++){
    //   if(item[i].id === checklist.id){
    //     if(checklist.status === "open"){
    //       for(var j=0; j<this.model.length; j++){
    //         for(var k=0; k<this.model[j].noteCheckLists.length; k++){
    //           if(checklist.id === this.model[j].noteCheckLists[k].id){
    //             this.model[j].noteCheckLists[k].status = "close";
    //           }
    //         }
    //       }
    //     }else if(checklist.status === "close"){
    //       for(var j=0; j<this.model.length; j++){
    //         for(var k=0; k<this.model[j].noteCheckLists.length; k++){
    //           if(checklist.id === this.model[j].noteCheckLists[k].id){
    //             this.model[j].noteCheckLists[k].status = "open";
    //           }
    //         }
    //       }
    //     }
    //   }
    // }
  }


  checkTick(checklist, item, i, j) {

    console.log(checklist)

    var body = {
      "itemName": this.model[i].noteCheckLists[j].itemName,
      "status": checklist.status
    }

    this.myService.httpPostJson("notes/" + this.model[i].noteCheckLists[j].notesId + "/checklist/" + this.model[i].noteCheckLists[j].id + "/update", JSON.stringify(body)).subscribe(
      response => {
        console.log("checklist Line is Successfully Updated!!");
        this.updateList.emit({})
      },
      error => {
        console.log("error Occured");
      }
    )
  }


  ngOnInit() {

    // console.log("newModel array",this.model)

    //   console.log("these is the ole model", this.modelArr)

    //   for (var i = 0; i < this.model.length; i++) {

    //     for (var j = 0; j < this.model[i].noteCheckLists.length; j++) {

    //       if (this.model[i].noteCheckLists[j].isDeleted === false) {

    //         this.newModel.push(this.model[i])
    //         console.log("list array display inner")
    //       }
    //       console.log("list array display outer")
    //     }
    //   }

    //   console.log("New Model Array is :----", this.newModel)
    // }

  }
}