import { ServicesService } from "./../../services/services.service";
import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private myService: ServicesService,
    private resolver: ComponentFactoryResolver
  ) {}

  noteCard = false;

  arr = [];

  ngOnInit() {
    this.showNotes();
    // this.reload();
  }

  showNotes() {
    this.myService.get("notes/getNotesList").subscribe(
      response => {
        console.log("Data is Successfully Fetched!!", response);

        console.log("fresh",response["data"].data);

        for (var i = response["data"].data.length - 1; i >= 0; i--) {
          this.arr.push(response["data"].data[i]);
          // this.arr = response['data'].data;
        }

        console.log("the array one",this.arr);
      },
      error => {
        console.log("Error in Data Fetching...");
      }
    );
  }

  updateNotes(event) {
    if (event) {
      console.log("event triggered");
      // this.showNotes();
      this.arr = [];
      this.showNotes();
    }
  }
}
