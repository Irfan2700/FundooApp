import { Note } from './../../core/Model/note';
import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from './../../core/services/logger.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private noteService: NoteServicesService) { }

  private notes: Note[] = [];
  arr = [];
  private archiveList;

  pinnedArr = [];
  unpinnedArr = [];
  pinnedCase = true;
  unpinnedCase = false;

  showArchives() {

    this.noteService.getNoteArchiveList()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          // console.log("Archive Success");
          this.arr = [];
          this.pinnedArr = [];
          this.unpinnedArr = [];
          LoggerService.log("Archive Notes Fetching Successful!!");
          LoggerService.log(response);
          this.notes = response['data'].data;

          for (let i = 0; i < this.notes.length; i++) {

            if (this.notes[i].isDeleted === false) {
              if (this.notes[i].isArchived === true) {

                if (this.notes[i].isPined === true) {
                  this.pinnedArr.push(this.notes[i]);

                } else {
                  this.unpinnedArr.push(this.notes[i]);
                }

                this.arr.push(this.notes[i]);
              }
            }
          }
          // this.arr = this.notes;
        },
        error => {
          // console.log("Error Occurs");
          LoggerService.log("Error Occured!!");
        }
      )

  }

  updateNotes(event) {
    if (event) {
      // console.log("event triggered");

      this.showArchives();
    }
  }

  reload(event) {
    if (event) {
      // // console.log("delete home event triggered");
      // // this.arr = [];
      // this.reloaderUpdate.emit(event);
      this.showArchives();
    }
  }

  ngOnInit() {
    this.showArchives();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.


    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }


}
