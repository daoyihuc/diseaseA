import {Component, OnInit, AfterViewInit, ChangeDetectionStrategy, ElementRef, Renderer2} from '@angular/core';
import {PersonBean} from '../../bean/PersonBean';
import {CommonModule} from '@angular/common';
import {PersonDate1, personDate2} from '../../bean/PersonData';
import * as jq from 'jquery';
import {CaseBean} from '../../bean/caseBean';
import {Constan} from '../../constant/constan.js';
import {HttpServiceService} from '../../http/http-service.service.js';
import {DepartMentBean} from '../../httpbean/DepartMentBean.js';
import {DateUtils} from '../../../libs/DateUtils.js';
import {MatDialog} from '@angular/material/dialog';
import {AddTagsComponent} from '../dialogs/add-tags/add-tags.component.js';
import {AddotherComponent} from '../dialogs/addother/addother.component.js';
import {LaboratoryComponent} from '../dialogs/laboratory/laboratory.component.js';
import {PhysiqueComponent} from '../dialogs/physique/physique.component.js';
import {AssistComponent} from '../dialogs/assist/assist.component.js';
import {LabelBeanData} from '../../httpbean/LabelBean.js';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingType} from 'ng-devui';
import {DialogService} from '../service/dialog.service.js';


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit,AfterViewInit {


  id = '0x17';
  type = 'a';

  constructor(
    private http: HttpServiceService,
    private el: ElementRef,
    private mes: MatDialog,
    private route: Router,
    private router: ActivatedRoute,
    private dialog: DialogService,
    private renderer2: Renderer2
  ) {
    this.type = this.router.snapshot.paramMap.get('type');
    this.id = this.router.snapshot.paramMap.get('id');
  }

  // 消息
  msgs: any[] = [];
  selectedDate2 = null;
  selectedDate3 = null;
  today = new Date();
  min = new Date(this.today.setDate(this.today.getDate() - 1));
  max = new Date(this.today.setDate(this.today.getDate() + 1));
  img: any[] = []; // 文件地址
  // 标签
  imgs: any[] = []; // 文件
  // 个人信息
  persondate1 = PersonDate1;
  persondate2 = personDate2;

  // 整体数据模型
  data1: any[] = [];
  data2: any[] = [];
  data3: any[] = [];
  data4: any[] = [];
  data5: any[] = [];
  // 附件上传
  data6: any[] = [];

  // 遮罩
  Loadings: LoadingType;

  // 科室
  DepartmentOption: any = null;
  DepartValues: any = null;
  // 病区
  WardOption: any = null;
  // 病区值
  wardvalues: any;
  // 主疾病
  diseaseOption: any = null;
  // 病区值
  diseaseValue: any;
  // http
  myDataDepart: DepartMentBean;
  // 请求参数
  httpData: any = {
    Token: sessionStorage.getItem('token'),
    insert_status: '',
    'files[]': [],
    username: '',
    diseases_id: '',
    department_id: '',
    ward_id: '',
    starttime: null,
    endtime: null,
    concurrent_name: '',
    medical_record_diagnosis: '',
    age: '',
    gerder: '',
    occupation: '',
    birthplace: '',
    nation: '',
    marriage: '',
    blood_pressure: '',
    height: '',
    weight: '',
    temperature: '',
    heart_rate: '',
    respiratory_rate: '',
    chief_complaint: '',
    remark: '',
    history_of_present_illness: '',
    other_medical_history: '',
    physical_examination: '',
    laboratory_examination: '',
    supplementary_examination: '',
  };


  // 菜單请求数据
  Datas = {
    Token: sessionStorage.getItem('token'),
    Page: 1,
    PageSize: 10,
    department_id: '',
    ward_id: '',
    diseases_id: ''
  };

  ngOnInit(): void {
    this.Loadings = undefined;
    console.log('daoyi', jq('body').height());
    if (this.type === 'e'){
      const  data = {
        Token: sessionStorage.getItem('token'),
        id: this.id
      };
      this.HttpInfo(data);
    }else if (this.type === 'r'){
      const  data = {
        Token: sessionStorage.getItem('token'),
        id: this.id
      };
      this.HttpInfo(data);


    }
    this.https_Depart(this.Datas, 0);
  }


  getValueStart(value): void {
    const end = value.selectedDate;
    const time = end.getTime();
    const times = new DateUtils().formatDateTime3(time, 'yyyy/MM/dd');
    this.httpData.starttime = times;
    // this.httpData.endtime=
    console.log('时间', times);
  }


  getValueEnd(value): void {
    const end = value.selectedDate;
    const time = end.getTime();
    const times = new DateUtils().formatDateTime3(time, 'yyyy/MM/dd');
    this.httpData.endtime = times;
    // this.httpData.endtime=
    console.log('时间', times);
  }

  // 文件选择
  selected_image(envent, id: number, index: number): void {
    // const file = jq('#image_slected');
    const file = envent.target.files[0];
    console.log(file);
    console.log(file.name);
    // 文件类型判断
    const suffix = file.name.split('.');
    console.log(suffix);
    if (id !== 6) {
      if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix[1])) {
        this.showToast('只能上传图片哦');
        return;
      }
    } else {
      if (!/(doc|docx|wbk|xls|xlsx|xlt|xltx|xltm)$/.test(suffix[1])) {
        this.showToast('只能上传excel,word文档哦');
        return;
      }
    }

    if ( id !== 6 ){
      // 文件大小判断
      if (file.size / 1000 / 1000 > 3) {
        this.showToast('文件不能超过3M哦');
        return;
      }
    }else{
      // 文件大小判断
      if (file.size / 1000 / 1000 > 5) {
        this.showToast('文件不能超过5M哦');
        return;
      }
    }

    // 文件个数选择
    this.add_files(id, index, file);

  }
  test(): void{
    console.log('daoyi', this.httpData);
  }

  // 文件添加
  add_files(id: number, index: number, files): void {
    const reader = new FileReader();
    switch (id) {
      case 1:
        if (this.data1[index].files.length < 5) {
          this.data1[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data1[index].imgs += reader.result.toString().split(',')[1] + ',';
            this.data1[index].imgA.push(reader.result);
          };
        } else {
          this.showToast('最多上传5张哦');
        }
        break;
      case 2:
        if (this.data2[index].files.length < 5) {
          this.data2[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data2[index].imgs += reader.result.toString().split(',')[1] + ',';
            this.data2[index].imgA.push(reader.result);
          };
        } else {
          this.showToast('最多上传5张哦');
        }
        break;
      case 3:
        if (this.data3[index].files.length < 5) {
          this.data3[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data3[index].imgs += reader.result.toString().split(',')[1] + ',';
            this.data3[index].imgA.push(reader.result);
          };
        } else {
          this.showToast('最多上传5张哦');
        }
        break;
      case 4:
        if (this.data4[index].files.length < 5) {
          this.data4[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data4[index].imgs += reader.result.toString().split(',')[1] + ',';
            this.data4[index].imgA.push(reader.result);
          };
        } else {
          this.showToast('最多上传5张哦');
        }
        break;
      case 5:
        if (this.data5[index].files.length < 5) {
          this.data5[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data5[index].imgs += reader.result.toString().split(',')[1] + ',';
            this.data5[index].imgA.push(reader.result);
          };
        } else {
          this.showToast('最多上传5张哦');
        }
        break;
      case 6:
        if (this.data6.length >= 3){
          this.showToast('只允许上传三个附件哦');
          return;
        }
        const files6 =  {
          names: '',
          imgs: '',
          files6: null
        };
        // 文件类型判断
        const suffix = files.name.split('.');
        if (/(doc|docx|wbk)$/.test(suffix[1])) {
          files6.imgs = './assets/img/word@2x.png';
        } else if (/(xls|xlsx|xlt|xltx|xltm)$/.test(suffix[1])) {
          files6.imgs = './assets/img/excel@2x.png';
        }
        files6.names = files.name;
        files6.files6 = files;
        this.httpData['files[]'].push(files);
        console.log('file', this.httpData['files[]']);
        this.data6.push(files6);
        break;
    }
    console.log('d1', this.data1);
    console.log('d2', this.data2);
    console.log('d3', this.data3);
    console.log('d4', this.data4);
    console.log('d5', this.data5);
    console.log('d6', this.data6);
  }


  // 弹窗
  showToast(value: string): void {
    this.msgs = [
      {severity: 'error', life: 3000, summary: '警告', detail: value}
    ];
  }
  // 添加标签
  addTags(id: number, index: number): void{
    switch (id) {
      case 1: // 现病史
        const tagAdd1 = this.mes.open(AddTagsComponent, {});
        tagAdd1.afterClosed().subscribe( (data: LabelBeanData) => {
          this.data1[index].label_title = data;
          for (let i = 0; i < this.data1[index].label_title.length; i++){
            const  a = { id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data1[index].labelShow.push(a);
          }
        });
        break;
      case 2: // 其它病史
        const tagAdd2 = this.mes.open(AddotherComponent, {});
        tagAdd2.afterClosed().subscribe( data => {
          this.data2[index].label_title = data;
          for (let i = 0; i < this.data2[index].label_title.length; i++){
            const  a = { id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data2[index].labelShow.push(a);
          }
        });
        break;
      case 3: // 体格检查
        const tagAdd3 = this.mes.open(PhysiqueComponent, {});
        tagAdd3.afterClosed().subscribe( data => {
          this.data3[index].label_title = data;
          for (let i = 0; i < this.data3[index].label_title.length; i++){
            const  a = { id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data3[index].labelShow.push(a);
          }
        });
        break;
      case 4: // 实验室检验
        const tagAdd5 = this.mes.open(LaboratoryComponent, {});
        tagAdd5.afterClosed().subscribe( data => {
          this.data4[index].label_title = data;
          for (let i = 0; i < this.data4[index].label_title.length; i++){
            const  a = { id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data4[index].labelShow.push(a);
          }
        });
        break;
      case 5: // 辅助检查
        const tagAdd4 = this.mes.open(AssistComponent, {});
        tagAdd4.afterClosed().subscribe( data => {
          this.data5[index].label_title = data;
          for (let i = 0; i < this.data5[index].label_title.length; i++){
            const  a = { id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data5[index].labelShow.push(a);
          }
        });
        break;
    }

  }


  // 标签
  getTagValue(value): void {
    console.log(value.tag);
  }

  deleteTag(id: number, index: number, index2: number): void {
    switch (id) {
      case 1: // 现病史
        this.data1[index].splice(index2, 1);
        break;
      case 2: // 其它病史
        this.data2[index].splice(index2, 1);
        break;
      case 3: // 体格检查
        this.data3[index].splice(index2, 1);
        break;
      case 4: // 实验室检验
        this.data4[index].splice(index2, 1);
        break;
      case 5: // 辅助检查
        this.data5[index].splice(index2, 1);
        break;

    }
  }

  // add child
  add_child(id: number): void {
    switch (id) {
      case 1:
        const cases1 = new CaseBean();
        this.data1.push(cases1);
        break;
      case 2:
        const cases2 = new CaseBean();
        this.data2.push(cases2);
        break;
      case 3:
        const cases3 = new CaseBean();
        this.data3.push(cases3);
        break;
      case 4:
        const cases4 = new CaseBean();
        this.data4.push(cases4);
        break;
      case 5:
        const cases5 = new CaseBean();
        this.data5.push(cases5);
        break;
    }
    console.log(this.data1);
  }

  rm_child(id: number, index: number): void {
    switch (id) {
      case 1:
        this.data1 = this.del(this.data1, index);
        break;
      case 2:
        this.data2 = this.del(this.data2, index);
        break;
      case 3:
        this.data3 = this.del(this.data3, index);
        break;
      case 4:
        this.data4 = this.del(this.data4, index);
        break;
      case 5:
        this.data5 = this.del(this.data5, index);
        break;
    }
    console.log('d1', this.data1);
    console.log('d2', this.data2);
    console.log('d3', this.data3);
    console.log('d4', this.data4);
    console.log('d5', this.data5);

  }

  // 定义删除的方法，需要传递的参数，一是数组，二是该数组里你想要删除的元素
  del(ary, el): any[] {
    const index = ary.indexOf(el);   // 找到要删除的元素对应的下标,从0开始
    const delEle = ary.splice(el, 1);   // splice为从要删除的元素开始,删除一个,刚好就是删除那个元素
    console.log(index);    // 打印要删除元素对应的下标
    return ary;            // 因为splice方法直接对原数组进行改变,所以返回的是删除后的数组
  }


  // 科室选择
  selectValueD(event): void{
    const data = {
      Token: sessionStorage.getItem('token'),
      parent_id: event.id
    };
    this.https_Depart(data, 1);
    // tslint:disable-next-line:variable-name
    const ward_se = this.el.nativeElement.querySelector('#ward_se');

    if (Constan.DeBug){
      console.log('daoyi', this.wardvalues);
    }
    this.wardvalues = {};
    this.Datas.department_id = event.id;
    this.httpData.department_id = event.id;
    this.httpData.ward_id = '';
    this.Datas.ward_id = '';
  }
  // 病区选择
  selectValueW(event): void{
    this.Datas.ward_id = event.id;
    const data = {
      Token: sessionStorage.getItem('token'),
      parent_id: event.id
    };
    this.https_Depart(data, 2);
    this.diseaseValue = {};
    this.httpData.ward_id = event.id;
    this.httpData.diseases_id = '';
    // this.Datas.ward_id = event.id;

  }
  // 主疾病
  selectValueB(event): void{
    this.Datas.diseases_id = event.id;
    this.httpData.diseases_id = event.id;
  }


  // http 请求
  https_Depart(data, type: number): void{
    this.http.DepartmentList(data).subscribe( datas => {
      this.myDataDepart = datas.body;
      switch (type) {
        case 0: // 科室
          this.DepartmentOption = this.myDataDepart.data;
          break;
        case 1: // 病区
          this.WardOption = this.myDataDepart.data;
          break;
        case 2: // 主疾病
          this.diseaseOption = this.myDataDepart.data;
          break;
      }
      if (Constan.DeBug){
        console.log(this.myDataDepart);
      }
    });
  }

  // Review
  Review(): void{
    this.httpData.history_of_present_illness = JSON.stringify(this.data1);
    console.log('toLocaleString', JSON.stringify(this.data1));
    this.httpData.other_medical_history = JSON.stringify(this.data2);
    this.httpData.physical_examination = JSON.stringify(this.data3);
    this.httpData.laboratory_examination = JSON.stringify(this.data4);
    this.httpData.supplementary_examination = JSON.stringify(this.data5);
    this.httpData.insert_status = '2';
    const fileForm = new FormData();
    for (const das in this.httpData){
      console.log('daoyi:::' + das + '::::' + this.httpData[das]);
      if (this.httpData[das] != null && this.httpData[das] !== '' && this.httpData[das] !== []){
        fileForm.append(das + '', this.httpData[das]);
      }

    }
    // fileForm.append('Token', this.httpData.Token);
    // fileForm.append('files[]', this.data6[0].files6);
    // fileForm.append('insert_status', this.httpData.insert_status);
    // this.httpData.files = fileForm;
    console.log('daoyi', this.httpData);
    this.HttpSave(fileForm);
  }

  // 保存
  sumbit(): void{

    // this.httpData.history_of_present_illness = JSON.stringify(this.data1);
    // console.log('toLocaleString', JSON.stringify(this.data1));
    // this.httpData.other_medical_history = JSON.stringify(this.data2);
    // this.httpData.physical_examination = JSON.stringify(this.data3);
    // this.httpData.laboratory_examination = JSON.stringify(this.data4);
    // this.httpData.supplementary_examination = JSON.stringify(this.data5);
    if (this.data1 !=[]){
      this.httpData.history_of_present_illness = JSON.stringify(this.data1);
      console.log('toLocaleString', JSON.stringify(this.data1));
    }else if ( this.data2 !=[]){
      this.httpData.other_medical_history = JSON.stringify(this.data2);
    }else if  (this.data3 !=[]){
      this.httpData.physical_examination = JSON.stringify(this.data3);
    }else if  (this.data4 !=[]){
      this.httpData.laboratory_examination = JSON.stringify(this.data4);
    }else if  (this.data5 !=[]){
      this.httpData.supplementary_examination = JSON.stringify(this.data5);
    }

    const fileForm = new FormData();

    for (const das in this.httpData){
      console.log('daoyi:::' + das + '::::' + this.httpData[das]);
      if (this.httpData[das] != null && this.httpData[das] !== '' && this.httpData[das] !== []){
        fileForm.append(das + '', this.httpData[das]);
      }

    }
    // fileForm.append('Token', this.httpData.Token);
    // fileForm.append('files[]', this.data6[0].files6);
    // fileForm.append('insert_status', this.httpData.insert_status);
    // this.httpData.files = fileForm;
    console.log('daoyi', this.httpData);
    if (this.type === 'a'){
      this.httpData.insert_status = '1';
      this.HttpSave(fileForm);
    }else if (this.type === 'e'){
      fileForm.append('Token', sessionStorage.getItem('token'));
      this.HttpEdit(fileForm);
    }

  }

  // 取消
  cancel(): void{
    window.history.back();
  }

  // http提交
  HttpSave(data): void{
    this.Loadings = this.http.AddMedical(data).subscribe( datas => {
      if (datas.code === 1){
        if (this.httpData.insert_status === '2' ){
          this.msgs = this.dialog.showToast( 2, '上传成功');
        }else if (this.httpData.insert_status === '1'){
          this.msgs = this.dialog.showToast( 2, '保存成功');
        }

      }else {
        this.msgs = this.dialog.showToast( 2, datas.msg);
      }
      console.log(datas);
    });
  }
  // http编辑
  HttpEdit(data): void{
    this.Loadings = this.http.MedicalEdit(data).subscribe( datas => {
      if (datas.code === 1){
        this.msgs = this.dialog.showToast( 2, '保存成功');
      }else{
        this.msgs = this.dialog.showToast( 0, datas.msg);
      }
      console.log(datas);
    });
  }


  // http 详情
  HttpInfo(data): void{
    this.Loadings = this.http.MedicalInfo(data).subscribe( datas => {
      if (datas.body.code === 1){

        this.httpData = datas.body.data;
        this.DepartValues = {
          id: this.httpData.department_id,
          title: datas.body.data.department_name
        };
        this.wardvalues = {
          id: this.httpData.ward_id,
          title: datas.body.data.ward_name
        };
        this.diseaseValue = {
          id: this.httpData.diseases_id,
          title: datas.body.data.diseases_name
        };
        this.data1 = datas.body.data.history_of_present_illness[0].SubList;
        this.data2 = datas.body.data.other_medical_history[0].SubList;
        this.data3 = datas.body.data.physical_examination[0].SubList;
        this.data4 = datas.body.data.laboratory_examination[0].SubList;
        this.data5 = datas.body.data.supplementary_examination[0].SubList;

        // if (this.httpData.insert_status === '2' ){
        //   this.msgs = this.dialog.showToast( 2, '上传成功');
        // }else if (this.httpData.insert_status === '1'){
        //   this.msgs = this.dialog.showToast( 2, '保存');
        // }

      }
      console.log(datas);
    });
  }

  ngAfterViewInit(): void {
    this.renderer2.setAttribute(this.el.nativeElement.querySelectorAll('input'), 'disabled', 'disabled')
  }

}
