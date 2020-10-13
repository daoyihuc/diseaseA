import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';
import {LoadingType} from 'ng-devui';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
/*
* @author: daoyi(yw)
* @param: '修改密码'
* Date: ${DATE}
* */
export class ChangePasswordComponent implements OnInit {

  constructor(
    private ref: MatDialogRef<ChangePasswordComponent>,
    private http: HttpServiceService,
    private dialogs: DialogService,
  ) { }

  // 遮罩
  Loadings: LoadingType;

  httpData = {
    Token: sessionStorage.getItem('token'),
    old_pass: '',
    new_pass: '',
    comfirm_pass: ''
  };
  msg: any[] = [];

  ngOnInit(): void {
    this.Loadings = undefined;
  }

  sumbit(): void{
    if (this.httpData.old_pass === ''){
      this.msg = this.dialogs.showToast( 1, '旧密码不能为空');
    }else if (this.httpData.new_pass === ''){
      this.msg = this.dialogs.showToast( 1, '新密码不能为空');
    }else if (this.httpData.comfirm_pass === ''){
      this.msg = this.dialogs.showToast( 1, '请再次确认密码');
    }else if (this.httpData.new_pass !== this.httpData.comfirm_pass){
      this.msg = this.dialogs.showToast( 1, '密码不一致');
    }else{
      this.https(this.httpData);
    }
  }

  // httpChange
  https(data): void{
    this.Loadings = this.http.UpdatePassword(data).subscribe( datas => {
      if (datas.body.code === 1){
        this.msg = this.dialogs.showToast( 2, '修改成功');
        this.ref.close();
      }else{
        this.msg = this.dialogs.showToast( 0, datas.body.msg);
      }
    });
  }

}
