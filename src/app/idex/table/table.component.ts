import { Component, OnInit } from '@angular/core';
import {Tablebean} from '../../bean/tablebean.js';
import {TableServiceService} from '../service/table-service.service.js';
import {ActivatedRoute, Router} from '@angular/router';
import {DialogService} from '../service/dialog.service.js';
import {ResourceLoader} from '@angular/compiler';

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
    private TableServic: TableServiceService
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
  }

  getTagValue(value, types, ids): void{
    if (value === 'index/case'){

      this.route.navigate(['index/case', {id: ids, type: types}]);
      setTimeout( () => {
        this.TableServic.sendC(1);
      }, 300);


    }else if (value === 'index'){

    }else{
      this.route.navigate([value]);
      this.TableServic.sendI(1);
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

  deleteTag(index): void{
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
