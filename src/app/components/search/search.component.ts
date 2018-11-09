import { ServicesService } from './../../core/services/services.service';
import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../../core/services/data-share.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private dataService: DataShareService, public service: ServicesService) { }
  // public message;
  public searchInput;
  ngOnInit() {
        this.dataService.showData2.subscribe(message => { 
      this.searchInput = message 
      console.log(this.searchInput, "search component");
    })   
    this.getNotes();
  }
  public notes = [];
  public getNotes() {
    this.service.httpGetJson("notes/getNotesList").subscribe(response => {
      if (response) {
        // this.notes = [];
        //whenever  the api call is a success,push the response into an array
        for (var i = response['data'].data.length - 1; i >= 0; i--) {
          if (response['data'].data[i].isDeleted == false && response['data'].data[i].isArchived == false) {
            this.notes.push(response['data'].data[i])
          }
        }
        // console.log("array", this.notes)

      }
    })
  }

}
