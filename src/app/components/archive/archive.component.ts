import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from './../../core/services/logger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(
    private noteService: NoteServicesService) { }

  arr=[];
  archiveList;

  showArchives(){

    this.noteService.getNoteArchiveList().subscribe(
      response => {
        // console.log("Archive Success");
        LoggerService.log("Archive Notes Fetching Successful!!");
        LoggerService.log(response);

        this.arr = response['data'].data
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

}
