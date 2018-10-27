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

  @Input() model: object;
  @Output() updateList = new EventEmitter();

  isPinned = false;

  noteId(id) {
    console.log(id);
  }
  flag = false;

  deleteNote(event) {
    if (event) {
      this.flag = true;

      if (this.flag) {
        this.updateList.emit({});
      }
    }
  }

  updateColor;

  updateBackground(event) {

    if (event) {
      this.updateList.emit({});
    }
  }

  archiveNote(event) {
    if (event) {
      this.updateList.emit({});
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
        this.updateList.emit({});
      },
      error => {
        console.log("Error Occurs...");
      }
    );

    dialogRef.componentInstance.updateDialog.subscribe(() => {
      this.updateList.emit({});
    })
  }
  

  


  ngOnInit() {



  }

}

