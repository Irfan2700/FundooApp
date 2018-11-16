import { MessagingService } from './core/services/messaging.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'fundooApp';
  message;

  constructor(private msgService: MessagingService){}

  ngOnInit() {
    this.msgService.getPermission();
    // this.msgService.receiveMessage()
    // this.message = this.msgService.currentMessage
  }
}
