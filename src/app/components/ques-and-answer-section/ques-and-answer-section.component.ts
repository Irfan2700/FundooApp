import { environment } from './../../../environments/environment';
import { AuthService } from './../../core/services/auth.service';
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
    private param: ActivatedRoute,
    private auth: AuthService) { }
  
  questionAsk;
  dummy = 0;
  note;
  dateCalc;
  dateTimeStatus = [];
  emptyStarCase = [];
  starsCount = [];
  showReplyDisply =false;
  id;
  isLiked = {
    'like': Boolean,
    'userId': String
  }
  isRatedArr = [];
  showReplyInput = [];
  replyInput;
  likeArr = [];
  startCountArr = [];
  replyArr = [];
  likeCount = [];
  currentUserId;
  updatePic;
  quesPic;
  proPicDiplay = [];
  finalRate;
  finalelike;


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

  starCounting(questionId, data, index) {

    console.log("star is now", this.starsCount)

    if (this.note.questionAndAnswerNotes[index].rate.length != 0) {
      let requestbody = {
        "rate": data.rate
      }

      this.noteService.rateQuestionAndAnswer(questionId, requestbody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          responsive => {

            LoggerService.log("rate is successfully updated")
            if (questionId === this.note.questionAndAnswerNotes[0]) {
              this.getNoteDetails();
            } else {
              if (this.replyArr[index].rate.length != 0) {
                this.replyArr[index].rate[0].rate = this.note.questionAndAnswerNotes[index].rate[0].rate;

                let count = 0;
                for (let j = 0; j < this.note.questionAndAnswerNotes[index].rate.length; j++) {

                  count += this.note.questionAndAnswerNotes[index].rate[j].rate
                }
                this.starsCount.push(count / this.note.questionAndAnswerNotes[index].rate.length);

                this.getNoteDetails();

              }
              //else {

              //   this.starsCount.push(count+ / this.note.questionAndAnswerNotes[index].rate.length);
              // }
            }

          },
          error => {
            console.error("error Occured", error)
          }
        )
    } else {
      let requestbody;
      if (this.note.questionAndAnswerNotes[0].id === questionId) {
        requestbody = {
          "rate": this.emptyStarCase[0]
        }
      } else {
        requestbody = {
          "rate": this.emptyStarCase[index]
        }
      }

      this.noteService.rateQuestionAndAnswer(questionId, requestbody)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          responsive => {

            LoggerService.log("rate is successfully updated");
            this.getNoteDetails();
          },
          error => {
            console.error("error Occured", error)
          }
        )

    }
  }
  likeUnlike(data){
  if(data.length==0)
      return false;
    for(let i=0;i<data.length;i++){
      if(data[i].userId==this.currentUserId && data[i].like==true){
        return true;
      }
    }
    return false;
    
  }

  likeCounting(data){

    if(data.length==0)
      return 0;
      let count = 0;
    for(let i=0;i<data.length;i++){
      if(data[i].like==true){
        count++;
      }
    }
    return count;
  }

  likeUnLikeit(temp, parentId, index) {

    this.isLiked.like = temp;
    let requestbody;

    // for (let i = 0; i < this.note.questionAndAnswerNotes[index].like.length; i++) {

    //   if (this.currentUserId === this.note.questionAndAnswerNotes[index].like[i].userId) {

    //     requestbody = {
    //       "like": this.note.questionAndAnswerNotes[index].like[i].like
    //     }
    //   }
    // }
    // if (requestbody === undefined) {
    //   return;
    // }
    // this.likeArr[index].like = temp;
    console.log("this is temp here", temp);
    requestbody = {
      "like": temp
    }

    this.noteService.likeQuestionAndAnswer(parentId, requestbody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          LoggerService.log("liked/Unlike Successfuly")

          if (parentId === this.note.questionAndAnswerNotes[0]) {
            this.getNoteDetails();
          } else {
            if (this.replyArr[index].like.length != 0) {
              this.replyArr[index].like[0].like = temp;
              if (this.replyArr[index].like[0].like) {
                this.likeCount[index]++;
              } else {
                this.likeCount[index]--;
              }
            } else {
              0
              this.likeCount[index]++;

            }

            // this.replyArr = [];
            this.getNoteDetails();

          }

        },
        error => {
          console.error("error Occured", error)
        }
      )
  }



  enableReply(replyObj, value) {

    this.showReplyDisply = value;
    this.id = replyObj.id;
  }

  rateChecking(rating, index) {

    for (let i = 0; i < this.note.questionAndAnswerNotes[index].rate.length; i++) {

      if (rating[i].userId === this.currentUserId) {

        this.finalRate = rating[i].rate;
        return true;
      }
    }
    this.finalRate = 0;
    return true;
  }

  likeChecking(like, index) {

    for (let i = 0; i < this.note.questionAndAnswerNotes[index].like.length; i++) {

      if (like[i].userId === this.currentUserId) {

        this.finalelike = like[i].like;
        return true;
      }
    }
    this.finalelike = 0;
    return true;
  }

  sendReply(parentId) {

    // if(this.showReplyInput === true){
    let requestBody = {
      'message': this.replyInput
    }

    this.noteService.replyQuestionAndAnswer(parentId, requestBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {

          LoggerService.log("Reply is sucessfully added!!");
          // this.replyArr.push(requestBody.message)
          // this.replyArr = [];
          this.getNoteDetails();
        },
        error => {

          console.error("error Occured", error)
        }
      )
    // }
  }

  replyPrint() {

    this.replyArr = [];
    this.starsCount = [];
    if (this.note.questionAndAnswerNotes.length !== 0) {
      for (let i = 1; i < this.note.questionAndAnswerNotes.length; i++) {

        this.replyArr.push(this.note.questionAndAnswerNotes[i]);

        if (this.note.questionAndAnswerNotes[i].like.length != 0) {

          if (this.note.questionAndAnswerNotes[i].like[0].like === true) {
            this.likeCount.push(1)
          } else {
            this.likeCount.push(0);
          }
        } else {
          this.likeCount.push(0);
        }

        if (this.note.questionAndAnswerNotes[i].rate.length != 0) {

          let count = 0;
          for (let j = 0; j < this.note.questionAndAnswerNotes[i].rate.length; j++) {

            count += this.note.questionAndAnswerNotes[i].rate[j].rate
          }
          this.starsCount.push(count / this.note.questionAndAnswerNotes[i].rate.length);

        }
        else {

          this.starsCount.push(0);
        }



      }
    }
    console.log("startscount is ", this.starsCount)
  }

  proPicSet(index) {

    return environment.imageURL + this.note.questionAndAnswerNotes[index].user.imageUrl
  }

  likeCheck(index) {

    if (this.note.questionAndAnswerNotes[index].like.length != 0) {

      for (let i = 0; i < this.note.questionAndAnswerNotes[index].like.length; i++) {

        this.likeArr.push({
          'like': this.note.questionAndAnswerNotes[index].like[i].like,
          'userId': this.note.questionAndAnswerNotes[index].like[i].userId
        })
      }
      return this.likeArr;

    } else {

      return -1;
    }

  }

  ratingCheck(index) {

    if (this.note.questionAndAnswerNotes[index].rate.length != 0) {

      for (let i = 0; i < this.note.questionAndAnswerNotes[index].rate.length; i++) {

        this.isRatedArr.push({
          'rate': this.note.questionAndAnswerNotes[index].rate[i].rate,
          'userId': this.note.questionAndAnswerNotes[index].rate[i].userId
        })



      }
      // if(this.note.questionAndAnswerNotes[index].userId === this.auth.getId()){
      return this.isRatedArr;
      // }

    } else {

      return -1;
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
          this.emptyStarCase = [];




          for (let i = 0; i < this.note.questionAndAnswerNotes.length; i++) {

            // debugger;
            this.showReplyInput.push(false);
            // console.log("i m here")

            this.likeCheck(i);
            this.ratingCheck(i);

            this.proPicDiplay.push(this.proPicSet(i));

            this.emptyStarCase.push(0);
            // if (i = 0) {
            //   continue;
            // } else {
            //   this.showReplyDisply.push(false);
            // }

            // console.log("rate check here", this.startCountArr)
            // console.log("date is ", new Date(this.note.questionAndAnswerNotes[i].createdDate))

            this.dateCalc = new Date(this.note.questionAndAnswerNotes[i].createdDate);

            if (new Date(this.dateCalc).getFullYear() === new Date().getFullYear()) {

              if (new Date(this.dateCalc).getMonth() === new Date().getMonth()) {

                if (new Date(this.dateCalc).getDate() === new Date().getDate()) {

                  if (new Date(this.dateCalc).getHours() === new Date().getHours()) {

                    this.dateTimeStatus.push("Few minutes ago");

                  } else {
                    this.dateTimeStatus.push(Math.abs(new Date(this.dateCalc).getHours() - new Date().getHours()) + "hours ago")
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


          // this.updatePic = environment.imageURL+this.note.user.imageUrl;
          if (this.note.questionAndAnswerNotes.length != 0) {
            this.quesPic = environment.imageURL + this.note.questionAndAnswerNotes[0].user.imageUrl;
          }

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

    this.currentUserId = this.auth.getId();
    if (this.note !== undefined) {
      this.quesPic = environment.imageURL + this.note.questionAndAnswerNotes[0].user.imageUrl;
    }
    // }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.


    this.destroy$.next(true);

    this.destroy$.unsubscribe();
  }

}
