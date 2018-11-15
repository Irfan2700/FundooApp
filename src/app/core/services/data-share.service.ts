import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private dataSource1 = new BehaviorSubject([]);
  private dataSource2 = new BehaviorSubject("Default");
  private dataSource3 = new BehaviorSubject('');
  private dataSource4 = new BehaviorSubject('');

  showData1 = this.dataSource1.asObservable();
  showData2 = this.dataSource2.asObservable();
  showData3 = this.dataSource3.asObservable();
  showData4 = this.dataSource4.asObservable();


  constructor() { }

  sendData1(data: any){
    
    this.dataSource1.next(data);
  }

  sendData2(data: any){
    this.dataSource2.next(data);
  }

  sendData3(data: any){
    this.dataSource3.next(data);
  }

  sendData4(data: any){
    this.dataSource4.next(data);
  }
}
