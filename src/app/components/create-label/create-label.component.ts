import { NoteServicesService } from './../../core/services/note-services.service';
import { DataShareService } from '../../core/services/data-share.service';
import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.css']
})
export class CreateLabelComponent implements OnInit {

  constructor(private auth: AuthService,
    private data: DataShareService,
    private noteService: NoteServicesService) { }

  @ViewChild('myDiv') myDiv: ElementRef;
  
    public labelInput;

  hidden = false;
  labelId;

  editHid = false;

  labelDisplay = [];
  labelReverseDiplay = [];

  addLabel() {

    var body = {
      "label": this.labelInput,
      "isDeleted": false,
      "userId": this.auth.getId()
    }

for(var i=0; i<this.labelDisplay.length; i++){

    if(body.label === this.labelDisplay[i].label){
      return;
    }
}
    this.noteService.createLabel(body).subscribe(
      response => {
        console.log("Label is added", response['label']);
        // console.log(this.labelDisplay)
        this.labelDisplay.push(response);
        var updateLabelDisplay = [];
        for (var i = this.labelDisplay.length - 1; i >= 0; i--) {
          updateLabelDisplay.push(this.labelDisplay[i])
        }
        this.labelReverseDiplay = updateLabelDisplay;
        this.labelInput = "";
        this.labelId = response['id'];


      },
      error => {
        // console.log("Error occured!!");
      }
    )
  }

  cross() {
    this.hidden = !this.hidden;
  }

  deleteLabel(id) {

    this.noteService.deleteLabel("noteLabels/" + id + "/deleteNoteLabel").subscribe(
      response => {
        // console.log("label deleted!!", response);
        var updatedLabel = [];
        for (var i = this.labelDisplay.length - 1; i >= 0; i--) {
          if (this.labelDisplay[i].id === id) {
            continue;
          }
          updatedLabel.push(this.labelDisplay[i]);

        }

        this.labelReverseDiplay = updatedLabel;
      
        
      }
    )
  }

  

  textEdit;
  flag = false;

  edit(id) {

    this.textEdit = id;
    this.flag = true;
    this.editHid = !this.editHid;


    // var body = {
    //   "label": 
    // }
    // this.myService.httpPostJson("noteLabels/"+id+"/updateNoteLabel",)

  }

  editedName;

  editLabel(id){

    var temp = this.myDiv.nativeElement.innerHTML
    var body = {
      "label": this.myDiv.nativeElement.innerHTML,
      "isDeleted": false,
      "id": id,
      "userId": this.auth.getId()
    }
    this.noteService.updateLabelName(id, body).subscribe(
      response => {
        console.log("Label Name Updated SuccessFully!!",response);

        

        for(var i=0; i<this.labelDisplay.length; i++){

          if(this.labelDisplay[i].id === id){
            this.labelDisplay[i].label = temp
          }
        }

        

      },
      error => {
        // console.log("Error Occured!!");
      }
    )
    
  }

  showLabels(){
    this.noteService.getNoteLabelList().subscribe(
      response => {
        // console.log("Label display", response);
        for (var i = 0; i < response['data'].details.length; i++) {
          if (response['data'].details[i].isDeleted === false) {
            this.labelDisplay.push(response['data'].details[i]);
          }
        }

        var updateList = [];

        for(var i=this.labelDisplay.length-1; i>=0; i--){
          updateList.push(this.labelDisplay[i]);
        }

        this.labelReverseDiplay = updateList;
        
        // this.data.sendData(this.labelReverseDiplay)
      },
      error => {
        // console.log("Error Occured!!");
      }
    )
  }

  ngOnInit() {
    // console.log(this.hidden)

    this.showLabels();
  }

}
