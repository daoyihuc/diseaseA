import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';
import {ClassSelectService} from '../../service/class-select.service.js';
import {LoadingType} from 'ng-devui';
import {Constan} from '../../../constant/constan.js';
import {ReviewBean} from '../../../bean/indexFirstBean.js';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
/*
* 审核
* */
export class ReviewDialogComponent implements OnInit {


  msgs: any[] = [];
  ReviewHttp = {
    Token: sessionStorage.getItem('token'),
    id: ''
  };
  Loadings: LoadingType;


  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private http: HttpServiceService,
    private dialog: DialogService,
    private recerver: ClassSelectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }




  ngOnInit(): void {
    this.Loadings = undefined;
    console.log('review', this.data);
    this.ReviewHttp.id = this.data.id;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  //
  onOkClick(): void{
    console.log(this.ReviewHttp);
    this.https(this.ReviewHttp);
  }

  // 请求
  https(data): void{
    this.Loadings = this.http.MedicalCheck(data).subscribe( datas => {
      if (datas.body.code === 1){
        this.msgs = this.dialog.showToast(2, '审核成功');
        this.dialogRef.close('0x13');
      }else {
        this.msgs = this.dialog.showToast(0, '审核失败');
      }
    });
  }

}
