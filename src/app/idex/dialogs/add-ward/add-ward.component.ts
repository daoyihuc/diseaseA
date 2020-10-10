import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';
import {ClassSelectService} from '../../service/class-select.service.js';
import {DateUtils} from '../../../../libs/DateUtils.js';

@Component({
  selector: 'app-add-ward',
  templateUrl: './add-ward.component.html',
  styleUrls: ['./add-ward.component.css']
})
/*
* add 病区
* */
export class AddWardComponent implements OnInit {


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

  // show
  showName: any = {
    DepartName: ''
  };

  constructor(
    private dialog: MatDialogRef<AddWardComponent>,
    private http: HttpServiceService,
    private dialogs: DialogService,
    private recerver: ClassSelectService,
  ) {
    this.recerver.depart$.subscribe( datas => {
      console.log('daoyiDepart', datas);
      this.showName.DepartName = datas.department_name;
    });
  }



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
      this.msg = this.dialogs.showToast(1, '病区名称不能为空' );
    }else{
      this.HttpsAddMenu(this.datas);
    }

  }
  // 输入记录
  InputChange(event): void{
    this.datas.title = event.target.value;
  }
  // httpAddMenu 菜单添加
  HttpsAddMenu(data): void {
    this.http.AddMenu(data).subscribe(datas => {

      if (datas.body.code === 1) {
        this.dialog.close('0x12');
      } else {

      }
    });
  }

}
