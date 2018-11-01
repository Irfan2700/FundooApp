import { Router } from '@angular/router';
import { ServicesService } from './../../services/services.service';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NotesComponent } from '../notes/notes.component';

// export interface DialogData {

//   title: string,
//   description: string,
//   id: string
// }

@Component({
  selector: 'app-expanded-notes',
  templateUrl: './expanded-notes.component.html',
  styleUrls: ['./expanded-notes.component.css']
})
export class ExpandedNotesComponent implements OnInit {

  @Output() updateDialog = new EventEmitter();

  public title;
  public description;
  constructor(private myService: ServicesService,
    public dialogRef: MatDialogRef<NotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private myRoute: Router) { }

  // public arr = this.data;

  array = [];
  tempArr = [];
  switch = false;

  updataData() {

    if (this.tempArr.length === 0) {
      this.title = document.getElementById("updateTitle").innerHTML;
      console.log(this.title);


      this.title = document.getElementById("updateTitle").innerHTML;
      //  this.description = document.getElementById("updateDesc").innerHTML;
      console.log(this.title);


      console.log("Test starts!!")
      console.log("innerHTML div", document.getElementById("updateList1").innerHTML)
      console.log("Test ends!!")

      var body;
      if (this.data.noteCheckLists.length === 0) {
        body = {
          "noteId": [this.data.id],
          "title": this.title,
          "description": this.description
        }
      }
      // else if(this.data.noteCheckLists.length === this.tempArr.length){

      //   // body = {
      //   //   "noteId": [this.data.id],
      //   //   "checklistId": ,
      //   //   "checklist": JSON.stringify(this.tempArr)
      //   // }

      // }
      this.myService.httpPostEncoded("notes/updateNotes", {
        "noteId": [this.data.id],
        "title": this.title,
        "description": this.description
      }).subscribe(
        response => {
          console.log("Data Successfully Updated!!");
          this.myRoute.navigate['note'];
        },
        error => {
          console.log("Error occured!!");
        }
      )
      this.dialogRef.close();
    }else{
      this.dialogRef.close();
    }
  }

  deleteNote(event) {
    if (event) {

      this.updateDialog.emit({});
      this.dialogRef.close();
    }
  }

  updateColor = this.data.color;

  updateBackground(event) {


    if (event) {
      this.updateColor = event;
      this.updateDialog.emit({});
    }
  }

  isChecked = "open";
  checkText;
  count = 0;


  editToggle;
  disabled = false;

  updateList(list) {

    console.log(list['id'])

    this.editToggle = list["id"];
    this.disabled = true;
  }


  currentTick(ele) {

    console.log(ele)
    for (var i = 0; i < this.array.length; i++) {

      if (ele.id == this.array[i].id) {
        if (this.array[i].isChecked === 'open') {
          this.array[i].isChecked = "close";
          this.tempArr[i].status = "close"
        } else if (this.array[i].isChecked === 'close') {
          this.array[i].isChecked = "open";
          this.tempArr[i].status = "open"
        }
      }
    }
  }

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

      this.myService.httpPostJson("notes/" + this.data.noteCheckLists[0].notesId + "/checklist/add", {
        "itemName": this.checkText,
        "status": this.isChecked
      }).subscribe(
        response => {
          console.log("The New line in the Checklist is Succeddfully Added!!");
          this.dialogRef.close();
        },
        error => {
          console.log("Error Occured")
        }
      )


      this.checkText = ''
      console.log(this.array)


    }

    if (event.keyCode === 46) {
      console.log("Delete is hitting")
      this.array.pop();
      this.tempArr.pop();
    }


  }

  updateCheckList(item) {

    // console.log(document.getElementById('update').innerHTML);
    var body = {
      "itemName": document.getElementById('update').innerHTML,
      "status": item.isChecked
    }

    this.myService.httpPostJson("notes/" + this.data.noteCheckLists[item.id].notesId + "/checklist/" + this.data.noteCheckLists[item.id].id + "/update", JSON.stringify(body)).subscribe(
      response => {
        console.log("checklist Line is Successfully Updated!!");
        this.updateDialog.emit({})
      },
      error => {
        console.log("error Occured");
      }
    )
  }

  deleteCheckList(item) {

    var body = {
      "noteId": [this.data.id],
      "checklistId": this.data.noteCheckLists[item.id].id
    }

    this.myService.httpPostJson("notes/" + this.data.noteCheckLists[item.id].notesId + "/checklist/" + this.data.noteCheckLists[item.id].id + "/remove", body).subscribe(
      response => {
        console.log("Checklist line is successfully Deleted!!");

        this.updateDialog.emit({});
        var temp = [];
        for (var i = 0; i < this.array.length; i++) {
          if (this.array[i].id === item.id) {
            continue;
          }
          temp.push(this.array[i])
        }
        console.log(temp)
        this.array = temp


      },
      error => {
        console.log("Error Occured!!");
      }
    )
  }

  // isDisabled = "disabled";
  isDisable() {
    this.disabled = false;
  }

  archiveNote(event) {
    if (event) {
      this.updateDialog.emit({});
      this.dialogRef.close();
    }
  }


  checkTick(item, i) {




    var body = {
      "itemName": item.checkText,
      "status": this.array[i].isChecked
    }
    this.myService.httpPostJson("notes/" + this.data.noteCheckLists[item.id].notesId + "/checklist/" + this.data.noteCheckLists[item.id].id + "/update", JSON.stringify(body)).subscribe(
      response => {
        console.log("checklist Line is Successfully Updated!!");

        this.updateDialog.emit({})
        this.dialogRef.close();

      },
      error => {
        console.log("error Occured");
      }
    )
  }

  tick(item) {

  }

  // updateNewCheckList() {
  //   // debugger;
  //   var body = []
  //   // console.log("I am detected")
  //   // console.log("TempARR length",this.tempArr.length);
  //   // console.log("Data length",this.data.length);
  //   // console.log("data value",this.data);

  //   if (this.tempArr.length > this.data.noteCheckLists.length) {


  //     var n = (this.tempArr.length) - (this.data.noteCheckLists.length);
  //     for (var i = 0; i < n; i++) {
  //       body.push(this.tempArr[this.tempArr.length - 1 - i]);
  //     }
  //     body.reverse();
  //     console.log("body is", body);

  //     var finalBody = {
  //       "noteId": [this.data.noteCheckLists[0].notesId],
  //       "data": JSON.stringify(body)
  //     }

  //     this.myService.httpPostJson("notes/" + this.data.noteCheckLists[0].notesId + "/checklist/add", finalBody).subscribe(
  //       response => {
  //         console.log("The New line in the Checklist is Succeddfully Added!!");
  //         this.dialogRef.close();
  //       },
  //       error => {
  //         console.log("Error Occured")
  //       }
  //     )
  //   }
  // }



  ngOnInit() {

    // var textValue = {
    //   "id": this.count,
    //   "isChecked": this.data.status,
    //   "checkText": this.array.itemName
    // }


    for (var i = 0; i < this.data.noteCheckLists.length; i++) {

      if (this.data.noteCheckLists[i].isDeleted === false) {

        this.array.push({
          "id": this.count,
          "isChecked": this.data.noteCheckLists[i].status,
          "checkText": this.data.noteCheckLists[i].itemName
        })
        this.count++;

        this.tempArr.push({
          "itemName": this.data.noteCheckLists[i].itemName,
          "status": this.data.noteCheckLists[i].status
        })
      }
    }



    console.log("Preloaded List", this.array)

  }

}
