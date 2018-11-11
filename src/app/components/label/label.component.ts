import { NoteServicesService } from './../../core/services/note-services.service';
import { LoggerService } from './../../core/services/logger.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.css']
})
export class LabelComponent implements OnInit {

  constructor(private myRoute: ActivatedRoute,
    private noteService: NoteServicesService) { }

  arr = [];
  labelName;

  ngOnInit() {
    // this.showNotes();
    // this.reload();

    this.myRoute.params.subscribe(
      (params: Params) => {
        this.labelName = params['labelName']
        this.getLabelNotes(this.labelName)
      }
    )


  }

  getLabelNotes(item) {

    this.noteService.getNoteListByLabel(item).subscribe(
      response => {

        LoggerService.log(response);

        this.arr = [];
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

