import { Component, OnInit } from '@angular/core';
import {AuthorityBean} from '../../bean/auThoritybean';
import {DepartmentBeans} from '../../bean/departmentBean';
import {ActivatedRoute, Router} from '@angular/router';
import {Api} from '../../http/HttpApi';
import {HttpServiceService} from '../../http/http-service.service.js';
import {RoleListBean} from '../../httpbean/RoleListBean.js';
import {AdminBean} from '../../httpbean/AdminBean.js';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
/*
* 用户管理
* */
export class AuthorityComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpServiceService
  ) { }
  // 按钮
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
    }
  ];

  label_header = AuthorityBean;

  // 分页
  pager = {
    total: 306,
    pageIndex: 1,
    pageSize: 10
  };
  // 全选
  isAll: any = null;
  // http 数据
  myData: AdminBean ;
  // 渲染数据
  data: any[];

  ngOnInit(): void {
    const data = {
      Token: sessionStorage.getItem('token'),
      id: sessionStorage.getItem('id')
    };
    this.https(data);
  }

  onSelectButton(id): void{
    switch (id) {
      case 1:
        console.log(Api.RoleInfo);
        break;
      case 2:
        this.router.navigate(['index/roles_add']);
        break;
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
  // http请求
  https(data): void{
    this.http.AdminList(data).subscribe( datas => {

      this.myData = datas.body;
      this.pager.total = this.myData.data.Paginate.Count;
      console.log(this.myData);
    });
  }

}
