import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassSelectService {

  // Observable string sources （观察者）
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams (订阅者)
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // 消息发送
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }
  // 消息发送
  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
  constructor() {

  }
}
