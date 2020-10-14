import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
    private dialogs: DialogService,
    @Inject(MAT_DIALOG_DATA) public data: any
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

  updata = {
    Token: sessionStorage.getItem('token'),
    id: '',
    title: ''
  } ;
  type = 'a';

  // toast
  msg: any[] = [];

  ngOnInit(): void {
    const ds = new Date();
    const time = ds.getTime();
    this.times = new DateUtils().formatDateTime3(time, 'yyyy/MM/dd');

    // if (this.data.has('ids')){
    this.updata.id = this.data.ids;
    // }

    // if (this.data.has('name')){
    this.updata.title = this.data.name;
    // }
    // if (this.data.has('type')){
    this.type = this.data.type;
    // }
    console.log(this.type);

  }
  ngClick(): void{
    this.dialog.close();
  }
  ngOkClisk(): void{
    if (this.datas.title === ''){
      this.msg = this.dialogs.showToast(1, '名称不能为空' );
    }else{
      if (this.type === 'e'){
        this.EditSystem(this.updata);
      }else if (this.type === 'a'){
        this.HttpsAddMenu(this.datas);
      }

    }

  }
  // 输入记录
  InputChange(event): void{
    this.datas.title = event.target.value;
  }
  // httpAddMenu 菜单添加
  HttpsAddMenu(data): void{
    this.http.AddMenu(data).subscribe( dat => {

      if (dat.body.code === 1){
        this.dialog.close('0x11');
      }else {

      }
    });
  }// httpAddMenu 菜单添加
  EditSystem(data): void{
    this.http.EditSystem(data).subscribe( dat => {

      if (dat.body.code === 1){
        this.dialog.close('0x11');
      }else {

      }
    });
  }

}
