import { Component, OnInit } from '@angular/core';
import {RolesBean} from '../../bean/rolesBean';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor( private meas: MatDialog,
               private route: ActivatedRoute,
               private router: Router
               ) { }

  ngOnInit(): void {
  }
  label_header = RolesBean;


  // 分页
  pager = {
    total: 306,
    pageIndex: 1,
    pageSize: 10
  };

  onSelectButton(id): void{
    switch (id) {
      case 2:
        this.router.navigate(['index/roles_add']);
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
