import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  noteCard = false;

  // do_resize= function(textbox)  {

  //   var maxrows=5;
  //    var txt=textbox.value;
  //    var cols=textbox.cols;

  //   var arraytxt=''+txt.split('\n');
  //    var rows=arraytxt.length;

  //   for (var i=0;i<arraytxt.length;i++)
  //    rows+=parseInt(arraytxt[i].length/cols);

  //   if (rows>maxrows) textbox.rows=maxrows;
  //    else textbox.rows=rows;
  //   }

  ngOnInit() {
  }

}
