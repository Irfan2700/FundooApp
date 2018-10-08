import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;




  arrClick = [{
    'name': 'basic',
    'price': '5'
  }, {
    'name': 'advance',
    'price': '50'
  },{
    'name': 'primium',
    'price': '100'
  }];

  bclick = false;

  // assin(){
  // for(let j=0; j<this.arrClick.length; j++){

  //   this.bclick[i].push(false);
  // }
  // }
  baseClick;
  cardName = this.baseClick;
respond(card) {
    console.log(card.name);
    this.baseClick = card.name;
  //   for (let i = 0; i < this.arrClick.length; i++) {
  //     this.baseClick[i] = false;
  //     if (this.arrClick[i].name === card.name) {
  //       this.baseClick[i] = true;
  //     }
  //   }

  }


  // bclicked(){
  //   bclick =!this.aclick;
  // }

  constructor(public dialog: MatDialog) { }

  terms () {
    const dialogRef = this.dialog.open(TermsDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  ngOnInit() {
  }

}

@Component({
  selector: 'terms-dialog',
  templateUrl: './termsAndCondition.html'
})


// tslint:disable-next-line:component-class-suffix
export class TermsDialog {}

