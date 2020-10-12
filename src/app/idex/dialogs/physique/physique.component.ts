import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {LabelBeanData} from '../../../httpbean/LabelBean.js';
import {Constan} from '../../../constant/constan.js';

@Component({
  selector: 'app-physique',
  templateUrl: './physique.component.html',
  styleUrls: ['./physique.component.css']
})
/*
* @author: daoyi(yw)
* @param: '体格'
* Date: ${DATE}
* */
export class PhysiqueComponent implements OnInit {

  constructor(
    private dialog: MatDialogRef<PhysiqueComponent>,
    private http: HttpServiceService,

  ) { }
  Tags: LabelBeanData[];
  resultData: LabelBeanData[] = [];

  ngOnInit(): void {

    const data = {
      Token: sessionStorage.getItem('token'),
      module: '102000002104'
    };
    this.https(data);
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
