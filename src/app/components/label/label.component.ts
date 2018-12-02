import { Note } from './../../core/Model/note';
import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from './../../core/services/logger.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private myRoute: ActivatedRoute,
    private noteService: NoteServicesService) { }

  arr = [];
  labelName;
  private notes: Note[] = [];
  spinnerStatus = false;

  ngOnInit() {
    // this.showNotes();
    // this.reload();

    this.myRoute.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      (params: Params) => {
        this.labelName = params['labelName']
        this.getLabelNotes(this.labelName)
        this.spinnerStatus = true;
      }
    )


  }

  getLabelNotes(item) {

    this.noteService.getNoteListByLabel(item)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {

        LoggerService.log(response);
        this.spinnerStatus = true;
        this.arr = [];
        this.notes = response["data"].data;
        if (response["data"].data.length !== 0) {
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
        this.spinnerStatus = true;
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }
}

