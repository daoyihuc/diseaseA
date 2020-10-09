import {Component, ElementRef, OnInit} from '@angular/core';
import {AuthorityBean} from '../../bean/auThoritybean';
import {DepartmentBeans} from '../../bean/departmentBean';
import {ActivatedRoute, Router} from '@angular/router';
import {Api} from '../../http/HttpApi';
import {HttpServiceService} from '../../http/http-service.service.js';
import {RoleListBean} from '../../httpbean/RoleListBean.js';
import {AdminBean} from '../../httpbean/AdminBean.js';
import {Constan} from '../../constant/constan.js';
import {DepartMentBean} from '../../httpbean/DepartMentBean.js';

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
    private http: HttpServiceService,
    private el: ElementRef
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
  indexPage = 1;
  // 全选
  isAll: any = null;
  // http 数据
  myData: AdminBean ;
  // 渲染数据
  data: any[];

  // 请求数据
  datas = {
    Token: sessionStorage.getItem('token'),
    // id: sessionStorage.getItem('id')
    Page: 1,
    account: '',
    department_id: '',
    ward_id: ''
  };

  // 科室
  DepartmentOption: any = null;
  DepartValues: any = null;
  // 病区
  WardOption: any = null;
  // 病区值
  wardvalues: any;

  // http 数据结构
  myDataDepart: DepartMentBean;

  ngOnInit(): void {

    const data = {
      Token: sessionStorage.getItem('token')
    };
    this.https_Depart(data, 0);
    this.https(this.datas);
  }
  InputChange(envent, type): void{
    switch (type) {
      case 0:
        this.datas.account = envent.target.value;
        break;
      case 1:
        this.datas.department_id = envent.target.value;
        break;
      case 2:
        this.datas.department_id = envent.target.value;
        break;
    }
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
      }
      if (Constan.DeBug){
        console.log(this.myDataDepart);
      }
    });
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
    this.datas.department_id = event.id;
    this.datas.ward_id = '';
  }
  // 病区选择
  selectValueW(event): void{
    this.datas.ward_id = event.id;
  }

  onSelectButton(id): void{
    switch (id) {
      case 0:
        this.https(this.datas);
        break;
      case 2:
        this.router.navigate(['index/roles_add', {type: 'add'}]);
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
  // 编辑
  Editer(ids): void{
    this.router.navigate(['index/roles_add', {type: 'edit', id: ids}]);
  }
  // 查看
  Show(ids): void{
    this.router.navigate(['index/roles_add', {type: 'show', id: ids}]);
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
    this.indexPage = pageIndex;
    this.datas.Page = this.indexPage;
    this.https(this.datas);
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
