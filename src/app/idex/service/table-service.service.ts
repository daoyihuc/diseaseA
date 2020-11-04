import { Injectable } from '@angular/core';
import {AsyncSubject, BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {Tablebean} from '../../bean/tablebean.js';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {


  // Observable string sources （观察者）
  private missionAnnouncedSource = new Subject<Tablebean>();
  private missionConfirmedSource = new BehaviorSubject<number>(1);
  private missionindexSource = new Subject<Tablebean>();

  // Observable string streams (订阅者)
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  missionIndex$ = this.missionindexSource.asObservable();
  // daddada

  // 消息发送
  sendA(mission: Tablebean): void{
    this.missionAnnouncedSource.next(mission);
  }
  // 消息发送
  sendC(astronaut: number): void{
    this.missionConfirmedSource.next(astronaut);
  }
  // 消息发送
  sendI(astronaut: Tablebean): void{
    this.missionindexSource.next(astronaut);
  }


  constructor() { }
}
