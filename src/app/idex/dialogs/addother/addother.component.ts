import { Component, OnInit } from '@angular/core';
import {LabelBeanData} from '../../../httpbean/LabelBean.js';
import {Constan} from '../../../constant/constan.js';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';

@Component({
  selector: 'app-addother',
  templateUrl: './addother.component.html',
  styleUrls: ['./addother.component.css']
})
/*
* @author: daoyi(yw)
* @param: '其他'
* Date: ${DATE}
* */
export class AddotherComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<AddotherComponent>,
    private http: HttpServiceService,
    private dialogs: DialogService
  ) { }

  Tags: LabelBeanData[];
  resultData: LabelBeanData[] = [];
  data = {
    Token: sessionStorage.getItem('token'),
    module: '32000002102',
    term: ''
  };
  count: any;

  msgs: any[]=[];
  ngOnInit(): void {


    this.https(this.data);
  }

  https(data): void{
    this.http.LabelShow(data).subscribe( datas => {
      this.Tags = datas.body.data.data;
      this.count = datas.body.data.total_num;
      console.log(this.Tags);
    },()=>{
      this.msgs=this.dialogs.showToast(1,"没有找到你想要的哦，请继续输入");
    },()=>{

    });
  }

  // 点击改变
  changeActive(id: number): void{
    if (this.Tags[id].Activited === true){
      this.Tags[id].Activited = false;
    }else{
      this.Tags[id].Activited = true;
    }
  }

  // inputchange
  inputchange(): void{
    this.https(this.data);
  }
  inputchange2(e): void{
    console.log(e);
    this.data.term=e;
    this.https(this.data);
  }


  // ok
  okClick(): void{

    this.filterData();
    if (Constan.DeBug){
      console.log('dy', this.resultData);
    }

    this.dialog.close(this.resultData);
  }
  // 数据筛选
  filterData(): void{

    for (let i = 0; i < this.Tags.length; i++){
      if (this.Tags[i].Activited){
        this.resultData.push(this.Tags[i]);
      }
    }
  }

  // 取消
  cancleClick(): void{
    this.dialog.close();
  }

}
