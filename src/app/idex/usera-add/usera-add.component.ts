import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {RoleMenuListBean, RoleMenuListData} from '../../httpbean/RoleMenuListBean.js';
import {HttpServiceService} from '../../http/http-service.service.js';
import {DialogService} from '../service/dialog.service.js';
import {LoadingType} from 'ng-devui';

@Component({
  selector: 'app-usera-add',
  templateUrl: './usera-add.component.html',
  styleUrls: ['./usera-add.component.css']
})
export class UseraAddComponent implements OnInit {

  id: string;
  name: string;
  type = 'a';

  msgs: any[] = [];
  Loadings: LoadingType;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpServiceService,
    private dialog: DialogService,
  ) { }


  // 渲染数据
  myData: RoleMenuListData[] = [];

  // 请求数据
  httpdata = {
    Token: sessionStorage.getItem('token'),
    role_name: '',
    permission_id: '',
    type: 'add',
    id: ''

  };

  ngOnInit(): void {
    this.Loadings = undefined;
    if (this.route.snapshot.paramMap.has('id')){
      this.id = this.route.snapshot.paramMap.get('id');
    }
    if ( this.route.snapshot.paramMap.has('name')){
      this.name = this.route.snapshot.paramMap.get('name');
    }
    if ( this.route.snapshot.paramMap.has('type')){
      this.type = this.route.snapshot.paramMap.get('type');
      this.httpdata.type = this.route.snapshot.paramMap.get('type');
    }

    if (this.type === 'edit'){
      this.httpdata.id = this.id;
      this.httpdata.role_name = this.name;
    }

    console.log( '頁面id' , this.id);
    console.log( '名称' , this.name);
    const data = {
      Token: sessionStorage.getItem('token'),
      type: this.type,
      GroupId: this.id
    };

    this.httpMenu(data);
  }

  // 页面权限
  httpMenu(data): void{
    this.http.RoleMenuList(data).subscribe( datas => {

      if (datas.body.code === 1){
        this.myData = datas.body.data;
      }
    });
  }
  // change
  changes(i, j, envent): void{
    if (envent){
      this.myData[i].NextList[j].isActivi = 1;
      this.myData[i].isActivi = 1;
    }else {
      this.myData[i].NextList[j].isActivi = 0;
    }
    let isc = false;
    for (let i = 0; i < this.myData.length; i++){

      for (let j = 0; j < this.myData[i].NextList.length; j++){
        if (this.myData[i].NextList[j].isActivi === 1){
          isc = true;
        }
      }
    }
    if (!isc){
      this.myData[i].isActivi = 0;
    }
    console.log(this.myData);
  }
  // cancle
  cancel(): void{
    window.history.back();
  }


  // save
  save(): void{
    console.log('保存', this.myData);
    for (let i = 0; i < this.myData.length; i++){

      this.httpdata.permission_id += this.myData[i].id + ',';
      for (let j = 0; j < this.myData[i].NextList.length; j++){
        if (this.myData[i].NextList[j].isActivi === 1){
          this.httpdata.permission_id += this.myData[i].NextList[j].id + ',';
        }
      }
    }
    console.log('权限id', this.httpdata.permission_id);
    this.httpSave(this.httpdata);
  }

  // http修改
  httpSave(data): void{
    this.Loadings = this.http.AddRole(data).subscribe( datas => {
      if (datas.body.code === 1){
        this.msgs = this.dialog.showToast(2, '新增成功');
        setTimeout(() => {
          this.cancel();
        }, 1000);

      }else {
        this.msgs = this.dialog.showToast(0, datas.body.msg);
      }
    });
  }

}
