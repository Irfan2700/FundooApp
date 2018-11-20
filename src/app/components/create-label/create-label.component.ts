import { Note, Label } from './../../core/Model/note';
import { LoggerService } from 'src/app/core/services/logger.service';
import { NoteServicesService } from './../../core/services/note-services.service';
import { DataShareService } from '../../core/services/data-share.service';
import { AuthService } from '../../core/services/auth.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss']
})
export class CreateLabelComponent implements OnInit {

  constructor(private auth: AuthService,
    private data: DataShareService,
    private noteService: NoteServicesService) { }

  @ViewChild('myDiv') myDiv: ElementRef;
  
  private notes: Note[] = [];
  private labels: Label[] = [];
  private labelObject: Label;
  labelInput;

  hidden = false;
  private labelId;

  editHid = false;

  private labelDisplay = [];
  labelReverseDiplay = [];
  textEdit;
  private flag = false;
  private editedName;

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
        this.labelObject[0] = response;
        this.labelDisplay.push(this.labelObject);
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

    this.noteService.deleteLabel(id).subscribe(
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
      
        
      },
      error => {
        LoggerService.log("Error Occured");
      }
    )
  }

  

  

  edit(id) {

    this.textEdit = id;
    this.flag = true;
    this.editHid = !this.editHid;


    // var body = {
    //   "label": 
    // }
    // this.myService.httpPostJson("noteLabels/"+id+"/updateNoteLabel",)

  }

  

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

        
        // this.showLabels();
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
        this.labels = response['data']['details'];
        for (var i = 0; i < this.labels.length; i++) {
          if (this.labels[i].isDeleted === false) {
            this.labelDisplay.push(this.labels[i]);
          }
        }

        var updateList = [];

        for(var i=this.labelDisplay.length-1; i>=0; i--){
          updateList.push(this.labelDisplay[i]);
          updateList.sort(function(a,b)
          {const obj1 = a.label.toUpperCase();
          const obj2 = b.label.toUpperCase();
  
          let comp = 0;
          if(obj1>obj2){
            comp = 1;
          }else if(obj1<obj2){
            comp = -1;
          }
         return comp;}
          );
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
