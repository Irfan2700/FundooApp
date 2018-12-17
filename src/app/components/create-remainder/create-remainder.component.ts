import { Notes } from './../../core/Model/note';
import { DataShareService } from './../../core/services/data-share.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { EventEmitter, Output, OnDestroy } from '@angular/core';
// import { LoggerService } from 'src/app/core/services/logger.service';
import { LoggerService } from './../../core/services/logger.service';
import { NoteServicesService } from './../../core/services/note-services.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


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
export class CreateRemainderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private noteService: NoteServicesService,
    private dataShare: DataShareService) { }

  @Input() note;
  @Output() update = new EventEmitter();
  @Output() addDate = new EventEmitter();
  @Input() allowDate;
// allowDate = false;
  // note;
  private noteObject: Notes = this.note;
  private settingDate;
  flag = false;
  date = new FormControl(moment());
  pickTime = "9:00 PM";
  saveButtonFlag = false;
  setDate;
  private isoFomatedDateTime;

  requestBody;
  //= {
  //   "remainder": ,
  //   "noteIdList": []
  // }

  dat = new Date();

  
  dateArr;

  public dateTimeSet() {

    // debugger;

    let reg = /^(2[0-3]|1?[0-9]|0?[1-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/

    if (!(reg.test(this.pickTime))) {
      LoggerService.log("Time Format is Incorrect!!")

      // this.saveButtonFlag = true;
      return -1;
    }



    if (this.pickTime !== '') {
      this.dateArr = this.pickTime.split(' ')
      // console.log(this.dateArr)
      let dummy = this.dateArr[1]
      let timeArr = this.dateArr[0].split(':');

      let hours = Number(timeArr[0]);
      let min = Number(timeArr[1]);

      if (hours < 12) {
        if (this.dateArr[1].toUpperCase() === 'PM') {

          if (hours === 12) {
            hours = 0
          } else {
          hours += 12;
          }

        }else if (this.dateArr[1].toUpperCase() === 'AM') {

          if (hours === 12) {
            hours = 0
          } else {
            hours += 0;
          }
  
        }

      } else {
          if (hours > 12) {

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

      

      let finalDateTime = new Date(new Date(this.setDate).setHours(hours, min, 0, 0));

      // this.saveButtonFlag = false;
      return finalDateTime;
    } else {
      // this.saveButtonFlag = true;
      return -1;
    }
  }



  dateDisable1 = false;
  dateDisable2 = false;
  dateDisable3 = false;
  dateDisable4 = false;
  //   "time": '',
  //   "status": false
  // }
  disableArr = [];

  // isoFomatedDateTime;

  pickSetTime(weekday) {
    

    // if (new Date(new Date(this.currentDate).getDate(), new Date(this.currentDate).getMonth(), new Date(this.currentDate).getFullYear())
    //  === new Date(new Date(this.setDate).getDate(), new Date(this.setDate).getMonth(), new Date(this.setDate).getFullYear())){

    //  if(new Date().getHours()) new Date(this.dateTimeSet()).getHours()
    //  }


    let d;

    if (weekday === "8:00 AM") {
      this.pickTime = "8:00 AM";
      d = this.dateTimeSet();

      // this.dateDisable1 = true;

      // console.log()

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

    this.isoFomatedDateTime = d.toISOString();
    this.addDate.emit(this.isoFomatedDateTime);

    if (!(this.allowDate === true)) {
      if (d.toISOString() !== undefined) {

        if (!(this.allowDate === true)) {
        this.requestBody = {
          "reminder": d.toISOString(),
          "noteIdList": [this.note.id]
        }
      }

        this.noteService.addRemainder(this.requestBody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {
            LoggerService.logObj("the remainder is added successfully", response)
            this.update.emit(this.requestBody.reminder);
          },
          error => {
            LoggerService.log("Error Occured!!");
          }
        )



      }
    }
  }

  press(event) {
    if (event.keyCode === 13) {
      this.pickSetTime(null);
    }


  }

  disableSave(event) {

    this.saveButtonFlag = false;

    // if (!((event.keyCode === 16) || (event.keyCode === 17) || (event.keyCode === 18) || (event.keyCode === 32) || (event.keyCode === 16) || (event.keyCode === 13) || (event.keyCode === 8))) {
    //   if (this.dateTimeSet() === -1) {

    //     this.saveButtonFlag = true;

    // } 

    let reg = /^(2[0-3]|1?[0-9]|0?[1-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/
    if (!(reg.test(this.pickTime))) {
      this.saveButtonFlag = true;
    } else {
      this.saveButtonFlag = false;
    }

  }
  // }
  currentDate;

  customFlag = false;
  customSet() {
    this.pickTime = '';
  }


  quickRemainder(time) {
    // debugger;
    if (time === "8:00 PM") {
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 0, 20, 0, 0);
    } else if (time === "8:00 AM") {
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 1, 8, 0, 0);
    } else if (time === "MON, 8:00 AM") {
      this.settingDate = new Date(this.dat.getFullYear(), this.dat.getMonth(), this.dat.getDate() + 7, 8, 0, 0);
    }

    if (!(this.allowDate === true)) {
    this.requestBody = {
      "reminder": this.settingDate,
      "noteIdList": [this.note.id]
    }
  }

  

  this.isoFomatedDateTime = this.settingDate
    this.addDate.emit(this.isoFomatedDateTime);

    if (!(this.allowDate === true)) {

    this.noteService.addRemainder(this.requestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {
        LoggerService.logObj("the remainder is added successfully", response)
        this.update.emit(this.settingDate);
      },
      error => {
        LoggerService.log("Error Occured!!");
      }
    )
  }
}

updateDateField(){

  // console.log("set date is",this.setDate)

  this.dateDisable1 = false;
  this.dateDisable2 = false;
  this.dateDisable3 = false;
  this.dateDisable4 = false;
    

      if ((new Date(this.setDate).getFullYear() - new Date(this.currentDate).getFullYear()) === 0) {

        if ((new Date(this.setDate).getMonth() - new Date(this.currentDate).getMonth()) === 0) {
          if ((new Date(this.setDate).getDate() - new Date(this.currentDate).getDate()) === 0) {
  
            // console.log("same date is here")
            // console.log("dateDiable2",(new Date(this.setDate).getHours()));
  
            if ((new Date(this.setDate).getHours()) > 8) {
              this.dateDisable1 = true;
              // console.log("dateDiable1",this.dateDisable1);
            } if ((new Date(this.setDate).getHours()) > 13) {
              // console.log("dateDiable2",(new Date(this.setDate).getHours()));
              this.dateDisable2 = true;
              
            } if ((new Date(this.setDate).getHours()) > 18) {
              this.dateDisable3 = true;
              // console.log("dateDiable3",this.dateDisable3);
            } if ((new Date(this.setDate).getHours()) > 20) {
              this.dateDisable4 = true;
              // console.log("dateDiable4",this.dateDisable4);
            }
          }
          
        }
      

    }
}

  ngOnInit() {
    // let temp;
    // if(new Date().getHours() <= 12){
    //   temp = "AM";
    // }else{
    //   temp = "PM";
    // }

    // this.pickTime = new Date().getHours()+':'+new Date().getMinutes()+' '+temp;
    // console.log(this.pickTime)
    // this.pickTime = "9:00 AM"

    this.setDate = this.date.value;

    this.currentDate = new Date();
    // console.log(new Date(new Date(this.setDate).getDate(), new Date(this.setDate).getMonth(), new Date(this.setDate).getFullYear()))

    let hours = (new Date(this.dateTimeSet()).getHours());
    let min = (new Date(this.dateTimeSet()).getMinutes());

    

    if ((new Date(this.setDate).getFullYear() - new Date(this.currentDate).getFullYear()) === 0) {

      if ((new Date(this.setDate).getMonth() - new Date(this.currentDate).getMonth()) === 0) {
        if ((new Date(this.setDate).getDate() - new Date(this.currentDate).getDate()) === 0) {

          // console.log("same date is here")
          // console.log("dateDiable2",(new Date(this.setDate).getHours()));

          if ((new Date(this.setDate).getHours()) >= 8) {
            this.dateDisable1 = true;
            // console.log("dateDiable1",this.dateDisable1);
          } if ((new Date(this.setDate).getHours()) >= 13) {
            // console.log("dateDiable2",(new Date(this.setDate).getHours()));
            this.dateDisable2 = true;
            
          } if ((new Date(this.setDate).getHours()) >= 18) {
            this.dateDisable3 = true;
            // console.log("dateDiable3",this.dateDisable3);
          } if ((new Date(this.setDate).getHours()) >= 20) {
            this.dateDisable4 = true;
            // console.log("dateDiable4",this.dateDisable4);
          }
        }
        
      }
    }

    // this.dataShare.showData3.subscribe(data => {

    //   this.note = data;
    // },error => {

    //   LoggerService.log("Error Occured")
    // })
    


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

    
    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }


}


