import { UserServicesService } from 'src/app/core/services/user-services.service';
import { AuthService } from './../../core/services/auth.service';
import { Note } from './../../core/Model/note';
import { NoteServicesService } from './../../core/services/note-services.service';
import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { LoggerService } from 'src/app/core/services/logger.service';
// import { CreateRemainderComponent } from '../create-remainder/create-remainder.component'
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
  outputs: ['open']
})
export class CreateNoteComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private noteService: NoteServicesService,
    private userService: UserServicesService,
    private auth: AuthService){}
  @ViewChild('title') title: ElementRef;
  @ViewChild('desc') desc: ElementRef;

  private notes: Note[] = [];
  isPinned = false;
  noteCard = false;
  isCheckListTicked = false;
  remainder='';
  currentUserName;
  currentUserEmail;
  userAddList = [];
  searchInput;
  userSearchList;
  showCollab = false;
  updatePic;
  finalCollab = [];

  labelUpdate = []
  isCheckedLabel = {
    "id": String,
    "isChecked": false
  };

  isCheck;
  arr = [];
  dateFlag = true;


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
    // console.log("Pinn is : ", this.isPinned)
    // console.log(JSON.stringify(this.tempArr))

    for (let i = 0; i < this.labelUpdate.length; i++) {

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

    // console.log(this.tempArr.length)


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
        "labelIdList": JSON.stringify(this.labelArr),
        "reminder": this.remainder,
        "collaberators": JSON.stringify(this.finalCollab)

      }

    } else {

      requestBody = {
        "title": this.title.nativeElement.innerHTML,
        "description": this.desc.nativeElement.innerHTML,
        "isPined": this.isPinned,
        "color": this.index,
        "isArchived": this.archive,
        "labelIdList": JSON.stringify(this.labelArr),
        "reminder": this.remainder,
        "collaberators": JSON.stringify(this.finalCollab)


      }


    }

    if (requestBody.title !== '') {

      this.noteService.addNotes(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => {
          // console.log("Data Saved Successfully", data);

          // this.myroute.navigate(["home"]);
          this.title.nativeElement.innerHTML = "";
          if (this.tempArr.length === 0) {
            this.desc.nativeElement.innerHTML = "";
          }

          this.tempArr = []

          this.open.emit({});
          this.index = "#ffffff";
          // console.log("terminate")
        },
        error => {
          // console.log("Error occur");
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
        // console.log(this.array[i].isChecked)
      } else if (ele.id == this.array[i].id && this.array[i].isChecked === "close") {
        this.array[i].isChecked = "open";
        this.tempArr[i].status = "open";
        // console.log(this.array[i].isChecked)
      }
    }
  }

  array = [];

  private checkInput: any;

  isChecked = "open";
  checkText;

  private count = 0;

  updateCheckList(event){

    this.checkToggle = !this.checkToggle;
    
    console.log("check status", event)
  }

  

  nextLine(event) {

    if (event.keyCode == 13 && this.checkText !== "") {
      // console.log(this.checkText)
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
      // console.log(this.array)


    }
    

    if (event.keyCode === 46) {
      // console.log("Delete is hitting")
      this.array.pop();
      this.tempArr.pop();
    }


  }


  updateLabel(event) {
    // debugger;


    if (event) {
      if (event.isChecked === true) {
        this.labelUpdate.push(event);
        // console.log("Before reduction", this.labelUpdate)

        // console.log("Parent side is also change",this.isCheckedLabel)
      } else if (event.isChecked === false) {
        var temp = [];
        for (var i = 0; i < this.labelUpdate.length; i++) {

          if (this.labelUpdate[i].id === event['id']) {
            this.labelUpdate.splice(i, 1);
          }
          // temp.push(this.labelUpdate[i])
          // console.log("Reduce labelList", this.labelUpdate)
        }
        // this.labelUpdate = temp;

      }
    }

  }

  addReminder(event){

    if(event){

      this.remainder = event;
    }
  }

  
  removeRemainder(){

    this.remainder = '';
  }

  addCollabolater(item){

  }

  deleteCollabolater(item, index){

    this.userAddList.splice(index, 1);
    this.userAddList[index].isAdded = false;

  }

  openCollabList(event){

    this.userSearchList = [];
    if (this.searchInput !== undefined && this.searchInput !== "" && event.keyCode !== 46) {

      let requestBody = {

        "searchWord": this.searchInput
      }

      this.userService.searchUserList(requestBody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {


            this.userSearchList = response['data']['details'];
            console.log("user List result", this.userSearchList);
          }
        )
    }

  }

  personSelect(item){

    let firstLetter = item.firstName.split('');

    this.userAddList.push({
      'collaborators': item,
      'isAdded': false,
      'firstLetter': firstLetter[0],
      'proColor': this.getRandomColor(),
      'owner': false
    });
    this.searchInput = '';

  }

  closeCollab(){

    this.userAddList = [];

  }

  allAddCollab(){

    for(let i=0; i<this.userAddList.length; i++){

      this.finalCollab.push(this.userAddList[i].collaborators);
    }
    console.log("all add is here", this.finalCollab)
    
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    // console.log(color)
    return color;
  }


  ngOnInit() {

    this.currentUserName = this.auth.getUserName();
    this.currentUserEmail = this.auth.getUserEmail();
    this.updatePic = this.auth.getPic();
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }


}
