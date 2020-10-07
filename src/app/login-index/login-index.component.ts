import { Component, OnInit } from '@angular/core';
import {LoginIndexAnimations} from '../animation';
import {Router, ActivatedRoute} from '@angular/router';
import {TableServiceService} from '../idex/service/table-service.service.js';
import {Tablebean} from '../bean/tablebean.js';
import { Constan } from '../constant/constan.js';
import {DialogService} from '../idex/service/dialog.service.js';

/*
* @author: daoyi(yw)
* @param: '账号密码登录界面'
* Date: ${DATE}
* */

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css'],
  animations: [LoginIndexAnimations]
})
export class LoginIndexComponent implements OnInit {

  box = 'loginIndex';
  type: number; // 登录身份类型
  username: string = null; // 账号
  password: string = null; // 密码
  iSsave: boolean; // 是否保存
  msg: any[] = [];
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private tableService: TableServiceService,
    private dialog: DialogService
  ) {
  }

  ngOnInit(): void {
    this.type = Number(this.router.snapshot.paramMap.get('type'));
  }
  go(): void{
    const table = new Tablebean();
    table.id = Constan.indexComponent;
    table.name = '首页';
    this.tableService.sendA(table);
    this.route.navigate(['/index']);
  }
  // 输入框改变状态是
  inputChange(type: number, envent): void{
    switch (type) {
      case 1:
        const username = envent.target.value;
        console.log(username);
        break;
      case 2:
        const password = envent.target.value;
        console.log(password);
        break;
    }
  }
  // 是否保存账号密码
  isSave(envent): void{
     this.iSsave = envent.target.checked;
  }
  // 登录
  logins(): void{
    const b = this.isNull();
    console.log(b);
    if (b){

    }

  }
  // 校验是否为空
  isNull(): boolean{
    if ( this.username === null || this.username === ''){
      this.msg = this.dialog.showToast(1, '账号不能为空');
      return false;
    }else if (this.password === null || this.password === ''){
      this.msg = this.dialog.showToast(1, '密码不能为空');
      return false;
    }else {
      return true;
    }
  }

}
