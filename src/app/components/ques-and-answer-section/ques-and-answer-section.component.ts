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
  dateTimeStatus = [];
  emptyStarCase = 0;
  starsCount = {
    'rate': Boolean,
    'userId': String
  };
  isLiked = {
    'like': Boolean,
    'userId': String
  }
  showReplyInput = [];
  replyInput;
  likeArr = [];
  startCountArr= [];
  replyArr=[];

  backToNotes() {

    this.myRoute.navigate(['/home']);
  }

  addQuestion(event) {

    if (event.keyCode === 13) {

      console.log("question is ", this.questionAsk)

      let requestBody = {

        "message": this.questionAsk,
        "notesId": this.note.id
      }

      this.noteService.addQuestionAndAnswer(requestBody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          response => {

            LoggerService.log("Question successFully Added!!");
            this.questionAsk = '';
            this.getNoteDetails();
          },
          error => {

            console.error("error Occured", error)
          }
        )
    }
  }

  starCounting(questionId, index) {

    console.log("star is now", this.starsCount)

if(this.note.questionAndAnswerNotes[index].rate.length != 0){
    let requestbody = {
      "rate": this.note.questionAndAnswerNotes[index].rate[0].rate
    }

    this.noteService.rateQuestionAndAnswer(questionId, requestbody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        responsive => {

          LoggerService.log("rate is successfully updated")
        },
        error => {
          console.error("error Occured", error)
        }
      )
      }else {

        let requestbody = {
          "rate": this.emptyStarCase
        }
    
        this.noteService.rateQuestionAndAnswer(questionId, requestbody)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            responsive => {
    
              LoggerService.log("rate is successfully updated")
            },
            error => {
              console.error("error Occured", error)
            }
          )

      }
  }

  likeUnLikeit(temp, parentId, index) {

    this.isLiked.like = temp
    // this.likeArr[index].like = temp;
    console.log("this is temp here",temp)
    let requestbody = {
      "like": temp
    }

    this.noteService.likeQuestionAndAnswer(parentId, requestbody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          LoggerService.log("liked/Unlike Successfuly")
          this.getNoteDetails();
        },
        error => {
          console.error("error Occured", error)
        }
      )
  }

  // replayIt(parentId){

  //   // this.not
  // }

  sendReply(parentId){

    // if(this.showReplyInput === true){
    let requestBody = {
      'message': this.replyInput
    }

    this.noteService.replyQuestionAndAnswer(parentId,requestBody)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {

        LoggerService.log("Reply is sucessfully added!!");
        // this.replyArr.push(requestBody.message)
        this.replyArr = [];
        this.getNoteDetails();
      },
      error => {

        console.error("error Occured", error)
      }
    )
  // }
  }

  replyPrint(){

    if(this.note.questionAndAnswerNotes.length !== 0){
    for(let i=1; i<this.note.questionAndAnswerNotes.length; i++){

      this.replyArr.push(this.note.questionAndAnswerNotes[i]);
    }
  }
  }

  getNoteDetails() {
// debugger;
    let noteId = this.param.snapshot.paramMap.get('id');

    this.noteService.getNotesDetail(noteId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          this.note = response['data']['data'][0];
          LoggerService.logObj("note detail is here", this.note);

          this.replyPrint();

          for(let i=0; i<this.note.questionAndAnswerNotes.length; i++){

// debugger;
            this.showReplyInput.push(false);
            // console.log("i m here")

           

            // console.log("rate check here", this.startCountArr)
          // console.log("date is ", new Date(this.note.questionAndAnswerNotes[i].createdDate))

          this.dateCalc = new Date(this.note.questionAndAnswerNotes[i].createdDate);

          if (new Date(this.dateCalc).getFullYear() === new Date().getFullYear()) {

            if (new Date(this.dateCalc).getMonth() === new Date().getMonth()) {

              if (new Date(this.dateCalc).getDate() === new Date().getDate()) {

                if (new Date(this.dateCalc).getHours() === new Date().getHours()) {

                  this.dateTimeStatus.push("Few minutes ago");

                } else {
                  this.dateTimeStatus.push( Math.abs(new Date(this.dateCalc).getHours() - new Date().getHours()) + "hours ago")
                }
              } else {
                this.dateTimeStatus.push(Math.abs(new Date(this.dateCalc).getDate() - new Date().getDate()) + "Days ago")
              }
            } else {
              this.dateTimeStatus.push(Math.abs(new Date(this.dateCalc).getMonth() - new Date().getMonth()) + "Months ago")
            }
          } else {
            this.dateTimeStatus.push(Math.abs(new Date(this.dateCalc).getFullYear() - new Date().getFullYear()) + "years ago")
          }
        }

        

        // for(let j=0; j<this.note.questionAndAnswerNotes.length; j++){

        //   if (this.note.questionAndAnswerNotes[j].like.length !== 0 && this.note.questionAndAnswerNotes[j].like[0].like != null) {
        //     this.likeArr.push(
        //       {
        //         'like': this.note.questionAndAnswerNotes[j].like[0].like,
        //         'userId': this.note.questionAndAnswerNotes[j].like[0].userId
        //       }
                
        //       // }
        //     )
        //     }
        //     console.log("like check here", this.likeArr)

        //     // if(this.isRatedCheck(i) !== -1){
        //       if (this.note.questionAndAnswerNotes[j].rate.length !== 0 && this.note.questionAndAnswerNotes[j].rate[0].rate != null) {
        //       this.startCountArr.push(
        //         {
        //           'rate': this.note.questionAndAnswerNotes[j].rate[0].rate,
        //           'userId': this.note.questionAndAnswerNotes[j].rate[0].userId
        //         }
        //       )
        //     }
        // }

        console.log("likeArr is here", this.likeArr);
        console.log("rateArr is here", this.startCountArr)
        console.log("reply is here", this.replyArr);

          // if (this.note.questionAndAnswerNotes[0].like.length !== 0) {
          //   this.isLiked = {
          //     'like': this.note.questionAndAnswerNotes[0].like[0].like,
          //     'userId': this.note.questionAndAnswerNotes[0].like[0].userId
          //   }
          // }

          // if (this.note.questionAndAnswerNotes[0].rate.length !== 0) {
          //   this.starsCount = {
          //     'rate': this.note.questionAndAnswerNotes[0].rate[0].rate,
          //     'userId': this.note.questionAndAnswerNotes[0].rate[0].userId
          //   }
          // }
        },
        error => {
          // throw error;
        }
      )
  }

  ngOnInit() {


    this.getNoteDetails();

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
