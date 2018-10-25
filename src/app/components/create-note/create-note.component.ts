import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router, RouterLink, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
  outputs:['open']
})
export class CreateNoteComponent implements OnInit {

  constructor(private myService: ServicesService,
    private myroute: Router) { }

  isPinned = false;
  noteCard = false;

  arr = [];


  @Output() open = new EventEmitter();


  addNote(){
    // console.log(this.title);
    // console.log(this.desc);

    var body = {
      "title": document.getElementById("title").innerHTML,
      "description": document.getElementById("desc").innerHTML,
      "isPined": this.isPinned
    }

    this.myService.httpPostEncoded("notes/addNotes", body).subscribe(
      data => {
        console.log("Data Saved Successfully", data);

        // this.myroute.navigate(["home"]);
        console.log("chns calllll")


      this.open.emit({});
        console.log("terminate")
      },
      error => {
        console.log("Error occur");
      }
    )



    // this.myService.get("notes/getNotesList").subscribe(
    //   response => {
    //     console.log("Data is Successfully Fetched!!",response);

    //     console.log(response['data'].data)

    //     for(var i=0; i<response['data'].data.length; i++){
    //       this.arr.push(response['data'].data[i])
    //     }

    //     console.log(this.arr);
    //   },
    //   error => {
    //     console.log("Error in Data Fetching...")
    //   }
    // )

  }

  ngOnInit() {
  }

}
