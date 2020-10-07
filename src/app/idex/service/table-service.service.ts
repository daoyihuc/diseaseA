import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Tablebean} from '../../bean/tablebean.js';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {


  // Observable string sources （观察者）
  private missionAnnouncedSource = new Subject<Tablebean>();
  private missionConfirmedSource = new Subject<Tablebean>();

  // Observable string streams (订阅者)
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  // daddada

  // 消息发送
  sendA(mission: Tablebean): void{
    this.missionAnnouncedSource.next(mission);
  }
  // 消息发送
  sendC(astronaut: Tablebean): void{
    this.missionConfirmedSource.next(astronaut);
  }

  constructor() { }
}
