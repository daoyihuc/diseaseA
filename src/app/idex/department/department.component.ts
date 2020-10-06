import {Component, OnInit, ViewChild} from '@angular/core';
import { DepartmentBeans, DepartmentClass, DepartmentClassT} from '../../bean/departmentBean';
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


  constructor( private mes: MatDialog) { }

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

  // 表单数据
  dataBean: any[] = [];

  // 分页
  pager = {
    total: 306,
    pageIndex: 1,
    pageSize: 10
  };
  preLink = '<';
  nextLink = '>';
  isAll: any = null;


  ngOnInit(): void {
    this.add_Data();
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
        this.add_dialog_1(3);
        break;
    }
  }

  // 添加弹窗
  add_dialog_1(value: number): void{
    switch (value) {
      case 0:

        break;
      case 2: // 病区
        const dialogref1 = this.mes.open(AddWardComponent, {});
        dialogref1.afterClosed().subscribe(result => {
          console.log('closed');
        });
        break;
      case 3: // 科室
        const dialogref2 = this.mes.open(AddDepartComponent, {});
        dialogref2.afterClosed().subscribe(result => {
          console.log('closed');
        });
        break;
      case 1: // 疾病
        const dialogref3 = this.mes.open(AddDiseaseComponent, {});
        dialogref3.afterClosed().subscribe(result => {
          console.log('closed');
        });
        break;
    }
  }
  // MainDiseaseDepartment: string; // 主疾病科室
  // DisArea: string; // 主疾病区
  // MainDiseaseName: string; // 主疾病名称
  // MainDiseaseID: string; //  主疾病ID
  // Founder: string; // 创建人
  // CreationTime: string; // 创建时间
  // RecentlyUpdated: string; // 最近更新者
  // LastUpdateTime: string; // 最近更新时间
  // Level: string; // 级别
  // OperatingId: string; // 操作id
  // 数据模拟
  add_Data(): void{
    for (let i = 0; i < 10; i++){
      const datas = new DepartmentClassT();
      datas.isCheck = false;
      datas.data.push('呼吸科');
      datas.data.push('先天性');
      datas.data.push( '花粉过敏');
      datas.data.push('147258369');
      datas.data.push('daoyi');
      datas.data.push( '2020-01-02');
      datas.data.push( 'HUC');
      datas.data.push('2020-01-03');
      datas.data.push('科室');
      datas.data.push(1);
      this.dataBean.push(datas);
    }
  }
  // 是否全选
  isOnselectCheckAll(): void{
    if ( this.isAll === null){
      this.isAll = true;
    }else if ( this.isAll === true){
      this.isAll = false;
    }else if ( this.isAll === false ){
      this.isAll = true;
    }
  }



  // 分页方法
  pageIndexChange(pageIndex): void{
    this.checkCount(pageIndex);
  }
  pageSizeChange(pageSize): void{
    this.pager.pageIndex = 1;
    this.checkCount(this.pager.pageIndex);
  }

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
