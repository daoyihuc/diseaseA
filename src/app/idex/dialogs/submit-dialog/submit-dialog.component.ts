import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';
import {ClassSelectService} from '../../service/class-select.service.js';
import {LoadingType} from 'ng-devui';

@Component({
  selector: 'app-submit-dialog',
  templateUrl: './submit-dialog.component.html',
  styleUrls: ['./submit-dialog.component.css']
})
export class SubmitDialogComponent implements OnInit {



  msgs: any[] = [];
  datas = {
    Token: sessionStorage.getItem('token'),
    id: '',
    calibration_status: ''
  };
  Loadings: LoadingType;

  constructor(
    public dialogRef: MatDialogRef<SubmitDialogComponent>,
    private http: HttpServiceService,
    private dialog: DialogService,
    private recerver: ClassSelectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.Loadings = undefined;
    this.datas.id = this.data.id;

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  // 置为标准
  onOkClick(): void{
    console.log(this.datas);
    this.datas.calibration_status = '5';
    this.https(this.datas);
  }

  // 置为无效
  onOkClickW(): void{
    console.log(this.datas);
    this.datas.calibration_status = '6';
    this.https(this.datas);
  }

  // 请求
  https(data): void{
    this.Loadings = this.http.MedicalCalibration(data).subscribe( datas => {
      if (datas.body.code === 1){
        this.msgs = this.dialog.showToast(2, '提交成功');
        this.dialogRef.close('0x14');
      }else {
        this.msgs = this.dialog.showToast(0, '提交失败');
      }
    });
  }
}
