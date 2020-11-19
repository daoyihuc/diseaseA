import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpServiceService} from '../../../http/http-service.service.js';
import {DialogService} from '../../service/dialog.service.js';
import {ClassSelectService} from '../../service/class-select.service.js';
import {LoadingType} from 'ng-devui';
import {Constan} from '../../../constant/constan.js';
import {ReviewBean} from '../../../bean/indexFirstBean.js';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
/*
* 审核
* */
export class SaveDialogComponent implements OnInit {


  msgs: any[] = [];
  ReviewHttp = {
    Token: sessionStorage.getItem('token'),
    id: ''
  };
  Loadings: LoadingType;


  constructor(
    public dialogRef: MatDialogRef<SaveDialogComponent>,
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
    this.dialogRef.close('0x12');
  }
  //
  onOkClick(): void{
    console.log(this.ReviewHttp);
    this.dialogRef.close('0x13');
  }


}
