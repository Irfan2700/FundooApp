import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private dataSource = new BehaviorSubject([]);
  showData1 = this.dataSource.asObservable();
  // showData2 = this.dataSource.asObservable();

  constructor() { }

  sendData1(data: any){
    
    this.dataSource.next(data);
  }

  sendData
}
