import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {LoadingType} from 'ng-devui';
import {List} from '../../httpbean/SystemConfigBean.js';
import {ReviewBean} from '../../bean/indexFirstBean.js';

@Injectable({
  providedIn: 'root'
})
export class ClassSelectService {

  // Observable string sources （观察者）
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  private ShowLoadingSource = new Subject<LoadingType>();
  private departMentSource = new Subject<List>();
  private departMentSource1 = new Subject<List>();
  private reviewSource = new Subject<string>(); // 首页审核数据发送

  // Observable string streams (订阅者)
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();
  showLoading$ = this.ShowLoadingSource.asObservable();
  depart$ = this.departMentSource.asObservable();
  depart1$ = this.departMentSource1.asObservable();
  Review$ = this.reviewSource.asObservable(); // 首页审核数据接受
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

  // 系统配置信息
  sendDepart(data: List): void{
    this.departMentSource.next(data);
  }

  // 系统配置信息1
  sendDepart1(data: List): void{
    this.departMentSource1.next(data);
  }

  // 首页审核数据接受
  sendReview(id: string): void{
    this.reviewSource.next(id);
  }

  constructor() {

  }
}
