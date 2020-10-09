import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LoadingType} from 'ng-devui';

@Injectable({
  providedIn: 'root'
})
export class ClassSelectService {

  // Observable string sources （观察者）
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  private ShowLoadingSource = new Subject<LoadingType>();

  // Observable string streams (订阅者)
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  showLoading$ = this.ShowLoadingSource.asObservable();
  // daddada

  // 消息发送
  announceMission(mission: string): void{
    this.missionAnnouncedSource.next(mission);
  }
  // 消息发送
  confirmMission(astronaut: string): void{
    this.missionConfirmedSource.next(astronaut);
  }

  // 遮罩发送
  sendShowLoad(loading: LoadingType): void{
    this.ShowLoadingSource.next(loading);
  }

  constructor() {

  }
}
