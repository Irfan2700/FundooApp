import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from 'src/app/core/services/logger.service';
import { ServicesService } from '../../core/services/services.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-archive',
  templateUrl: './create-archive.component.html',
  styleUrls: ['./create-archive.component.scss']
})
export class CreateArchiveComponent implements OnInit {

  constructor(private myService: ServicesService,
    private noteService: NoteServicesService) { }

  @Input() note;
  @Output() reloadNote = new EventEmitter();

  flag = false;

  archiveIt() {

    if (this.note !== undefined && this.note.isArchived === false) {
      this.flag = false
      var body = {
        "isArchived": true,
        "noteIdList": [this.note.id]
      }

      this.noteService.archiveNote(body).subscribe(
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

    if (this.note !== undefined && this.note.isArchived === true) {

      this.flag = true
      var requestBody = {
        "isArchived": false,
        "noteIdList": [this.note.id]
      }

      this.noteService.archiveNote(requestBody).subscribe(
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

  ngOnInit() {
  }

}
