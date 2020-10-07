import { Injectable } from '@angular/core';


/*
* @author: daoyi(yw)
* @param: '弹窗工具类'
* Date: ${DATE}
* */
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  // 消息
  msgs: any[] = [];

  constructor() { }

  // 弹窗
  showToast(type: number, value: string): any[] {
    // common、success、error、warn、info
    switch (type) {
      case 0: // 危险
        this.msgs = [
          {severity: 'error', life: 3000, summary: '警告', detail: value}
        ];
        break;
      case 1: // 警告
        this.msgs = [
          {severity: 'warn', life: 3000, summary: '警告', detail: value}
        ];
        break;
      case 2: // 危险
        this.msgs = [
          {severity: 'success', life: 3000, summary: '成功', detail: value}
        ];
        break;
      case 3: // 普通
        this.msgs = [
          {severity: 'common', life: 3000, summary: '提醒', detail: value}
        ];
        break;
    }
    return this.msgs;

  }
}
