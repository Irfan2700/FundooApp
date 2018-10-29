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

  nowColor = 1;
  index = "#ffffff";

  

  changeColor(paint){
    this.nowColor = paint;


    switch(this.nowColor){

      case 1: {
        this.index = "#ffffff";
        break;
      }
      case 2: {
        this.index = "#90ee90";
        break;
      }
      case 3: {
        this.index = "#f66ef6";
        break;
      }
      case 4: {
        this.index = "#f08080";
        break;
      }
      case 5: {
        this.index = "#05f6f6";
        break;
      }
      case 6: {
        this.index = "#ffb6c1";
        break;
      }
      case 7: {
        this.index = "#ffad33";
        break;
      }
      case 8: {
        this.index = "#add8e6";
        break;
      }
      case 9: {
        this.index = "#c68c53";
        break;
      }
      case 10: {
        this.index = "#ffff81";
        break;
      }
      case 11: {
        this.index = "#a9a9d6";
        break;
      }
      case 12: {
        this.index = "#d9d9d9";
        break;
      }

      default: {
        this.index = "#ffffff";
      }
    }
  }

  archive = false;

  archiveIt(){

    if(document.getElementById("title").innerHTML !== ""){
      if(document.getElementById("desc").innerHTML !== ""){

        this.archive = true;
        this.addNote();
      }
    }
  }

  addNote(){
    // console.log(this.title);
    // console.log(this.desc);
    console.log("Pinn is : ", this.isPinned)

    var body = {
      "title": document.getElementById("title").innerHTML,
      "description": document.getElementById("desc").innerHTML,
      "isPined": this.isPinned,
      "color": this.index,
      "isArchived": this.archive
    }

    this.myService.httpPostEncoded("notes/addNotes", body).subscribe(
      data => {
        console.log("Data Saved Successfully", data);

        // this.myroute.navigate(["home"]);
        document.getElementById("title").innerHTML = "";
        document.getElementById("desc").innerHTML = "";
       

      this.open.emit({});
        console.log("terminate")
      },
      error => {
        console.log("Error occur");
      }
    )
  }

  count = 0;
  array = [];

  checkInput: any;
  textValue: string = '';

  nextLine(event){
    
    if(event.keyCode == 13){
      console.log(this.textValue)
    this.array.push(this.textValue)
    this.textValue = ''
    }
    
  }
  

  ngOnInit() {
  }
  

}
