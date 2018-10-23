import { ServicesService } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private myService: ServicesService) { }

  noteCard = false;


  arr = [
    //  {
    //   title: "Note 1",
    //   desc: "This is the description of First Note"
    // },
    // {
    //   title: "Note 2",
    //   desc: "This is the description of second Note"
    // },
    // {
    //   title: "Note 3",
    //   desc: "This is the description of third Note"
    // },
    // {
    //   title: "Note 4",
    //   desc: "This is the description of third Note"
    // },

  ];

  ngOnInit() {

    this.myService.get("notes/getNotesList").subscribe(
      response => {
        console.log("Data is Successfully Fetched!!",response);
        var a =[];
        console.log(response['data'].data)
        a.push(response['data'].data);
        console.log(a);

        for(var i=0; i<response['data'].data.length; i++){
          this.arr.push(response['data'].data[i])
        }

        console.log(this.arr);
      },
      error => {
        console.log("Error in Data Fetching...")
      }
    )
  }

}
