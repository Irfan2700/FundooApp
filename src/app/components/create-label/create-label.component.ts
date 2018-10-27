import { AuthService } from './../../services/auth.service';
import { ServicesService } from './../../services/services.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.css']
})
export class CreateLabelComponent implements OnInit {

  constructor(private myService: ServicesService,
    private auth: AuthService) { }

  public labelInput;

  hidden = false;

  addLabel(){
    this.myService.httpPostJson("noteLabels",).subscribe(

    )
  }

  cross(){
    this.hidden = !this.hidden;
  }

  ngOnInit() {
    console.log(this.hidden)
  }

}
