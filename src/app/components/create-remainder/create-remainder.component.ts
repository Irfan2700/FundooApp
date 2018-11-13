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
  saveButtonFlag = false;
  setDate;

  requestBody;
  //= {
  //   "remainder": ,
  //   "noteIdList": []
  // }

  dat = new Date();

  quickRemainder(time) {
    if (time === "8:00 PM") {
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 0, 20, 0, 0);
    } else if (time === "8:00 AM") {
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 1, 8, 0, 0);
    } else if (time === "MON, 8:00 AM") {
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
  dateArr;

  dateTimeSet() {

    // debugger;

    let reg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)$/

    if(!(reg.test(this.pickTime))){
      LoggerService.log("Time Format is Incorrect!!")

      this.saveButtonFlag = true;
      return -1;
    }

    if (this.pickTime !== '') {
      this.dateArr = this.pickTime.split(' ')
      console.log(this.dateArr)
      let timeArr = this.dateArr[0].split(':');

      let hours = Number(timeArr[0]);
      let min = Number(timeArr[1]);

      if (hours <= 12) {

      } else {
        console.log("Incorrect Hours Format")
        return;

      }

      if (min > 60) {
        return;
      } else if (min === 60) {
        min = 0;
        hours += 1;
      }
      // console.log(this.dateArr[1].toUpperCase())
      
        if (this.dateArr[1].toUpperCase() === 'AM') {

          if (hours === 12) {
            hours = 0
          } else {
            hours += 0;
          }


        } else if (this.dateArr[1].toUpperCase() === 'PM') {

          hours = hours + 12;

        }

      let finalDateTime = new Date(new Date(this.setDate).setHours(hours, min, 0, 0));

      this.saveButtonFlag = false;
      return finalDateTime;
    }else {
      this.saveButtonFlag = true;
      return -1;
    }
  }

  pickSetTime(weekday) {

    let a = this.setDate;

    console.log(new Date((new Date(a)).setHours(20, 23, 0, 0)))
    let d;

    if (weekday === "8:00 AM") {
      this.pickTime = "8:00 AM";
      d = this.dateTimeSet();
      console.log()

      // this.settingDate = new Date(d.setHours(this.pickTime))
    } else if (weekday === "1:00 PM") {
      this.pickTime = "1:00 PM";

      d = this.dateTimeSet();

    } else if (weekday === "6:00 PM") {
      this.pickTime = "6:00 PM"

      d = this.dateTimeSet();

    } else if (weekday === "8:00 PM") {

      this.pickTime = "8:00 PM"
      d = this.dateTimeSet();

    } else {

      d = this.dateTimeSet();
    }

    if(d === -1){
      return;
    }

    if (d.toISOString() !== undefined) {

      this.requestBody = {
        "reminder": d.toISOString(),
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
  }

  press(event) {
    if (event.keyCode === 13) {
      this.pickSetTime(null);
    }
  }


  customFlag = false;
  customSet() {
    this.pickTime = '';
  }

  ngOnInit() {

    this.setDate = this.date.value;

    // console.log(this.setDate)



  }
}
