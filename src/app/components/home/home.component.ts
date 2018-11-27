import { Note } from './../../core/Model/note';
import { DataShareService } from './../../core/services/data-share.service';
import { NoteServicesService } from './../../core/services/note-services.service';
import {
  Component, OnInit, Output, EventEmitter, Input, OnDestroy
} from "@angular/core";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private noteService: NoteServicesService,
    private dataShare: DataShareService
  ) { }

  @Output() reloaderUpdate = new EventEmitter();
  
  private notes: Note[] = [];
  isPinned;
  pinnedCase = true;
  unpinnedCase = false;
  
  // private noteCard = false;

  arr= [];
  pinnedArr = [];
  unpinnedArr = [];

  ngOnInit() {
    this.showNotes();
    // this.reload();
  }

  showNotes() {
    this.noteService.getNotesList()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {
        // console.log("Data is Successfully Fetched!!", response);

        console.log("fresh", response["data"].data);

        this.notes = response["data"].data;
        this.pinnedArr = [];
        this.unpinnedArr = [];
        this.arr = [];
        for (var i = this.notes.length - 1; i >= 0; i--) {
          if (this.notes[i].isDeleted === false) {
            if (this.notes[i].isArchived === false) {
              if(this.notes[i].isPined === true){
              this.pinnedArr.push(this.notes[i]);
              
              }else{
                this.unpinnedArr.push(this.notes[i]);
              }
              
              this.arr.push(this.notes[i]);
              // this.arr = response['data'].data;app-more-options
              
              
            }
          }
        }

        // console.log("the array one", this.arr);
        this.dataShare.sendData3(this.arr);
      },
      error => {
        // console.log("Error in Data Fetching...");
        throw error;
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
      // console.log("delete home event triggered");
      // this.arr = [];
      this.reloaderUpdate.emit(event);
      this.showNotes();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }
}
