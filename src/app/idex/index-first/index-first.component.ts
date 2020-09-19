import {Component, OnInit, Input, ElementRef} from '@angular/core';
import * as buttons from '../../bean/buttons';
import { Textbeans } from '../../bean/textbeans';
import { TextBean } from '../../bean/text-bean';
import {LABELS} from '../../bean/lable';



@Component({
  selector: 'app-index-first',
  templateUrl: './index-first.component.html',
  styleUrls: ['./index-first.component.css']
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
  // 标题栏
  // tslint:disable-next-line:variable-name
  Header_isShow = false;
  value: object[] = [];
  constructor(public el: ElementRef) {
  }

  ngOnInit(): void {
    this.values[this.values.length - 1].isshow = true;
    this.daoyi();
    console.log(this.value);
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


}
