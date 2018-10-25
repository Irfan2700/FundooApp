import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor() { }

  @Input() model: object;
  @Output() updateList = new EventEmitter();

  noteId(id){
    console.log(id);
  }
  flag = false;

  deleteNote(event){
    if(event){
      this.flag = true;

      if(this.flag){
        this.updateList.emit({});
      }
    }
  }

  updateColor;

  updateBackground(event){

    if(event){
      this.updateList.emit({});
    }
  }


  ngOnInit() {



  }

}

