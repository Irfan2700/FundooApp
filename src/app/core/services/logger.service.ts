import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  static log(msg: string, obj:any):void {
    console.log(msg, obj);
  }

  static error(msg: string, obj = {}): void{
    console.error(msg,obj);
  }
}
