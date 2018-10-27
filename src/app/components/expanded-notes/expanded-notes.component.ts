import { Router } from '@angular/router';
import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotesComponent } from '../notes/notes.component';

// export interface DialogData {

//   title: string,
//   description: string,
//   id: string
// }

@Component({
  selector: 'app-expanded-notes',
  templateUrl: './expanded-notes.component.html',
  styleUrls: ['./expanded-notes.component.css']
})
export class ExpandedNotesComponent implements OnInit {

  @Output() updateDialog = new EventEmitter();

  public title;
  public description;
  constructor(private myService: ServicesService,
    public dialogRef: MatDialogRef<NotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myRoute: Router) { }

  // public arr = this.data;



  updataData(){
    // this.title = document.getElementById("updateTitle").innerHTML;
    // console.log(this.title);

    
     this.title =  document.getElementById("updateTitle").innerHTML;
     this.description = document.getElementById("updateDesc").innerHTML;
    console.log(this.title, this.description);

    this.myService.httpPostEncoded("notes/updateNotes",{
      "noteId": [this.data.id],
      "title": this.title,
      "description":this.description
    }).subscribe(
      response => {
        console.log("Data Successfully Updated!!");
        this.myRoute.navigate['note'];
      },
      error => {
        console.log("Error occured!!");
      }
    )
    this.dialogRef.close();
  }

  deleteNote(event) {
    if (event) {
     
        this.updateDialog.emit({});
        this.dialogRef.close();
    }
  }

  updateColor = this.data.color;

  updateBackground(event) {

    
    if (event) {
      this.updateColor = event;
      this.updateDialog.emit({});
    }
  }

  archiveNote(event) {
    if (event) {
      this.updateDialog.emit({});
      this.dialogRef.close();
    }
  }



  ngOnInit() {

  }

}
