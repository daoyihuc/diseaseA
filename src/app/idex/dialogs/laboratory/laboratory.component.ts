import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {LabelBeanData} from '../../../httpbean/LabelBean.js';
import {Constan} from '../../../constant/constan.js';

@Component({
  selector: 'app-laboratory',
  templateUrl: './laboratory.component.html',
  styleUrls: ['./laboratory.component.css']
})

/*
* @author: daoyi(yw)
* @param: '实验室标签弹窗'
* Date: ${DATE}
* */
export class LaboratoryComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<LaboratoryComponent>,
    private http: HttpServiceService,
  ) { }

  Tags: LabelBeanData[];
  resultData: LabelBeanData[] = [];
  data = {
    Token: sessionStorage.getItem('token'),
    module: '92000002103',
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
