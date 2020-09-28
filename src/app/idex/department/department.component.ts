import {Component, OnInit, ViewChild} from '@angular/core';
import { DepartmentBeans } from '../../bean/departmentBean';
import { TableWidthConfig, TableCheckOptions, DataTableComponent } from 'ng-devui/data-table';
import { AddWardComponent} from '../dialogs/add-ward/add-ward.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDepartComponent} from '../dialogs/add-depart/add-depart.component';
import {AddDiseaseComponent} from '../dialogs/add-disease/add-disease.component';

/*
* 系统配置
* */

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  // 按钮
  // tslint:disable-next-line:variable-name
  buttons_arr = [
    {
      name: '搜索',
      id: 0
    },
    {
      name: '重置',
      id: 1
    },
    {
      name: '添加科室',
      id: 2
    }
  ];
  // tslint:disable-next-line:variable-name
  label_header = DepartmentBeans;


  constructor( private mes: MatDialog) { }

  ngOnInit(): void {
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
    }
  }

  // 添加弹窗
  add_dialog_1(value: number): void{
    switch (value) {
      case 0:

        break;
      case 1:
        const dialogref1 = this.mes.open(AddWardComponent, {});
        dialogref1.afterClosed().subscribe(result => {
          console.log('closed');
        });
        break;
      case 2:
        const dialogref2 = this.mes.open(AddDepartComponent, {});
        dialogref2.afterClosed().subscribe(result => {
          console.log('closed');
        });
        break;
      case 3:
        const dialogref3 = this.mes.open(AddDiseaseComponent, {});
        dialogref3.afterClosed().subscribe(result => {
          console.log('closed');
        });
        break;
    }
  }




}
