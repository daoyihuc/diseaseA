import {Component, OnInit, Input, ElementRef} from '@angular/core';

import * as buttons from '../../bean/buttons';
import { Textbeans } from '../../bean/textbeans';
import { TextBean } from '../../bean/text-bean';
import { LABELS } from '../../bean/lable';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef} from '@angular/material/dialog';
import {ReviewDialogComponent} from '../review-dialog/review-dialog.component';
import {ClassSelectService} from '../service/class-select.service';
import {SubmitDialogComponent} from '../dialogs/submit-dialog/submit-dialog.component';
import {RouteAnimations} from '../../animation';


@Component({
  selector: 'app-index-first',
  templateUrl: './index-first.component.html',
  styleUrls: ['./index-first.component.css'],
  animations: [
    RouteAnimations
    // animation triggers go here
  ]
})
/*
* 第一个页面
* */

export class IndexFirstComponent implements OnInit {

  label = LABELS;
  values = LABELS;
  buttons_arr = [
    {
      name: '查询',
      id: 0
    },
    {
      name: '重置',
      id: 1
    },
    {
      name: '新增',
      id: 2
    },
    {
      name: '审核',
      id: 3
    },
    {
      name: '提交',
      id: 4
    }
  ];
  // 分页
  pager = {
    total: 306,
    pageIndex: 1,
    pageSize: 10
  };


  // 标题栏
  // tslint:disable-next-line:variable-name
  Header_isShow = false;
  value: object[] = [];
  constructor(public el: ElementRef,
              private meas: MatDialog,
              private classSelectService: ClassSelectService
            )
  {
    this.classSelectService.missionAnnounced$.subscribe(value1 => {
      console.log('子类组件', value1);
    });
  }

  ngOnInit(): void {
    this.values[this.values.length - 1].isshow = true;
    this.daoyi();
    console.log(this.value);
  }
  onSelectButton(value: number): void{
    switch (value) {
      case 0:
        console.log('0');
        break;
      case 1:
        console.log('1');
        break;
      case 2:
        console.log('2');
        break;
      case 3:
        console.log('3');
        this.openDialog(3);
        break;
      case 4:
        console.log('4');
        this.openDialog(4);
        break;
    }
  }
  openDialog(id: number): void{
    switch (id) {
      case 0:
        console.log('0');
        break;
      case 1:
        console.log('1');
        break;
      case 2:
        console.log('2');
        break;
        // 审核
      case 3:
        console.log('3');
        const dialogref = this.meas.open(ReviewDialogComponent, {
        });
        dialogref.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
        break;
        // 提交
      case 4:
        console.log('4');
        const dialogref_4 = this.meas.open(SubmitDialogComponent, {
        });
        dialogref_4.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
        break;
    }
  }

  daoyi(): void{

    for (let i = 0; i < 10; i++){
      const dao = new Textbeans();
      dao.isshow = false;
      dao.name = 'dsd';
      this.value.push(dao);
      console.log(dao);
    }
  }
  // 观察者反应

  // 获取当前分页索引
  pageIndexChangeWithoutFix(pageIndex): void{
    this.checkCount(pageIndex);
  }
  // 分页数据发生改变时候
  pageSizeChangeWithoutFix(pageSize): void{
    this.pager.pageIndex = 1;
    this.checkCount(this.pager.pageIndex);
  }
  checkCount(pageIndex): void{
    console.log('当前分页索引', pageIndex);
  }

}
