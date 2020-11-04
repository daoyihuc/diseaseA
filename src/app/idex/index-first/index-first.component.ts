import {Component, OnInit, Input, ElementRef} from '@angular/core';

import * as buttons from '../../bean/buttons';
import { Textbeans } from '../../bean/textbeans';
import { TextBean } from '../../bean/text-bean';
import { LABELS } from '../../bean/lable';
import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef} from '@angular/material/dialog';
import {ReviewDialogComponent} from '../dialogs/review-dialog/review-dialog.component';
import {ClassSelectService} from '../service/class-select.service';
import {SubmitDialogComponent} from '../dialogs/submit-dialog/submit-dialog.component';
import {RouteAnimations} from '../../animation';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpData} from '../../http/HttpData';
import {HttpServiceService} from '../../http/http-service.service.js';
import {MedicalBean} from '../../httpbean/MedicalBean.js';
import {DialogService} from '../service/dialog.service.js';
import {ReviewBean} from '../../bean/indexFirstBean.js';
import {Constan} from '../../constant/constan';
import {LoadingType} from 'ng-devui';
import {UnlockComponent} from '../dialogs/unlock/unlock.component.js';
import {Tablebean} from '../../bean/tablebean.js';
import {TableServiceService} from '../service/table-service.service.js';


@Component({
  selector: 'app-index-first',
  templateUrl: './index-first.component.html',
  styleUrls: ['./index-first.component.css'],
  animations: [
    RouteAnimations
    // animation triggers go here
  ]
})
/*
* 第一个页面
* */

export class IndexFirstComponent implements OnInit {

  label = LABELS;
  values = LABELS;
  buttons_arr = [
    {
      name: '查询',
      id: 0
    },
    {
      name: '重置',
      id: 1
    },
    {
      name: '新增',
      id: 2
    },
    {
      name: '审核',
      id: 3
    },
    {
      name: '提交',
      id: 4
    }
  ];
  // 分页
  pager = {
    total: 306,
    pageIndex: 1,
    pageSize: 10
  };
  // http 数据集
  myData: MedicalBean;

  // 病例状态  1:待审核,
  //     2:审核完成3:校准状态1;4:校准状态2;5:标准状态;6:无效
  CaseStatus = [
    {
      id: 0,
      title: '编辑'
    },
    {
      id: 1,
      title: '待审核'
    },
    {
      id: 2,
      title: '审核完成'
    },
    {
      id: 3,
      title: '校准状态1'
    },
    {
      id: 4,
      title: '校准状态2'
    },
    {
      id: 5,
      title: '标准状态'
    },
    {
      id: 6,
      title: '无效'
    }
    ];
  CaseStatusValue = [];

  // toast
  msgs: any[] = [];

  // 审核数据请求
  ReviewHttp = {
    id: ''
  };

  // 提交数据请求
  submitHttp = {
    id: ''
  };

  // 查询
  selectDate = {
    Token: sessionStorage.getItem('token'),
    id: '',
    username: '',
    diseases_name: '',
    deal_status: ''
  };

  // 遮罩
  Loadings: LoadingType;

  // 树状节点层级
  type: string;
  id: string;
  types: string;


  dataw = {
    Token: sessionStorage.getItem('token'),
    department_id: '',
    ward_id: '',
    diseases_id: '',
  };

  // 标题栏
  // tslint:disable-next-line:variable-name
  Header_isShow = false;
  value: object[] = [];
  constructor(
              private meas: MatDialog, // 弹窗
              private route: Router, // 路由跳转
              private router: ActivatedRoute, // 路由信息接收
              private http: HttpServiceService, //
              private dialog: DialogService,
              public el: ElementRef,
              private recever: ClassSelectService,
              private tableService: TableServiceService,
            )
  {
    this.recever.missionAnnounced$.subscribe(value1 => {
      console.log('子类组件', value1);
    });
    if (this.router.snapshot.paramMap.has('type')){
      this.type = this.router.snapshot.paramMap.get('type');
      if (this.type === 'd'){ // 科室
        this.dataw.department_id = this.router.snapshot.paramMap.get('id');
      }
      if (this.type === 'w'){ // 病区n
        this.dataw.ward_id = this.router.snapshot.paramMap.get('id');
      }
      if (this.type === 'n'){ // 疾病
        this.dataw.diseases_id = this.router.snapshot.paramMap.get('id');
      }
      this.id=this.router.snapshot.paramMap.get('id');
    }

    this.tableService.missionIndex$.subscribe( result => {
      this.dataw.department_id = '';
      this.dataw.ward_id = '';
      this.dataw.diseases_id = '';
      this.type = result.type;
      if (this.type === 'd'){ // 科室
        this.dataw.department_id = String(result.id);
      }
      if (this.type === 'w'){ // 病区n
        this.dataw.ward_id = String(result.id);
      }
      if (this.type === 'n'){ // 疾病
        this.dataw.diseases_id = String(result.id);
      }

      this.https(this.dataw);

    });
  }

  ngOnInit(): void {
    this.Loadings = undefined;
    this.values[this.values.length - 1].isshow = true;
    this.daoyi();
    console.log(this.value);

    this.https(this.dataw);




  }
  onSelectButton(value: number, index: number, name: string): void{
    switch (value) {
      case 0:
        console.log('0');
        this.https(this.selectDate);
        break;
      case 1: // 重置
        this.selectDate.deal_status = '';
        this.selectDate.username = '';
        this.selectDate.diseases_name = '';
        this.selectDate.id = '';
        this.CaseStatusValue = [];
        this.https(this.selectDate);
        console.log('1');
        break;
      case 2:
        console.log('2'); // 新增
        this.route.navigate(['index/case', {id: this.id, type: 'a', types: this.type}]);
        break;
      case 3: // 审核
        console.log('3');
        this.openDialog(3);
        break;
      case 4: // 提交
        console.log('4');
        this.openDialog(4);
        break;
      case 5:
        console.log('5'); // 查看
        const ta = new Tablebean();
        console.log('当前名称', name);
        if (name == null || name === ''){
          ta.name = '未命名';
        }else {
          ta.name = name;
        }
        ta.id = index;
        ta.url = 'index/case';
        ta.type = 'r';
        this.tableService.sendA(ta);
        this.route.navigate(['index/case',  {id: index, type: 'r'}]);
        break;
      case 6:
        console.log('6'); // 编辑
        console.log('当前名称', name);
        const t1 = new Tablebean();
        if (name == null || name === ''){
          t1.name = '未命名';
        }else {
          t1.name = name;
        }
        t1.id = index;
        t1.url = 'index/case';
        t1.type = 'e';
        this.tableService.sendA(t1);
        this.route.navigate(['index/case', {id: index, type: 'e'}]);
        break;
      case 7:
        console.log('7'); // 解锁
        const dialogref7 = this.meas.open(UnlockComponent, {data: { id: index }});
        dialogref7.afterClosed().subscribe(result => {
          if (result === '0x17'){
            this.msgs = this.dialog.showToast(2, '成功解锁');
            const  data = {
              Token: sessionStorage.getItem('token')
            };
            this.https(data);
          }
        });
        break;
      case 8: // 删除
        this.MedicalDeleteHttp(index);
        break;


    }
  }
  openDialog(id: number): void{
    switch (id) {
      case 0:
        console.log('0');

        break;
      case 1:
        console.log('1');
        break;
      case 2:
        console.log('2');
        break;
        // 审核
      case 3:
        console.log('3');
        this.ReviewHttp.id = '';
        this.filterData();
        console.log('indexfirst', this.ReviewHttp);
        const dialogref = this.meas.open(ReviewDialogComponent, {data: { id: this.ReviewHttp.id }});
        // this.recever.sendReview('101');
        dialogref.afterClosed().subscribe(result => {
         if (result === '0x13'){
           this.msgs = this.dialog.showToast(2, '审核完成');
         }
        });
        break;
        // 提交
      case 4:
        this.submitHttp.id = '';
        this.filterData();
        console.log('4');
        console.log('show', this.myData.data.List[0].isActivited);
        const dialogref4 = this.meas.open(SubmitDialogComponent, {data: { id: this.submitHttp.id }});
        dialogref4.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // this.animal = result;
        });
        break;
    }
  }

  // 状态查询
  selectValueD(event): void{
    this.selectDate.deal_status = event.id;
  }

  daoyi(): void{

    for (let i = 0; i < 10; i++){
      const dao = new Textbeans();
      dao.isshow = false;
      dao.name = 'dsd';
      this.value.push(dao);
      console.log(dao);
    }
  }
  // 观察者反应

  // 获取当前分页索引
  pageIndexChangeWithoutFix(pageIndex): void{
    this.checkCount(pageIndex);
  }
  // 分页数据发生改变时候
  pageSizeChangeWithoutFix(pageSize): void{
    this.pager.pageIndex = 1;
    this.checkCount(this.pager.pageIndex);
  }
  checkCount(pageIndex): void{
    console.log('当前分页索引', pageIndex);
  }

  // http请求
  https(data): void{
    this.Loadings = this.http.MedicalList(data).subscribe( datas => {

      if (datas.body.code === 1){
        this.myData = datas.body;
        this.pager.total = this.myData.data.Paginate.Count;
        if (datas.body.msg === ''){
          setTimeout( () => {
            this.msgs = this.dialog.showToast(2, '加载完成');
          }, 3000);

        }else{
          this.msgs = this.dialog.showToast(2, datas.body.msg);
        }

      }else {
        this.msgs = this.dialog.showToast(0, '加载失败');
      }


      // console.log(this.myData);
    });
  }

  // httpstatus
  httpStatus(data): void{
    this.http.UpdateMedicalStatus(data).subscribe( datas => {

    });
  }

  // 解锁
  UnlockHttp(id): void{
    // 状态改变
    const  dataStatus = {
      Token: sessionStorage.getItem('token'),
      id,
      type: '2'
    };
    this.httpStatus(dataStatus);
  }

  // 电子病例删除接口
  MedicalDeleteHttp(id): void {

    // 数据
    const  dataStatus = {
      Token: sessionStorage.getItem('token'),
      MedicalId: id
    };
    this.http.MedicalDelete(dataStatus).subscribe( datas =>{
      console.log(datas);
      if(datas.body.code === 1){
        this.msgs=this.dialog.showToast(2,datas.body.msg);
        this.https(this.dataw);
      }else{
        this.msgs=this.dialog.showToast(1,datas.body.msg);
      }

    });
  }


  // 审核病例数据清洗
  filterData(): void{
    for (let i = 0; i < this.myData.data.List.length; i++){
      if (this.myData.data.List[i].isActivited){
        this.ReviewHttp.id += this.myData.data.List[i].id + ',';
        this.submitHttp.id += this.myData.data.List[i].id + ',';
      }
    }
  }


}
