import { Notes } from './../../core/Model/note';
import { Router } from '@angular/router';
import { NoteServicesService } from './../../core/services/note-services.service';
// import { test } from './../notes/notes.component';

import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private noteService: NoteServicesService,
    private myRoute: Router) { }

  notes;
  notes1;
  arr = [];
  pinnedArr = [];
  unpinnedArr = [];
  labelName;
  spinnerStatus = false;

  pinnedCase = true;
  unpinnedCase = false;

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

    
    this.noteService.getReminderList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {

        LoggerService.log(response);
        

        this.arr = [];
        this.pinnedArr = [];
        this.unpinnedArr = [];
        // this.notes = response["data"].data;
        this.notes = (response["data"].data).map((note : Notes) => new Notes().deserialize(note));
        if (this.notes.length !== 0) {
          for (var i = this.notes.length - 1; i >= 0; i--) {
            if (this.notes[i].isDeleted === false) {
              if (this.notes[i].isArchived === false) {
                if (response["data"].data[i].reminder.length !== 0) {
                  
                  if(this.notes[i].isPined === true){
                    this.pinnedArr.push(this.notes[i]);

                    this.pinnedArr.sort(function(a,b)
                {
                    a=new Date(a.reminder[0]);
                    b=new Date(b.reminder[0]);
                    return b-a;
                })
                    
                    }else{
                      this.unpinnedArr.push(this.notes[i]);

                      this.unpinnedArr.sort(function(a,b)
                {
                    a=new Date(a.reminder[0]);
                    b=new Date(b.reminder[0]);
                    return b-a;
                })
                    }

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
          this.spinnerStatus = true;
        }


      },
      error => {
        LoggerService.log("Error Occured")
      }
    )
  }

  showNotes() {
    this.noteService.getNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {
        // console.log("Data is Successfully Fetched!!", response);

        console.log("fresh", response["data"].data);
        
        this.notes1 = (response["data"].data).map((note : Notes) => new Notes().deserialize(note));

        this.arr = [];
        for (var i = this.notes1.length - 1; i >= 0; i--) {
          if (this.notes1[i].isDeleted === false) {
            if (this.notes1[i].isArchived === false) {
              if (this.notes1[i].noteLabels !== undefined) {
                this.arr.push(this.notes1[i]);
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}

