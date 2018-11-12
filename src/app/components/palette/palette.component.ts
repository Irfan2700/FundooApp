import { NoteServicesService } from './../../core/services/note-services.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-palette',
  templateUrl: './palette.component.html',
  styleUrls: ['./palette.component.css']
})
export class PaletteComponent implements OnInit {

  @Input() newColor;
  @Output() resp = new EventEmitter();

  constructor(private noteService: NoteServicesService) { }

  nowColor = 1;
  index;

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
    // this.resp.emit(this.nowColor);

    var body = {
      "color": this.index,
      "noteIdList":[this.newColor.id]
    }

    this.noteService.changeNoteColor(body).subscribe(
      response => {
        // console.log("colour change successfully", this.newColor);
        this.resp.emit(this.index);
      },
      error => {
        // console.log("error occur")
      }
    )

  }
  ngOnInit() {
  }

}
