import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { DepartmentBeans, DepartmentClass, DepartmentClassT} from '../../bean/departmentBean';
import { TableWidthConfig, TableCheckOptions, DataTableComponent } from 'ng-devui/data-table';
import { AddWardComponent} from '../dialogs/add-ward/add-ward.component';
import {MatDialog} from '@angular/material/dialog';
import {AddDepartComponent} from '../dialogs/add-depart/add-depart.component';
import {AddDiseaseComponent} from '../dialogs/add-disease/add-disease.component';
import {HttpServiceService} from '../../http/http-service.service.js';
import {SystemConfigBean} from '../../httpbean/SystemConfigBean.js';
import {DialogService} from '../service/dialog.service.js';
import {Constan} from '../../constant/constan.js';
import {DepartMentBean} from '../../httpbean/DepartMentBean.js';
import {LoadingType} from 'ng-devui';
import {ClassSelectService} from '../service/class-select.service.js';

/*
* 系统配置
* */

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {


  constructor(
    private mes: MatDialog,
    private http: HttpServiceService,
    private dialog: DialogService,
    private el: ElementRef,
    private recever: ClassSelectService
  ) { }

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

  // http 数据
  myData: SystemConfigBean;
  myDataDepart: DepartMentBean;
  // toast
  msg: any[] = [];
  // 科室
  DepartmentOption: any = null;
  DepartValues: any = null;
  // 病区
  WardOption: any = null;
  // 病区值
  wardvalues: any;
  // 主疾病
  diseaseOption: any = null;
  // 病区值
  diseaseValue: any;
  // 遮罩
  Loadings: LoadingType;

  // 请求数据
  Datas = {
    Token: sessionStorage.getItem('token'),
    Page: 1,
    PageSize: 10,
    department_id: '',
    ward_id: '',
    diseases_id: ''
  };


  ngOnInit(): void {
    // this.add_Data();

    this.Https(this.Datas);
    this.https_Depart(this.Datas, 0);
    this.Loadings = undefined;

  }

  onSelectButton(value: number): void{
    switch (value) {
      case 0:
        console.log('0');
        if (this.Datas.department_id === '' && this.Datas.ward_id === '' && this.Datas.diseases_id === ''){
          this.msg = this.dialog.showToast( 1 , '请选择搜索条件');
        }else {
          this.Https(this.Datas);
        }

        break;
      case 1:
        console.log('1');
        this.Datas.department_id = '';
        this.Datas.ward_id = '';
        this.Datas.diseases_id = '';
        this.DepartValues = {};
        this.diseaseValue = {};
        this.wardvalues = {};
        this.Https(this.Datas);
        break;
      case 2:
        console.log('2');
        this.add_dialog_1(0, 0x110 );
        break;
    }
  }

  // 添加弹窗 0:科室；1：病区；2：主疾病
  add_dialog_1(value: number, id: number): void{
    switch (value) {
      case 0: // 科室
        const dialogref2 = this.mes.open(AddDepartComponent, {});
        dialogref2.afterClosed().subscribe(result => {
          if (result === '0x11'){
            this.Https(this.Datas);
          }
        });
        break;
      case 1: // 病区
        const dialogref1 = this.mes.open(AddWardComponent, {});
        this.recever.sendDepart(this.myData.data.List[id]);
        dialogref1.afterClosed().subscribe(result => {
          if (result === '0x12'){
            this.Https(this.Datas);
          }
        });
        break;
      case 2: // 主疾病
        const dialogref3 = this.mes.open(AddDiseaseComponent, {});
        this.recever.sendDepart1(this.myData.data.List[id]);
        dialogref3.afterClosed().subscribe(result => {
          if (result === '0x13'){
            this.Https(this.Datas);
          }
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

  // 科室选择
  selectValueD(event): void{
    const data = {
      Token: sessionStorage.getItem('token'),
      parent_id: event.id
    };
    this.https_Depart(data, 1);
    // tslint:disable-next-line:variable-name
    const ward_se = this.el.nativeElement.querySelector('#ward_se');

    if (Constan.DeBug){
      console.log('daoyi', this.wardvalues);
    }
    this.wardvalues = {};
    this.Datas.department_id = event.id;
    this.Datas.ward_id = '';
  }
  // 病区选择
  selectValueW(event): void{
    this.Datas.ward_id = event.id;
    const data = {
      Token: sessionStorage.getItem('token'),
      parent_id: event.id
    };
    this.https_Depart(data, 2);
    this.diseaseValue = {};
    // this.Datas.ward_id = event.id;

  }
  // 主疾病
  selectValueB(event): void{
    this.Datas.diseases_id = event.id;
  }


  // http 请求
  https_Depart(data, type: number): void{
    this.http.DepartmentList(data).subscribe( datas => {
      this.myDataDepart = datas.body;
      switch (type) {
        case 0: // 科室
          this.DepartmentOption = this.myDataDepart.data;
          break;
        case 1: // 病区
          this.WardOption = this.myDataDepart.data;
          break;
        case 2: // 主疾病
          this.diseaseOption = this.myDataDepart.data;
          break;
      }
      if (Constan.DeBug){
        console.log(this.myDataDepart);
      }
    });
  }



  // http
  Https(data): void{
    this.Loadings = this.http.SystemConfig(data).subscribe( datas => {
      this.myData = datas.body;

      if (this.myData.code === 1){
        this.msg = this.dialog.showToast(2, '加载完成');
        this.pager.total = this.myData.data.Paginate.Count;
      }else {
        this.msg = this.dialog.showToast(0, this.myData.msg);
      }
    });
  }

  // httpAddMenu 菜单添加
  HttpsAddMenu(data): void{
    this.http.AddMenu(data).subscribe( datas => {

      if (datas.body.code === 1){
        this.msg = this.dialog.showToast(2, '添加成功');

      }else {
        this.msg = this.dialog.showToast(0, datas.body.msg);
      }
    });
  }





}
