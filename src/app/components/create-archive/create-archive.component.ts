import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-create-archive',
  templateUrl: './create-archive.component.html',
  styleUrls: ['./create-archive.component.css']
})
export class CreateArchiveComponent implements OnInit {

  constructor(private myService: ServicesService) { }

  @Input() archiveInput: string;
  @Output() reloadNote = new EventEmitter();

  archiveIt(){

    var body = {
      "isArchived": true,
      "noteIdList": [this.archiveInput]
    }

    this.myService.httpPostJson("notes/archiveNotes", body).subscribe(
      response => {
        // console.log("Note Successfully archived");

        this.reloadNote.emit({});

      },
      error => {
        // console.log("Error is occur");
      }
    )
  }

  ngOnInit() {
  }

}
