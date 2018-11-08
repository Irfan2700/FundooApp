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
    @Output() updateLabel = new EventEmitter();
    // @Output() updateLabelList = new EventEmitter();

    labelArr = [];
    labelUpdate;

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
        // console.log("Error Occured");
      }
    )

  }
  // flag = false;
  

  addlabelNotes(item,index){

    // console.log("here are the Notes",this.note)
    
    if(item.isChecked === false){

      this.labelArr[index].isChecked = false;

      this.myService.httpPostJson("notes/"+this.note.id+"/addLabelToNotes/"+item.labelInfo.id+"/add",null).subscribe(
        response => {

          // console.log("Label added Successfull",response);
          // console.log("labelArr .... ", this.labelArr)
          this.updateLabel.emit(this.labelArr);
          this.update.emit({});
        },
        error => { }
      )

    }else if(item.isChecked === true){

      this.labelArr[index].isChecked = true;

      this.myService.httpPostJson("notes/"+this.note.id+"/addLabelToNotes/"+item.labelInfo.id+"/remove",null).subscribe(
        response => {

          // console.log("Label remove Successfull",response);
          this.updateLabel.emit(this.labelArr);
          this.update.emit({});
        },
        error => { }
      )

    }

    
  }


  ngOnInit() {

    this.data.showData1.subscribe(
      data => {
        // console.log(data)
        for(let i=0; i<data['data'].details.length; i++){
        this.labelArr.push({
          "labelInfo": data['data'].details[i],
          "isChecked": false
        })
        }
        this.updateLabel.emit(this.labelArr);
      })
      // console.log("this the note ",this.note)
    
    for(let i=0; i<this.labelArr.length; i++){
      if(this.note.noteLabels !== undefined){
      for(let j=0; j<this.note.noteLabels.length; j++){
        
        if(this.note.noteLabels[j].id === this.labelArr[i].labelInfo.id){
          this.labelArr[i].isChecked = true;
        }
      }
      }
    }
   }

}
