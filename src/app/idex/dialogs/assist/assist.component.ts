import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {LabelBeanData} from '../../../httpbean/LabelBean.js';
import {Constan} from '../../../constant/constan.js';

@Component({
  selector: 'app-assist',
  templateUrl: './assist.component.html',
  styleUrls: ['./assist.component.css']
})
/*
* @author: daoyi(yw)
* @param: '辅助检查'
* Date: ${DATE}
* */
export class AssistComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<AssistComponent>,
    private http: HttpServiceService,

  ) { }

  Tags: LabelBeanData[];
  resultData: LabelBeanData[] = [];
  data = {
    Token: sessionStorage.getItem('token'),
    module: '102000002104',
    term: ''
  };
  ngOnInit(): void {
    this.https(this.data);
  }

  https(data): void{
    this.http.LabelShow(data).subscribe( datas => {
      this.Tags = datas.body.data;
      console.log(this.Tags);
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
