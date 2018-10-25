import { AuthService } from './../../services/auth.service';
import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.css']
})
export class MoreOptionsComponent implements OnInit {

  constructor(private myService: ServicesService,
    private auth: AuthService) { }

    @Input() noteId: string
    @Output() update = new EventEmitter();

  delete(){

    var body = {
      "isDeleted": true,
      "noteIdList": [this.noteId]
    }

    this.myService.httpPostJson("notes/trashNotes", body).subscribe(
      response => {

        console.log("Note Deleted Successfully!!...");

        this.update.emit({});
      },
      error => {
        console.log("Error Occured");
      }
    )

  }

  ngOnInit() {
  }

}
