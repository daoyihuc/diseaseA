import { Component, OnInit } from '@angular/core';
import {RolesBean} from '../../bean/rolesBean';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpServiceService} from '../../http/http-service.service.js';
import {RoleListBean} from '../../httpbean/RoleListBean.js';
import {LoadingType} from 'ng-devui';
import {DialogService} from '../service/dialog.service.js';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  label_header = RolesBean;


  // 分页
  pager = {
    total: 306,
    pageIndex: 1,
    pageSize: 10
  };
  myData: RoleListBean;
  loading: LoadingType;
  // 请求数据
  datas = {
    Token: sessionStorage.getItem('token'),
    Page: '1',
    role_name: ''
  };
  // toast
  msg: any[] = [];

  constructor( private meas: MatDialog,
               private route: ActivatedRoute,
               private router: Router,
               private http: HttpServiceService,
               private dialog: DialogService
               ) {


  }

  ngOnInit(): void {
    this.loading = undefined;
    const  data = {
      Token: sessionStorage.getItem('token')
    };
    this.https(data);
  }


  onSelectButton(id, index: number): void{
    switch (id) {
      case 0:
        if (this.datas.role_name === ''){
          this.msg = this.dialog.showToast(1, '查询名称不能为空');
        }else{
          this.https(this.datas);
        }
        break;
      case 1:
        this.datas.role_name = '';
        this.https(this.datas);
        break;
      case 2:
        this.router.navigate(['index/user_add', { id: '1' , name: 'daoyi', type: 'add'}]);
        break;
      case 3:
        this.router.navigate(['index/user_add', { id: this.myData.data.List[index].id ,
          name: this.myData.data.List[index].role_name, type: 'edit'}]);
        break;
    }
  }
  InputChange(envent): void{
    this.datas.role_name = envent.target.value;
    console.log(this.datas.role_name);
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
    const  data = {
      Token: sessionStorage.getItem('token'),
      Page: pageIndex
    };
    this.https(data);
  }

  // http请求
  https(data): void{
    this.loading = this.http.RoleList(data).subscribe( datas => {

      this.myData = datas.body;
      this.pager.total = this.myData.data.Paginate.Count;
      this.pager.pageIndex = this.myData.data.Paginate.Pages;
      console.log(this.myData);
    });
  }


}
