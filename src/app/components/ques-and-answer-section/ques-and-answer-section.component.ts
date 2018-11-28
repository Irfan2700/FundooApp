import { LoggerService } from './../../core/services/logger.service';
import { DataShareService } from './../../core/services/data-share.service';
import { ActivatedRoute } from '@angular/router';
import { NoteServicesService } from '../../core/services/note-services.service';


import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ques-and-answer-section',
  templateUrl: './ques-and-answer-section.component.html',
  styleUrls: ['./ques-and-answer-section.component.scss']
})
export class QuesAndAnswerSectionComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private myRoute: Router,
    private dataShow: DataShareService,
    private noteService: NoteServicesService,
    private param: ActivatedRoute) { }

  questionAsk;
  note;
  dateCalc;
  dateTimeStatus;
  starsCount = 0;

  backToNotes() {

    this.myRoute.navigate(['/home']);
  }

  addQuestion(event){

    if(event.keyCode === 13){

      let requestBody = {

        "message": this.questionAsk,
        "notesId": this.note.id
      }

      this.noteService.addQuestionAndAnswer(requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          LoggerService.log("Question successFully Added!!");
          this.questionAsk ='';
        },
        error => {

          throw error;
        }
      )
    }
  }

  starCounting(){

    console.log("star is now", this.starsCount)
  }

  ngOnInit() {


    let noteId = this.param.snapshot.paramMap.get('id');
    
    this.noteService.getNotesDetail(noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          this.note = response['data']['data'][0];
          LoggerService.logObj("note detail is here", this.note);

          console.log("date is ",  new Date(this.note.questionAndAnswerNotes[0].createdDate))

    this.dateCalc = new Date(this.note.questionAndAnswerNotes[0].createdDate);
    
    if(new Date(this.dateCalc).getFullYear() === new Date().getFullYear()){

      if(new Date(this.dateCalc).getMonth() === new Date().getMonth()){

        if(new Date(this.dateCalc).getDate() === new Date().getDate()){

          if(new Date(this.dateCalc).getHours() === new Date().getHours()){

            this.dateTimeStatus = "Few minutes ago";

          }else{
            this.dateTimeStatus= Math.abs(new Date(this.dateCalc).getHours() - new Date().getHours()) +"hours ago"
          }
        }else{
          this.dateTimeStatus= Math.abs(new Date(this.dateCalc).getDate()-new Date().getDate()) +"Days ago"
        }
      }else{
        this.dateTimeStatus= Math.abs(new Date(this.dateCalc).getMonth() - new Date().getMonth()) +"Months ago"
      }
    }else{
      this.dateTimeStatus= Math.abs(new Date(this.dateCalc).getFullYear() - new Date().getFullYear()) +"years ago"
    }
        },
        error => {
          throw error;
        }
      )

      console.log("star is ", this.starsCount)

    // this.noteService.
// if(this.note != undefined){

  
  // }
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.


    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}
