import { AuthService } from './../../services/auth.service';
import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.css']
})
export class MoreOptionsComponent implements OnInit {

  constructor(private myService: ServicesService,
    private auth: AuthService,
    private data: DataShareService) { }

    @Input() note;
    @Output() update = new EventEmitter();

    labelArr;

  delete(){

    var body = {
      "isDeleted": true,
      "noteIdList": [this.note.id]
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
  // flag = false;

  addlabelNotes(item){

    console.log("here are the Notes",this.note)

    
  }


  ngOnInit() {

    this.data.showData1.subscribe(
      data => {
        // console.log(data)
        this.labelArr = data['data'].details;
        
      })
    
    
  }

}
