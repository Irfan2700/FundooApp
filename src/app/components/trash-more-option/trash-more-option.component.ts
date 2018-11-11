import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from './../../core/services/logger.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trash-more-option',
  templateUrl: './trash-more-option.component.html',
  styleUrls: ['./trash-more-option.component.css']
})
export class TrashMoreOptionComponent implements OnInit {

  @Input() note;
  @Output() update = new EventEmitter();

  constructor(private noteService: NoteServicesService) { }

  restore(){

    let requestBody = {
      "isDeleted": false,
      "noteIdList": [this.note.id]
    }

    this.noteService.trashNotes(requestBody).subscribe(
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

   this.noteService.deleteNoteForever(requestBody).subscribe(
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

}
