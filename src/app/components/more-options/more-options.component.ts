import { NoteServicesService } from './../../core/services/note-services.service';
import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DataShareService } from 'src/app/core/services/data-share.service';

@Component({
  selector: 'app-more-options',
  templateUrl: './more-options.component.html',
  styleUrls: ['./more-options.component.scss']
})
export class MoreOptionsComponent implements OnInit {

  constructor(private auth: AuthService,
    private data: DataShareService,
    private noteService: NoteServicesService) { }

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

    this.noteService.trashNotes(body).subscribe(
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

      this.noteService.addLabelToNotes(this.note.id, item.labelInfo.id).subscribe(
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

      this.noteService.removeLabelFromNotes(this.note.id, item.labelInfo.id).subscribe(
        response => {

          // console.log("Label remove Successfull",response);
          this.updateLabel.emit(this.labelArr);
          this.update.emit({});
        },
        error => { }
      )

    }

    
  }

  removeLabelCancel(respo){
    
    for(let i=0; i<this.labelArr.length; i++){
      if(respo['noteLabels'] !== undefined){
      //  debugsger;
      
        console.log("i am here")
        if(respo['id'] === this.labelArr[i].labelInfo.id){
          this.labelArr[i].isChecked = false;

          console.log("id is", respo['id'])
          this.noteService.removeLabelFromNotes(this.note.id,respo['id']).subscribe(
            response => {
    
              // console.log("Label remove Successfull",response);
              this.updateLabel.emit(this.labelArr);
              this.update.emit({});
            },
            error => { }
          )
        }
      }
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

    this.data.showDate5.subscribe(
      respo => {
        // debugger;
        // console.log("respo iss here", respo)
        
        this.removeLabelCancel(respo)

      }
    )
   }

}
