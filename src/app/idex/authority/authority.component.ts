import { Component, OnInit } from '@angular/core';
import {AuthorityBean} from '../../bean/auThoritybean';
import {DepartmentBeans} from '../../bean/departmentBean';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
/*
* 用户管理
* */
export class AuthorityComponent implements OnInit {

  constructor( private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit(): void {
  }
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
  }

}
