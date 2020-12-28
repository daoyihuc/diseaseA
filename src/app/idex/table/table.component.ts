import { Component, OnInit } from '@angular/core';
import {Tablebean} from '../../bean/tablebean.js';
import {TableServiceService} from '../service/table-service.service.js';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service.js';
import {ResourceLoader} from '@angular/compiler';
import {ReviewDialogComponent} from '../dialogs/review-dialog/review-dialog.component.js';
import {MatDialog} from '@angular/material/dialog';
import {SaveDialogComponent} from '../dialogs/save-dialog/save-dialog.component.js';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor
  (
    private tableRecond: TableServiceService,
    private route: Router,
    private router: ActivatedRoute,
    private dialog: DialogService,
    private meas: MatDialog, // 弹窗
    private TableServic: TableServiceService,
  ) {

    this.tableRecond.missionAnnounced$.subscribe(tablebean => {
        this.addTag(tablebean);
        console.log(tablebean.id);
    });

  }
  // 消息
  msgs: any[] = [];
  tagList2: any[] = [];
  ngOnInit(): void {
    this.TableServic.getDel().subscribe(m => {
      console.log("收到删除信息",m);
      this.del(this.tagList2.length-1);
    },error => {
      console.log("删除信息错误");
    },() => {
      console.log("删除信息超时");
    });
  }

  getTagValue(value, types, ids): void{
    if (value === 'index/case'){

      this.route.navigate(['index/case', {id: ids, type: types}]);
      setTimeout( () => {
        this.TableServic.sendC(1);
      }, 300);


    }else if (value === 'index'){
      this.route.navigate(['index', {id: ids, type: types}]);
      const t1 = new Tablebean();
      t1.id = ids;
      t1.type = types;
      this.TableServic.sendI(t1);
    }else{
      this.route.navigate([value]);

    }

    console.log(value);
  }

  addTag(tabban: Tablebean): void{
    if (this.tagList2.length === 0 ){
      this.tagList2.push(tabban);
      return;
    }else{
      for (let i = 0; i < this.tagList2.length; i++ ){
        if (this.tagList2[i].id === tabban.id){
          this.msgs = this.dialog.showToast(1, '您正处于当前界面,请勿重复点击');
          return;
        }else if (i === this.tagList2.length - 1){
          this.tagList2.push(tabban);
          return;
        }
      }
    }

  }
  del(index): void{
    if(this.tagList2[index].type==='e'||this.tagList2[index].type==='a'){
          if (this.tagList2.length > 0){
            this.tagList2.splice(index, 1);
          }
          console.log("当前导航栏数据",this.tagList2.length);
          // this.route.navigate([this.tagList2[index].url] );
    }
    // else{
    //   if (this.tagList2.length === 1){
    //     this.msgs =  this.dialog.showToast(0, '不能删除最后一个界面哦');
    //     return;
    //   }else if (this.tagList2.length > 1){
    //     this.tagList2.splice(index, 1);
    //   }
    //   console.log(this.tagList2.length);
    //   // this.route.navigate([this.tagList2[index - 1].url] );
    // }
  }


  deleteTag(index): void{
    console.log(index);
    if(this.tagList2[index].type==='e'||this.tagList2[index].type==='a'){
      const isChange = sessionStorage.getItem('isChange');
      let dialogref = null;
      if(isChange==="0"){
         dialogref = this.meas.open(SaveDialogComponent);
      }else{
        if (this.tagList2.length === 1){
          this.msgs =  this.dialog.showToast(0, '不能删除最后一个界面哦');
          return;
        }else if (this.tagList2.length > 1){
          this.tagList2.splice(index, 1);
        }
        console.log(this.tagList2.length);
        this.route.navigate([this.tagList2[index - 1].url] );
      }
      // this.recever.sendReview('101');
      dialogref.afterClosed().subscribe(result => {
        console.log(result);
        if (result === '0x12'){
          if (this.tagList2.length === 1){
            this.msgs =  this.dialog.showToast(0, '不能删除最后一个界面哦');
            return;
          }else if (this.tagList2.length > 1){
            // this.tagList2.splice(index, 1);
          }
          console.log(this.tagList2.length);
          // this.route.navigate([this.tagList2[index - 1].url] );
        }
        if (result === '0x13'){
          if (this.tagList2.length === 1){
            this.msgs =  this.dialog.showToast(0, '不能删除最后一个界面哦');
            return;
          }else if (this.tagList2.length > 1){
            this.tagList2.splice(index, 1);
          }
          console.log(this.tagList2.length);
          this.route.navigate([this.tagList2[index - 1].url] );
        }
      });
    }else{
      if (this.tagList2.length === 1){
        this.msgs =  this.dialog.showToast(0, '不能删除最后一个界面哦');
        return;
      }else if (this.tagList2.length > 1){
        this.tagList2.splice(index, 1);
      }
      console.log(this.tagList2.length);
      this.route.navigate([this.tagList2[index - 1].url] );
    }




  }


}
