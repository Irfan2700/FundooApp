import { DataShareService } from 'src/app/core/services/data-share.service';
import { Notes } from './../../core/Model/note';
import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from 'src/app/core/services/logger.service';
import { ServicesService } from '../../core/services/services.service';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-create-archive',
  templateUrl: './create-archive.component.html',
  styleUrls: ['./create-archive.component.scss']
})
export class CreateArchiveComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private myService: ServicesService,
    private noteService: NoteServicesService,
    private dataShare: DataShareService) { }

  @Input() note;
  // @Input('isArchive') isArchive:boolean;
  @Output() reloadNote = new EventEmitter();

  private notes: Notes[] = [];
  flag = false;
  archiveStatus;
  noteArr = [];

  archiveIt() {

    if (this.note !== undefined && this.note.isArchived === false) {
      this.flag = false
      var body = {
        "isArchived": true,
        "noteIdList": [this.note.id]
      }

      this.noteService.archiveNote(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          // console.log("Note Successfully archived");

          this.reloadNote.emit({});

        },
        error => {
          // console.log("Error is occur");
        }
      )
    }
  }

  unArchiveIt() {
    // debugger;

    if (this.note !== undefined && this.note.isArchived === true) {

      this.flag = true
      var requestBody = {
        "isArchived": false,
        "noteIdList": [this.note.id]
      }

      this.noteService.archiveNote(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          // console.log("Note Successfully archived");
          LoggerService.log("Note Successfully archived");
          this.reloadNote.emit({});

        },
        error => {
          // console.log("Error is occur");
          LoggerService.log("Error Occured");
        }
      )
    }
  }
  arrays = [];
  ngOnInit() {
    
    // this.noteArr.push(this.note)

    // // this.noteArr.push(this.arrays)

    // this.flag = this.note.isArchive
    // console.log("OnChange test",this.isArchive)
  }

  

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}
