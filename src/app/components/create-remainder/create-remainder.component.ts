import { EventEmitter, Output } from '@angular/core';
// import { LoggerService } from 'src/app/core/services/logger.service';
import { LoggerService } from './../../core/services/logger.service';
import { NoteServicesService } from './../../core/services/note-services.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-remainder',
  templateUrl: './create-remainder.component.html',
  styleUrls: ['./create-remainder.component.scss']
})
export class CreateRemainderComponent implements OnInit {

  constructor(private noteService: NoteServicesService) { }

  @Input() note;
  @Output() update = new EventEmitter();

  settingDate;
  flag = false;
  date = new FormControl(new Date());
  pickTime = "6:00 AM";
  
  setDate;

   requestBody; 
   //= {
  //   "remainder": ,
  //   "noteIdList": []
  // }

  dat = new Date();

  quickRemainder(time){
    if(time === "8:00 PM"){
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 0, 20, 0, 0);
    }else if(time === "8:00 AM"){
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 1, 8, 0, 0);
    }else if(time === "MON, 8:00 AM"){
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 7, 8, 0, 0);
    }

    this.requestBody = {
      "reminder": this.settingDate,
      "noteIdList": [this.note.id]
    }

    this.noteService.addRemainder(this.requestBody).subscribe(
      response => {
        LoggerService.logObj("the remainder is added successfully", response)
        this.update.emit({});
      },
      error => {
        LoggerService.log("Error Occured!!");
      }
    )
  }
  

  pickSetTime(weekday){
    
    // this.setDate.

    if(weekday === "Morning"){
      this.pickTime = "8:00 AM";

      this.settingDate = new Date()
    }else if(weekday === "Afternoon"){
      this.pickTime = "1:00 PM";
    }else if(weekday === "Evening"){
      this.pickTime = "6:00 PM"
    }else {
      this.pickTime = "8:00 PM"
    }
  }

  remainder = {
    "remainderDate": this.setDate,
    "remainderTime": this.pickTime
  }

  today(){
    // this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 0, 20, 0, 0);

    // this.remainder.remainderDate = this.settingDate;
    // this.remainder.remainderTime = ;

    // this.noteService.addRemainder(this.settingDate).subscribe(
    //   response => {
    //     LoggerService.logObj("remainder is successfully added to the Note", response)
    //   }
    // )
  }

  ngOnInit() {
    // console.log(this.date.value.toISOString())
    let d = new Date(2017,11,3,20,23,0,0);
    console.log(d.toISOString())
    console.log(d)
    
    this.setDate = this.date;

    // LoggerService.logObj("testing processing", this.setDate)
  }


}
