import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

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

    for(var i=0; i<this.tempArr.length; i++){
      if(this.tempArr[i].id === this.isCheck.id){
        this.tempArr[i].isChecked = false
      }
    }

    if(item.isChecked === true){

      
      this.tempArr[index].isChecked = false;
      // console.log("Unticked")
      // console.log("temARRY ", this.tempArr[index])
      this.labelAdds.emit(this.tempArr[index])
    // this.tempArr
  }else if(item.isChecked === false){
    this.tempArr[index].isChecked = true;
    // console.log("Ticked")
    // console.log("temARRY ", this.tempArr[index])
    this.labelAdds.emit(this.tempArr[index])
  }
}

ngOnChanges(changes: SimpleChanges): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  for(var i=0; i<this.tempArr.length; i++){
    if(this.tempArr[i].id === this.isCheck.id){
      this.tempArr[i].isChecked = this.isCheck.isChecked
    }
  }
}


  ngOnInit() {



    this.myService.httpGetJson("noteLabels/getNoteLabelList").subscribe(
      response => {
        // console.log("response show", response['data'].details)
        this.labelArr = response['data'].details
        // console.log("label Array",this.labelArr)
        for(var i=0; i<this.labelArr.length; i++){
          this.tempArr.push({
            "isChecked": false,
            "label": this.labelArr[i].label,
            "id": this.labelArr[i].id
          })
        }
      },
      error => {
        // console.log("Error Occured")
      }
    )

    for(var i=0; i<this.tempArr.length; i++){

      if(this.tempArr[i].id === this.isCheck.id){
        this.tempArr[i].isChecked = this.isCheck.isChecked;
      }
    }
    
  }

}
