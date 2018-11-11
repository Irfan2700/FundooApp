import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-remainder',
  templateUrl: './create-remainder.component.html',
  styleUrls: ['./create-remainder.component.css']
})
export class CreateRemainderComponent implements OnInit {

  constructor() { }

  flag = false;
  date = new FormControl(new Date());
  pickTime = "6:00 AM";

  ngOnInit() {
  }

}
