import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';
import {ClassSelectService} from '../../service/class-select.service.js';
import {DateUtils} from '../../../../libs/DateUtils.js';

@Component({
  selector: 'app-add-disease',
  templateUrl: './add-disease.component.html',
  styleUrls: ['./add-disease.component.css']
})
/*
* add 疾病
* */
export class AddDiseaseComponent implements OnInit {


  // 时间
  times: any = null;

  // 提交数据
  datas = {
    Token: sessionStorage.getItem('token'),
    type: '2',
    DepartmentId: '',
    WardId: 0,
    title: ''
  };
  // toast
  msg: any[] = [];

  // show
  showName: any = {
    DepartName: ''
  };


  updata = {
    Token: sessionStorage.getItem('token'),
    id: '',
    title: ''
  } ;
  type = 'a';

  constructor(
    private dialog: MatDialogRef<AddDiseaseComponent>,
    private http: HttpServiceService,
    private dialogs: DialogService,
    private recerver: ClassSelectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recerver.depart1$.subscribe( datas => {
      console.log('daoyiDepart1', datas);
      this.showName.DepartName = datas.ward_name;
      this.datas.WardId = datas.ward_id;
    });
  }

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
      this.msg = this.dialogs.showToast(1, '病区名称不能为空' );
    }else{
      if (this.type === 'e'){
        this.EditSystem(this.updata);
      }else {
        this.HttpsAddMenu(this.datas);
      }
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
        this.dialog.close('0x13');
      } else {

      }
    });
  }

  // httpAddMenu 菜单添加
  EditSystem(result): void{
    this.http.EditSystem(result).subscribe( dataw => {

      if (dataw.body.code === 1){
        this.dialog.close('0x13');
      }else {
        this.msg = this.dialogs.showToast(0 , dataw.body.msg);
      }
    });
  }
}
