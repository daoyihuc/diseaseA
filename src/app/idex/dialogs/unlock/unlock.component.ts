import {Component, Inject, OnInit} from '@angular/core';
import {LoadingType} from 'ng-devui';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';
import {ClassSelectService} from '../../service/class-select.service.js';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.component.html',
  styleUrls: ['./unlock.component.css']
})
export class UnlockComponent implements OnInit {

  msgs: any[] = [];
  Loadings: LoadingType;

  constructor(
    public dialogRef: MatDialogRef<UnlockComponent>,
    private http: HttpServiceService,
    private dialog: DialogService,
    private recerver: ClassSelectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  //
  onOkClick(): void{

    this.UnlockHttp(this.data.id);
  }

  // httpstatus
  httpStatus(data): void{
    this.Loadings = this.http.UpdateMedicalStatus(data).subscribe( datas => {
      if (datas.body.code === 1){
        this.dialogRef.close('0x17');
      }
    });
  }

  // 解锁
  UnlockHttp(ids): void{
    // 状态改变
    const  dataStatus = {
      Token: sessionStorage.getItem('token'),
      id: ids,
      type: '2'
    };
    this.httpStatus(dataStatus);
  }

}
