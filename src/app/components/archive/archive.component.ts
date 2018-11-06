import { ServicesService } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  constructor(private myService: ServicesService) { }

  arr=[];

  showArchives(){

    this.myService.httpGetJson("notes/getArchiveNotesList").subscribe(
      response => {
        // console.log("Archive Success");

        
      },
      error => {
        // console.log("Error Occurs");
      }
    )

  }

  ngOnInit() {
    this.showArchives();
  }

}
