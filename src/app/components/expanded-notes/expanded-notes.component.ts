import { Router } from '@angular/router';
import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotesComponent } from '../notes/notes.component';

export interface DialogData {

  title: string,
  description: string,
  id: string
}

@Component({
  selector: 'app-expanded-notes',
  templateUrl: './expanded-notes.component.html',
  styleUrls: ['./expanded-notes.component.css']
})
export class ExpandedNotesComponent implements OnInit {


  public title;
  public description;
  constructor(private myService: ServicesService,
    public dialogRef: MatDialogRef<NotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
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


  ngOnInit() {

  }

}
