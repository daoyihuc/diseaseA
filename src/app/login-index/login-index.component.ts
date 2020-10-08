import { Component, OnInit } from '@angular/core';
import {LoginIndexAnimations} from '../animation';
import {Router, ActivatedRoute} from '@angular/router';
import {TableServiceService} from '../idex/service/table-service.service.js';
import {Tablebean} from '../bean/tablebean.js';
import { Constan } from '../constant/constan.js';
import {DialogService} from '../idex/service/dialog.service.js';
import {HttpServiceService} from '../http/http-service.service.js';
import {LoginBean} from '../httpbean/LoginBean.js';
import LoginBeanData from '../httpbean/LoginBeanData.js';
import {LoadingType} from 'ng-devui';

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
  loading: LoadingType;
  msg: any[] = [];
  myData: LoginBean;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private tableService: TableServiceService,
    private dialog: DialogService,
    private http: HttpServiceService
  ) {
  }

  ngOnInit(): void {
    this.loading = undefined;
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
        this.username = envent.target.value;
        console.log(this.username);
        break;
      case 2:
        this.password = envent.target.value;
        console.log(this.password);
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
      const  datas = {
        account: this.username,
        password: this.password,
        type: this.type
      };
      this.https(datas);
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

  https(data): void{
    this.loading = this.http.Login(data).subscribe( datas => {
      this.myData = datas.body;
      // console.log(this.myData.data.Token);
      if ( this.myData.code === 1){
        if (this.iSsave){
          localStorage.setItem('token', this.myData.data.Token);
          localStorage.setItem('username', this.myData.data.username);
          localStorage.setItem('id', String(this.myData.data.id));
        }
        sessionStorage.setItem('token', this.myData.data.Token);
        sessionStorage.setItem('username', this.myData.data.username);
        sessionStorage.setItem('id', String(this.myData.data.id));

        this.msg = this.dialog.showToast(2, this.myData.msg);
        this.go();
      } else {
          this.msg = this.dialog.showToast(0, this.myData.msg);
      }

    });


  }

}
