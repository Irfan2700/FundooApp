import { Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.css']
})
export class TrashComponent implements OnInit {

  
  constructor(private myService: ServicesService) { }

  arr = [];
  labelName;

  ngOnInit() {
    this.showNotes();
    // this.reload();

  }


  showNotes() {
    this.myService.httpGetJson("notes/getTrashNotesList").subscribe(
      response => {
        // console.log("Data is Successfully Fetched!!", response);

        console.log("fresh", response["data"].data);

        this.arr = [];
        for (var i = response["data"].data.length - 1; i >= 0; i--) {
          if (response["data"].data[i].isDeleted === true) {
            
                this.arr.push(response["data"].data[i]);
                // this.arr = response['data'].data;app-more-options
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
      this.showNotes();
    }
  }

}
