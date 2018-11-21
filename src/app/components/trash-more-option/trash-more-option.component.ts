import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from './../../core/services/logger.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-trash-more-option',
  templateUrl: './trash-more-option.component.html',
  styleUrls: ['./trash-more-option.component.scss']
})
export class TrashMoreOptionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() note;
  @Output() update = new EventEmitter();

  constructor(private noteService: NoteServicesService) { }

  restore(){

    let requestBody = {
      "isDeleted": false,
      "noteIdList": [this.note.id]
    }

    this.noteService.trashNotes(requestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {

        LoggerService.log(response)
        this.update.emit({})
      },
      error => {
        LoggerService.log("Error Occured");
      }

    )

  }

  perDelete(){

   let requestBody = {
    "noteIdList": [this.note.id]
   }

   this.noteService.deleteNoteForever(requestBody)
   .pipe(takeUntil(this.destroy$))
   .subscribe(
     response => {

      LoggerService.log("Note is Permanently Deleted!!");
      this.update.emit({})
     },
     error => {
       LoggerService.log("Error Occured");
     }
   )

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}
