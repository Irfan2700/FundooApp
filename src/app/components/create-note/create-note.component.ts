import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterLink, RouteReuseStrategy } from '@angular/router';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css'],
  outputs: ['open']
})
export class CreateNoteComponent implements OnInit {

  constructor(private myService: ServicesService,
    private myroute: Router) { }

  @ViewChild('title') title: ElementRef;
  @ViewChild('desc') desc: ElementRef;


  isPinned = false;
  noteCard = false;

  labelUpdate = []
  isCheckedLabel = {
    "id": String,
    "isChecked": false
  };

  isCheck;
  arr = [];


  @Output() open = new EventEmitter();

  nowColor = 1;
  index = "#ffffff";



  changeColor(paint) {
    this.nowColor = paint;


    switch (this.nowColor) {

      case 1: {
        this.index = "#ffffff";
        break;
      }
      case 2: {
        this.index = "#90ee90";
        break;
      }
      case 3: {
        this.index = "#f66ef6";
        break;
      }
      case 4: {
        this.index = "#f08080";
        break;
      }
      case 5: {
        this.index = "#05f6f6";
        break;
      }
      case 6: {
        this.index = "#ffb6c1";
        break;
      }
      case 7: {
        this.index = "#ffad33";
        break;
      }
      case 8: {
        this.index = "#add8e6";
        break;
      }
      case 9: {
        this.index = "#c68c53";
        break;
      }
      case 10: {
        this.index = "#ffff81";
        break;
      }
      case 11: {
        this.index = "#a9a9d6";
        break;
      }
      case 12: {
        this.index = "#d9d9d9";
        break;
      }

      default: {
        this.index = "#ffffff";
      }
    }
  }
  tempArr = [];
  archive = false;
  labelArr = [];

  archiveIt() {

    if (this.title.nativeElement.innerHTML !== "") {
      if (this.desc.nativeElement.innerHTML !== "") {

        this.archive = true;
        this.addNote();
      }
    }
  }
  temp: any;

 
  

  addNote() {
    // console.log(this.title);
    // console.log(this.desc);
    console.log("Pinn is : ", this.isPinned)
    console.log(JSON.stringify(this.tempArr))

    for(let i=0; i<this.labelUpdate.length; i++){

      this.labelArr.push(this.labelUpdate[i].id)
    }

    // if(this.tempArr.length !== 0){
    //   document.getElementById("desc").innerHTML = ""
    // }
    // this.temp = "[";
    // for(var i=0; i<this.tempArr.length-1; i++){
    //   this.temp += "{itemName:"+"},"
    // }
    // this.temp += "]";

    console.log(this.tempArr.length)


    let requestBody;

    if (this.tempArr.length !== 0) {

      // if(this.title.nativeElement.innerHTML === null){
      //   return
      // }
      requestBody = {
        "title": this.title.nativeElement.innerHTML,
        "isPined": this.isPinned,
        "color": this.index,
        "isArchived": this.archive,
        "checklist": JSON.stringify(this.tempArr),
        "labelIdList": JSON.stringify(this.labelArr)
        
      }

    } else {

      requestBody = {
        "title": this.title.nativeElement.innerHTML,
        "description": this.desc.nativeElement.innerHTML,
        "isPined": this.isPinned,
        "color": this.index,
        "isArchived": this.archive,
        "labelIdList": JSON.stringify(this.labelArr)


      }


    }

    if (requestBody.title !== '') {

      this.myService.httpPostEncoded("notes/addNotes", requestBody).subscribe(
        data => {
          console.log("Data Saved Successfully", data);

          // this.myroute.navigate(["home"]);
          this.title.nativeElement.innerHTML = "";
          if (this.tempArr.length === 0) {
            this.desc.nativeElement.innerHTML = "";
          }

          this.tempArr = []

          this.open.emit({});
          console.log("terminate")
        },
        error => {
          console.log("Error occur");
        }
      )
    }
  }

  checkToggle = false;

  currentTick(ele) {
    // debugger;
    for (var i = 0; i < this.array.length; i++) {

      if (ele.id == this.array[i].id && this.array[i].isChecked === "open") {

        this.array[i].isChecked = "close";
        this.tempArr[i].status = "close";
        console.log(this.array[i].isChecked)
      } else if (ele.id == this.array[i].id && this.array[i].isChecked === "close") {
        this.array[i].isChecked = "open";
        this.tempArr[i].status = "open";
        console.log(this.array[i].isChecked)
      }
    }
  }

  array = [];

  checkInput: any;

  isChecked = "open";
  checkText;

  count = 0;



  nextLine(event) {

    if (event.keyCode == 13 && this.checkText !== "") {
      console.log(this.checkText)
      var textValue = {
        "id": this.count,
        "isChecked": this.isChecked,
        "checkText": this.checkText
      }
      this.array.push(textValue)
      this.count++;



      this.tempArr.push({
        "itemName": this.checkText,
        "status": this.isChecked
      })


      this.checkText = ''
      console.log(this.array)


    }

    if (event.keyCode === 46) {
      console.log("Delete is hitting")
      this.array.pop();
      this.tempArr.pop();
    }


  }

  // removeLabelChip(item, i){

  //   // debugger;

  //   if(item.isChecked === true){
  //     item.isChecked = false;
  //    this.labelUpdate[i].isChecked = false;
  //   this.labelUpdate.splice(i,1);
  //   this.isCheckedLabel.id = item.id;
  //   this.isCheckedLabel.isChecked = item.isChecked;
  //   console.log("removing chip", this.labelUpdate)
  //   }
  // }

  updateLabel(event) {
    // debugger;


    if (event) {
      if (event.isChecked === true) {
        this.labelUpdate.push(event);
        console.log("Before reduction", this.labelUpdate)

        // console.log("Parent side is also change",this.isCheckedLabel)
      } else if (event.isChecked === false) {
        var temp = [];
        for (var i = 0; i < this.labelUpdate.length; i++) {

          if (this.labelUpdate[i].id === event['id']) {
            this.labelUpdate.splice(i, 1);
          }
          // temp.push(this.labelUpdate[i])
          console.log("Reduce labelList", this.labelUpdate)
        }
        // this.labelUpdate = temp;

      }
    }

  }




  ngOnInit() {
  }


}
