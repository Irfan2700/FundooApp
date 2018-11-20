import { Note } from './../../core/Model/note';
import { Router } from '@angular/router';
import { NoteServicesService } from './../../core/services/note-services.service';
// import { test } from './../notes/notes.component';

import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {



  constructor(private noteService: NoteServicesService,
    private myRoute: Router) { }

  private notes: Note[] = [];
  arr = [];
  labelName;

  ngOnInit() {
    // this.showNotes();
    // this.reload();

    // this.myRoute.params.subscribe(
    //   (params: Params) => {
    //     this.labelName = params['labelName']
    //     this.getLabelNotes(this.labelName)
    //   }
    // )

    this.getReminderNotes();


  }

  getReminderNotes() {

    
    this.noteService.getReminderList().subscribe(
      response => {

        LoggerService.log(response);
        

        this.arr = [];
        this.notes = response["data"].data;
        if (this.notes.length !== 0) {
          for (var i = this.notes.length - 1; i >= 0; i--) {
            if (this.notes[i].isDeleted === false) {
              if (this.notes[i].isArchived === false) {
                if (response["data"].data[i].reminder.length !== 0) {
                  
                  this.arr.push(this.notes[i]);

                  this.arr.sort(function(a,b)
                {
                    a=new Date(a.reminder[0]);
                    b=new Date(b.reminder[0]);
                    return b-a;
                })
                  
                  // this.arr = response['data'].data;app-more-options
                }
              }
            }
          }
          
        }
      },
      error => {
        LoggerService.log("Error Occured")
      }
    )
  }

  showNotes() {
    this.noteService.getNotesList().subscribe(
      response => {
        // console.log("Data is Successfully Fetched!!", response);

        console.log("fresh", response["data"].data);

        this.arr = [];
        for (var i = response["data"].data.length - 1; i >= 0; i--) {
          if (response["data"].data[i].isDeleted === false) {
            if (response["data"].data[i].isArchived === false) {
              if (response["data"].data[i].noteLabels !== undefined) {
                this.arr.push(response["data"].data[i]);
                // this.arr = response['data'].data;app-more-options
              }
            }
          }
        }

        // console.log("the array one", this.arr);
      },
      error => {
        // console.log("Error in Data Fetching...");
      }
    );
  }



  updateNotes(event) {
    if (event) {
      // console.log("event triggered");

      this.showNotes();
    }
  }

  reload(event) {
    if (event) {
      // // console.log("delete home event triggered");
      // // this.arr = [];
      // this.reloaderUpdate.emit(event);
      // this.showNotes();
    }
  }

}

