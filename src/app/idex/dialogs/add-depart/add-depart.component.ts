import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DateUtils} from '../../../../libs/DateUtils.js';
import {DialogService} from '../../service/dialog.service.js';

@Component({
  selector: 'app-add-depart',
  templateUrl: './add-depart.component.html',
  styleUrls: ['./add-depart.component.css']
})
/*
* 添加科室
* */
export class AddDepartComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<AddDepartComponent>,
    private http: HttpServiceService,
    private dialogs: DialogService
  ) { }

  // 时间
  times: any = null;

  // 提交数据
  datas = {
    Token: sessionStorage.getItem('token'),
    type: '0',
    DepartmentId: '',
    WardId: '',
    title: ''
  };
  // toast
  msg: any[] = [];

  ngOnInit(): void {
    const ds = new Date();
    const time = ds.getTime();
    this.times = new DateUtils().formatDateTime3(time, 'yyyy/MM/dd');
  }
  ngClick(): void{
    this.dialog.close();
  }
  ngOkClisk(): void{
    if (this.datas.title === ''){
      this.msg = this.dialogs.showToast(1, '名称不能为空' );
    }else{
      this.HttpsAddMenu(this.datas);
    }

  }
  // 输入记录
  InputChange(event): void{
    this.datas.title = event.target.value;
  }
  // httpAddMenu 菜单添加
  HttpsAddMenu(data): void{
    this.http.AddMenu(data).subscribe( datas => {

      if (datas.body.code === 1){
        this.dialog.close('0x11');
      }else {

      }
    });
  }

}
