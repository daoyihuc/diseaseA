import { Component, OnInit } from '@angular/core';
import {RolesBean} from '../../bean/rolesBean';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpServiceService} from '../../http/http-service.service.js';
import {RoleListBean} from '../../httpbean/RoleListBean.js';
import {LoadingType} from 'ng-devui';

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

  constructor( private meas: MatDialog,
               private route: ActivatedRoute,
               private router: Router,
               private http: HttpServiceService
               ) {


  }

  ngOnInit(): void {
    this.loading = undefined;
    const  data = {
      Token: sessionStorage.getItem('token')
    };
    this.https(data);
  }


  onSelectButton(id): void{
    switch (id) {
      case 2:
        this.router.navigate(['index/user_add', { id: '1' , name: 'daoyi'}]);
        break;
    }
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
