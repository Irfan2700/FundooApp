import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { EventEmitter, Output } from '@angular/core';
// import { LoggerService } from 'src/app/core/services/logger.service';
import { LoggerService } from './../../core/services/logger.service';
import { NoteServicesService } from './../../core/services/note-services.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import * as _moment from 'moment';
import * as _moment1 from 'moment'
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';

const moment = _moment || _moment1;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateAllyLabel: 'LL',
    monthYearAllyLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-create-remainder',
  templateUrl: './create-remainder.component.html',
  styleUrls: ['./create-remainder.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ]
})
export class CreateRemainderComponent implements OnInit {

  constructor(private noteService: NoteServicesService) { }

  @Input() note;
  @Output() update = new EventEmitter();

  settingDate;
  flag = false;
  date = new FormControl(moment());
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

    let reg = /^(2[0-3]|1?[0-9]|0?[1-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM)$/

    if (!(reg.test(this.pickTime))) {
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
        if (this.dateArr[1].toUpperCase() === 'PM') {

          hours = hours + 12;

        } else if (hours > 12) {

          switch (hours) {

            case 13: {
              this.pickTime = '' + 1 + ':' + min + ' ' + 'PM';
              break;
            }
            case 14: {
              this.pickTime = '' + 2 + ':' + min + ' ' + 'PM';
              break;
            }
            case 15: {
              this.pickTime = '' + 3 + ':' + min + ' ' + 'PM';
              break;
            }
            case 16: {
              this.pickTime = '' + 4 + ':' + min + ' ' + 'PM';
              break;
            }
            case 17: {
              this.pickTime = '' + 5 + ':' + min + ' ' + 'PM';
              break;
            }
            case 18: {
              this.pickTime = '' + 6 + ':' + min + ' ' + 'PM';
              break;
            }
            case 19: {
              this.pickTime = '' + 7 + ':' + min + ' ' + 'PM';
              break;
            }
            case 20: {
              this.pickTime = '' + 8 + ':' + min + ' ' + 'PM';
              break;
            }
            case 21: {
              this.pickTime = '' + 9 + ':' + min + ' ' + 'PM';
              break;
            }
            case 22: {
              this.pickTime = '' + 10 + ':' + min + ' ' + 'PM';
              break;
            }
            case 23: {
              this.pickTime = '' + 11 + ':' + min + ' ' + 'PM';
              break;
            }
            case 0: {
              this.pickTime = '' + 12 + ':' + min + ' ' + 'PM';
              break;
            }

            default: {
              this.pickTime = '' + 12 + ':' + min + ' ' + 'PM';
              break;
            }
          }

          this.dateTimeSet();

        }

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


      }

      let finalDateTime = new Date(new Date(this.setDate).setHours(hours, min, 0, 0));

      this.saveButtonFlag = false;
      return finalDateTime;
    } else {
      this.saveButtonFlag = true;
      return -1;
    }
  }

  dateDisable = {
    "time": '',
    "status": false
  }
  disableArr = [];

  pickSetTime(weekday) {

    // if (new Date(new Date(this.currentDate).getDate(), new Date(this.currentDate).getMonth(), new Date(this.currentDate).getFullYear())
    //  === new Date(new Date(this.setDate).getDate(), new Date(this.setDate).getMonth(), new Date(this.setDate).getFullYear())){

    //  if(new Date().getHours()) new Date(this.dateTimeSet()).getHours()
    //  }

    let hours = (new Date(this.dateTimeSet()).getHours());
    let min = (new Date(this.dateTimeSet()).getMinutes());

    if ((new Date(this.setDate).getFullYear() - new Date(this.currentDate).getFullYear()) === 0) {

      if ((new Date(this.setDate).getMonth() - new Date(this.currentDate).getMonth()) === 0) {
        if ((new Date(this.setDate).getDate() - new Date(this.currentDate).getDate()) === 0) {

          console.log("same date is here")

          if((new Date(this.setDate).getHours()) > 8){
            this.disableArr.push("8:00")
          }else if((new Date(this.setDate).getHours()) > 13){
            this.disableArr.push("13:00")
          }else if((new Date(this.setDate).getHours()) > 18){
            this.disableArr.push("18:00");
          }else if((new Date(this.setDate).getHours()) > 20){
            this.disableArr.push("20:00");
          }
        }
      }
    }

    let d;

    if (weekday === "8:00 AM") {
      this.pickTime = "8:00 AM";
      d = this.dateTimeSet();
      if(!(this.disableArr.indexOf("8:00"))){
        this.dateDisable = true;
      }
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

    if (d === -1) {
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
  currentDate;

  customFlag = false;
  customSet() {
    this.pickTime = '';
  }

  ngOnInit() {

    this.setDate = this.date.value;

    this.currentDate = new Date();
    // console.log(new Date(new Date(this.setDate).getDate(), new Date(this.setDate).getMonth(), new Date(this.setDate).getFullYear()))



  }
}
