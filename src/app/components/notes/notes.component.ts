import { ExpandedNotesComponent } from './../expanded-notes/expanded-notes.component';
import { MatDialog } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  @Input() model: any=[];
  @Output() updateList = new EventEmitter();

  isPinned = false;
  newModel= [];

  noteId(id) {
    console.log(id);
  }
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





  ngOnInit() {

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