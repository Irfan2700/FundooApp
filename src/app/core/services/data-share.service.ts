import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private dataSource1 = new BehaviorSubject([]);
  private dataSource2 = new BehaviorSubject("Default");

  showData1 = this.dataSource1.asObservable();
  showData2 = this.dataSource2.asObservable();

  constructor() { }

  sendData1(data: any){
    
    this.dataSource1.next(data);
  }

  sendData2(data: any){
    this.dataSource2.next(data);
  }

  sendData
}
