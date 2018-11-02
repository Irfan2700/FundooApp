import { ServicesService } from './../services/services.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DataShareService } from '../services/data-share.service';

@Component({
  selector: 'app-creat-note-more-option',
  templateUrl: './creat-note-more-option.component.html',
  styleUrls: ['./creat-note-more-option.component.css']
})
export class CreatNoteMoreOptionComponent implements OnInit {

  constructor(private myService: ServicesService) { }

  @Input() isCheck;
  @Output() labelAdds = new EventEmitter();

  labelArr;
  tempArr = [];
  

  addlabel(item, index){
// debugger;
    if(item.isChecked === true){

      
      this.tempArr[index].isChecked = false;
      console.log("Unticked")
      console.log("temARRY ", this.tempArr)
      this.labelAdds.emit(this.tempArr[index])
    // this.tempArr
  }else if(item.isChecked === false){
    this.tempArr[index].isChecked = true;
    console.log("Ticked")
    this.labelAdds.emit(this.tempArr[index])
  }
}



  ngOnInit() {



    this.myService.httpGetJson("noteLabels/getNoteLabelList").subscribe(
      response => {
        console.log("response show", response['data'].details)
        this.labelArr = response['data'].details
        console.log("label Array",this.labelArr)
        for(var i=0; i<this.labelArr.length; i++){
          this.tempArr.push({
            "isChecked": false,
            "label": this.labelArr[i].label,
            "id": this.labelArr[i].id
          })
        }
      },
      error => {
        console.log("Error Occured")
      }
    )

    for(var i=0; i<this.tempArr.length; i++){

      if(this.tempArr[i].id === this.isCheck.id){
        this.tempArr[i].isChecked = this.isCheck.isChecked;
      }
    }
    
  }

}
