import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../http/http-service.service.js';
import {UserInfoBean} from '../../httpbean/UserInfoBean.js';
import {MatDialog, MatDialogActions} from '@angular/material/dialog';
import {ChangePasswordComponent} from '../dialogs/change-password/change-password.component.js';
import {LoadingType} from 'ng-devui';

@Component({
  selector: 'app-personalcenter',
  templateUrl: './personalcenter.component.html',
  styleUrls: ['./personalcenter.component.css']
})
/*
* @author: daoyi(yw)
* @param: '个人中心'
* Date: ${DATE}
* */
export class PersonalcenterComponent implements OnInit {

  constructor(
    private mes: MatDialog,
    private http: HttpServiceService,
  ) { }


  // 消息
  msgs: any[] = [];

  myData: UserInfoBean;

  // 遮罩
  Loadings: LoadingType;

  ngOnInit(): void {
    this.Loadings = undefined;
    const data = {
      Token: sessionStorage.getItem('token')
    };
    this.https(data);
  }

  // https
  https(data): void{
    this.Loadings = this.http.UserInfo(data).subscribe( datas => {
      if (datas.body.code === 1){
        this.myData = datas.body;
      }
    });
  }

  // open ChangePassword
  dialogOpen(): void{
    const  change = this.mes.open(ChangePasswordComponent, {});
  }

}
