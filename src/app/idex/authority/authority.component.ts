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

  onSelectButton(id): void{
    switch (id) {
      case 2:
        this.router.navigate(['index/user_add', { id: '1' , name: 'daoyi'}]);
        break;
    }
  }
}
