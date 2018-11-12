import { LoggerService } from './../../core/services/logger.service';
import { NoteServicesService } from './../../core/services/note-services.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-remainder',
  templateUrl: './create-remainder.component.html',
  styleUrls: ['./create-remainder.component.scss']
})
export class CreateRemainderComponent implements OnInit {

  constructor(private noteService: NoteServicesService) { }

  settingDate;
  flag = false;
  date = new FormControl(new Date());
  pickTime = "6:00 AM";
  
  setDate;

  requestBody = {
    "remainder": this.settingDate,
    "noteIdList": []
  }

  dat = new Date();
  

  pickSetTime(weekday){
    if(weekday === "Morning"){
      this.pickTime = "8:00 AM";
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
    this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 0, 20, 0, 0);

    // this.remainder.remainderDate = this.settingDate;
    // this.remainder.remainderTime = ;

    this.noteService.addRemainder(this.settingDate).subscribe(
      response => {
        LoggerService.logObj("remainder is successfully added to the Note", response)
      }
    )
  }

  ngOnInit() {
    // console.log(this.date)
    
    this.setDate = this.date.value;
    // LoggerService.logObj("testing processing", this.setDate)
  }


}
