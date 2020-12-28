import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer2,
  OnChanges,
  SimpleChanges,
  AfterViewChecked
} from '@angular/core';
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
import {TableServiceService} from '../service/table-service.service.js';
import {DoCheck} from '@angular/core';


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit, AfterViewInit, OnChanges, DoCheck, AfterViewChecked {


  id = '0x17';
  type = 'a';
  types = 'd';

  constructor(
    private http: HttpServiceService,
    private el: ElementRef,
    private mes: MatDialog,
    private route: Router,
    private router: ActivatedRoute,
    private dialog: DialogService,
    private renderer2: Renderer2,
    private table: TableServiceService
  ) {


    if (this.router.snapshot.paramMap.has('type')) {
      this.type = this.router.snapshot.paramMap.get('type');
    }
    if (this.router.snapshot.paramMap.has('id')) {
      this.id = this.router.snapshot.paramMap.get('id');
    }

    if (this.router.snapshot.paramMap.has('types')) {
      this.types = this.router.snapshot.paramMap.get('types');
    }
    console.log('case', this.id);
  }

  ngOnChanges(changes: SimpleChanges): void {

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
  // 新文件
  data7: any[] = [];

  // 展示文件
  data8: any[] = [];


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
    'new_files[]': [],
    old_files: '',
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
    system_log: ''
  };


  // 时间配置
  dateConfig = {
    timePicker: false,
    dateConverter: 'y-MM-dd',
    min: 1970,
    max: 2020,
    format: {
      date: 'y-MM-dd',
      time: 'y-MM-dd'
    }
  };
  startTime: string;
  endTime: string;

  // 菜單请求数据
  Datas = {
    Token: sessionStorage.getItem('token'),
    Page: 1,
    PageSize: 10,
    department_id: '',
    ward_id: '',
    diseases_id: ''
  };

  // deleteData
  deleteData = {
    Token: sessionStorage.getItem('token'),
    id: 0x11,
  };

  as11: any = {
    age: '',
    birthplace: '',
    blood_pressure: '',
    check_time: '',
    chief_complaint: '',
    concurrent_name: '  ',
    dateline: '',
    deal_status: "",
    deal_time: "",
    department_id: "",
    department_name: '',
    disase_show_id: '',
    diseases_id: '',
    diseases_name: '',
    edit_status: '',
    editer: '',
    endtime: '',
    files: [],
    gerder: '',
    heart_rate: '',
    height: '',
    history_of_present_illness: [],
    id: '',
    laboratory_examination: [],
    marriage: '',
    medical_record_diagnosis: '',
    nation: '',
    occupation: '',
    other_medical_history: [],
    physical_examination: [],
    remark: null,
    respiratory_rate: '',
    starttime: '',
    supplementary_examination: [],
    system_log: '',
    temperature: '',
    update_admin: '',
    updatetime: '',
    username: '',
    ward_id: '',
    ward_name: '',
    weight: '',
  };
  as1: any = {
    age: '',
    birthplace: '',
    blood_pressure: '',
    check_time: '',
    chief_complaint: '',
    concurrent_name: '  ',
    dateline: '',
    deal_status: "",
    deal_time: "",
    department_id: "",
    department_name: '',
    disase_show_id: '',
    diseases_id: '',
    diseases_name: '',
    edit_status: '',
    editer: '',
    endtime: '',
    files: [],
    gerder: '',
    heart_rate: '',
    height: '',
    history_of_present_illness: [],
    id: '',
    laboratory_examination: [],
    marriage: '',
    medical_record_diagnosis: '',
    nation: '',
    occupation: '',
    other_medical_history: [],
    physical_examination: [],
    remark: null,
    respiratory_rate: '',
    starttime: '',
    supplementary_examination: [],
    system_log: '',
    temperature: '',
    update_admin: '',
    updatetime: '',
    username: '',
    ward_id: '',
    ward_name: '',
    weight: '',
  };
  counts1 = 0;

  ngOnInit(): void {

    sessionStorage.setItem('isChange', '1');

    this.id = this.router.snapshot.paramMap.get('id');
    if (this.router.snapshot.paramMap.has('type')) {
      this.type = this.router.snapshot.paramMap.get('type');
    }
    const data = {
      Token: sessionStorage.getItem('token'),
      id: this.id
    };

    this.table.missionConfirmed$.subscribe(results => {
      // this.HttpInfo(data);
    });


    this.Loadings = undefined;
    console.log('daoyi', jq('body').height());

    if (this.type === 'e') {

      // 用户详情
      const data = {
        Token: sessionStorage.getItem('token'),
        id: this.id
      };
      this.HttpInfo(data);

      // 状态改变
      const dataStatus = {
        Token: sessionStorage.getItem('token'),
        id: this.id,
        type: '1'
      };
      this.httpStatus(dataStatus);

    } else if (this.type === 'r') {
      const data = {
        Token: sessionStorage.getItem('token'),
        id: this.id
      };
      this.HttpInfo(data);
    } else if (this.type === 'a') {
      const a = {
        Token: sessionStorage.getItem('token'),
        department_id: '',
        ward_id: '',
        diseases_id: '',
      };
      if (this.types === 'd') { // 科室
        a.department_id = this.id;
      }
      if (this.types === 'w') { // 病区n
        a.ward_id = this.id;
      }
      if (this.types === 'n') { // 疾病
        a.diseases_id = this.id;
      }
      this.httpAddMedicalInfo(a);
    }
    this.https_Depart(this.Datas, 0);


  }


  getValueStart(value): void {
    const end = value.selectedDate;
    const time = end.getTime();
    const times = new DateUtils().formatDateTime3(time, 'yyyy-MM-dd');
    this.httpData.starttime = times;
    // this.httpData.endtime=
    console.log('时间', times);
  }


  getValueEnd(value): void {
    const end = value.selectedDate;
    const time = end.getTime();
    const times = new DateUtils().formatDateTime3(time, 'yyyy-MM-dd');
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

    if (id !== 6) {
      // 文件大小判断
      if (file.size / 1000 / 1000 > 3) {
        this.showToast('文件不能超过3M哦');
        return;
      }
    } else {
      // 文件大小判断
      if (file.size / 1000 / 1000 > 5) {
        this.showToast('文件不能超过5M哦');
        return;
      }
    }

    // 文件个数选择
    this.add_files(id, index, file);

  }

  test(): void {
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
            this.data1[index].base_imgs += reader.result.toString().split(',')[1] + ',';
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
            this.data2[index].base_imgs += reader.result.toString().split(',')[1] + ',';
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
            this.data3[index].base_imgs += reader.result.toString().split(',')[1] + ',';
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
            this.data4[index].base_imgs += reader.result.toString().split(',')[1] + ',';
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
            this.data5[index].base_imgs += reader.result.toString().split(',')[1] + ',';
            this.data5[index].imgA.push(reader.result);
          };
        } else {
          this.showToast('最多上传5张哦');
        }
        break;
      case 6:
        if (this.data6.length >= 3) {
          this.showToast('只允许上传三个附件哦');
          return;
        }
        const files6 = {
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
        if (this.type !== 'e') {
          this.httpData['files[]'].push(files);
          this.httpData['new_files[]'].push(files);
          this.data6.push(files6);
          console.log('file', this.httpData['files[]']);
        }

        this.data8.push(files6);
        this.data7.push(files6);

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
  addTags(id: number, index: number): void {
    switch (id) {
      case 1: // 现病史
        const tagAdd1 = this.mes.open(AddTagsComponent, {});
        tagAdd1.afterClosed().subscribe((data: LabelBeanData) => {
          this.data1[index].label_title = data;
          for (let i = 0; i < this.data1[index].label_title.length; i++) {
            const a = {id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data1[index].labelShow.push(a);
          }
        });
        break;
      case 2: // 其它病史
        const tagAdd2 = this.mes.open(AddotherComponent, {});
        tagAdd2.afterClosed().subscribe(data => {
          this.data2[index].label_title = data;
          for (let i = 0; i < this.data2[index].label_title.length; i++) {
            const a = {id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data2[index].labelShow.push(a);
          }
        });
        break;
      case 3: // 体格检查
        const tagAdd3 = this.mes.open(PhysiqueComponent, {});
        tagAdd3.afterClosed().subscribe(data => {
          this.data3[index].label_title = data;
          for (let i = 0; i < this.data3[index].label_title.length; i++) {
            const a = {id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data3[index].labelShow.push(a);
          }
        });
        break;
      case 4: // 实验室检验
        const tagAdd5 = this.mes.open(LaboratoryComponent, {});
        tagAdd5.afterClosed().subscribe(data => {
          this.data4[index].label_title = data;
          for (let i = 0; i < this.data4[index].label_title.length; i++) {
            const a = {id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
            // tslint:disable-next-line:radix
            a.id = Number.parseInt(data[i].id);
            a.name = data[i].Term;
            this.data4[index].labelShow.push(a);
          }
        });
        break;
      case 5: // 辅助检查
        const tagAdd4 = this.mes.open(AssistComponent, {});
        tagAdd4.afterClosed().subscribe(data => {
          this.data5[index].label_title = data;
          for (let i = 0; i < this.data5[index].label_title.length; i++) {
            const a = {id: 668, name: '标签颜色4', labelStyle: 'orange-w98'};
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

  // 字模块删除
  rm_child(id: number, index: number): void {
    switch (id) {
      case 1:

        if (this.data1[index].id !== 0x11) {
          this.deleteData.id = this.data1[index].id;
          this.httpDelete(this.deleteData);
        }
        this.data1 = this.del(this.data1, index);
        break;
      case 2:

        if (this.data2[index].id !== 0x11) {
          this.deleteData.id = this.data2[index].id;
          this.httpDelete(this.deleteData);
        }
        this.data2 = this.del(this.data2, index);
        break;
      case 3:

        if (this.data3[index].id !== 0x11) {
          this.deleteData.id = this.data3[index].id;
          this.httpDelete(this.deleteData);
        }
        this.data3 = this.del(this.data3, index);
        break;
      case 4:

        if (this.data4[index].id !== 0x11) {
          this.deleteData.id = this.data4[index].id;
          this.httpDelete(this.deleteData);
        }
        this.data4 = this.del(this.data4, index);
        break;
      case 5:

        if (this.data5[index].id !== 0x11) {
          this.deleteData.id = this.data5[index].id;
          this.httpDelete(this.deleteData);
        }
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
  selectValueD(event): void {
    const data = {
      Token: sessionStorage.getItem('token'),
      parent_id: event.id
    };
    this.https_Depart(data, 1);
    // tslint:disable-next-line:variable-name
    const ward_se = this.el.nativeElement.querySelector('#ward_se');

    if (Constan.DeBug) {
      console.log('daoyi', this.wardvalues);
    }
    this.wardvalues = {};
    this.Datas.department_id = event.id;
    this.httpData.department_id = event.id;
    this.httpData.ward_id = '';
    this.Datas.ward_id = '';
  }

  // 病区选择
  selectValueW(event): void {
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
  selectValueB(event): void {
    this.Datas.diseases_id = event.id;
    this.httpData.diseases_id = event.id;
  }


  // http 请求
  https_Depart(data, type: number): void {
    this.http.DepartmentList(data).subscribe(datas => {
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
      if (Constan.DeBug) {
        console.log(this.myDataDepart);
      }
    });
  }

  // Review
  Review(): void {
    this.httpData.history_of_present_illness = JSON.stringify(this.data1);
    console.log('toLocaleString', JSON.stringify(this.data1));
    this.httpData.other_medical_history = JSON.stringify(this.data2);
    this.httpData.physical_examination = JSON.stringify(this.data3);
    this.httpData.laboratory_examination = JSON.stringify(this.data4);
    this.httpData.supplementary_examination = JSON.stringify(this.data5);
    this.httpData.insert_status = '2';
    const fileForm = new FormData();

    for (const das in this.httpData) {
      console.log('daoyi:::' + das + '::::' + this.httpData[das]);
      if (this.httpData[das] != null && this.httpData[das] !== '' && this.httpData[das] !== []) {
        fileForm.append(das + '', this.httpData[das]);
      }

    }
    if (this.type === 'e') {
      fileForm.append('Token', sessionStorage.getItem('token'));
      const data = {
        Token: sessionStorage.getItem('token'),
        id: this.httpData.id
      };
      this.httpCheck(data);
    } else if (this.type === 'a') {
      this.HttpSave(fileForm);
    }
    // fileForm.append('Token', this.httpData.Token);
    // fileForm.append('files[]', this.data6[0].files6);
    // fileForm.append('insert_status', this.httpData.insert_status);
    // this.httpData.files = fileForm;
    console.log('daoyi', this.httpData);


  }

  // 保存
  sumbit(): void {

    // this.httpData.history_of_present_illness = JSON.stringify(this.data1);
    // console.log('toLocaleString', JSON.stringify(this.data1));
    // this.httpData.other_medical_history = JSON.stringify(this.data2);
    // this.httpData.physical_examination = JSON.stringify(this.data3);
    // this.httpData.laboratory_examination = JSON.stringify(this.data4);
    // this.httpData.supplementary_examination = JSON.stringify(this.data5);
    if (this.data1 !== []) {
      this.httpData.history_of_present_illness = JSON.stringify(this.data1);
      console.log('toLocaleString', JSON.stringify(this.data1));
    }
    if (this.data2 !== []) {
      this.httpData.other_medical_history = JSON.stringify(this.data2);
      console.log('toLocaleString2', JSON.stringify(this.data2));
    }
    if (this.data3 !== []) {
      this.httpData.physical_examination = JSON.stringify(this.data3);
    }
    if (this.data4 !== []) {
      this.httpData.laboratory_examination = JSON.stringify(this.data4);
    }
    if (this.data5 !== []) {
      this.httpData.supplementary_examination = JSON.stringify(this.data5);
    }
    if (this.type === 'a') {
      this.httpData.insert_status = '1';
    }

    const fileForm = new FormData();

    for (const das in this.httpData) {
      // console.log('daoyi:::' + das + '::::' + this.httpData[das]);
      if (this.httpData[das] != null
        && this.httpData[das] !== ''
        && this.httpData[das] !== []
        && das !== 'files[]'
        && das !== 'new_files[]'
        && das !== 'old_files'
      ) {

        fileForm.append(das + '', this.httpData[das]);
      }
    }
    for (let i = 0; i < this.data6.length; i++) {
      if (this.data6[i].files6 != null) {
        fileForm.append('files[]', this.data6[i].files6);
      }
    }
    for (let i = 0; i < this.data7.length; i++) {
      if (this.data7[i].files6 != null) {
        fileForm.append('new_files[]', this.data7[i].files6);
      }
    }
    let a = '';
    for (let i = 0; i < this.data6.length; i++) {
      if (this.data6[i].files6 != null) {
        a += this.data6[i].files6;
      }
    }
    console.log('daoy', a);
    fileForm.append('old_files', a);


    console.log(this.data6);

    // fileForm.append('Token', this.httpData.Token);
    // fileForm.append('files[]', this.data6[0].files6);
    // fileForm.append('insert_status', this.httpData.insert_status);
    // this.httpData.files = fileForm;

    console.log('daoyi', this.httpData);
    if (this.type === 'a') {
      console.log('type', this.type);

      this.HttpSave(fileForm);

    } else if (this.type === 'e') {
      console.log('type', this.type);
      fileForm.append('Token', sessionStorage.getItem('token'));
      this.HttpEdit(fileForm);
    }
    sessionStorage.setItem('isChange', '1');

  }

  // 取消
  cancel(): void {
    this.UnlockHttp();
    window.history.back();
  }

  // http提交
  HttpSave(data): void {
    this.Loadings = this.http.AddMedical(data).subscribe(datas => {
      if (datas.code === 1) {
        if (this.httpData.insert_status === '2') {
          this.msgs = this.dialog.showToast(2, '上传成功');
        } else if (this.httpData.insert_status === '1') {
          this.msgs = this.dialog.showToast(2, datas.msg);
        }
        this.table.sendDel('0');
        setTimeout(() => {
          window.history.back();
        }, 1000);
        this.UnlockHttp();
      } else {
        this.msgs = this.dialog.showToast(2, datas.msg);
        // this.msgs = this.dialog.showToast( 2, "2");
        // alert(datas.msg)
      }
      // this.table.sendDel("0")
      console.log(datas);
    });
  }

  // http编辑
  HttpEdit(data): void {
    this.Loadings = this.http.MedicalEdit(data).subscribe(datas => {
      if (datas.code === 1) {
        this.msgs = this.dialog.showToast(2, '保存成功');
        this.UnlockHttp();
      } else {
        this.msgs = this.dialog.showToast(0, datas.msg);
        // this.msgs = this.dialog.showToast( 0, "1");
        // alert(datas.msg)
      }
      console.log(datas);
    });
  }


  // http 详情
  HttpInfo(data): void {
    this.Loadings = this.http.MedicalInfo(data).subscribe(datas => {
      if (datas.body.code === 1) {

        this.httpData = datas.body.data;
        this.as1 = datas.body.data;
        if(this.counts1 < 1){
          for(let key in datas.body.data){
            this.as11[key] = datas.body.data[key];
          }
          this.counts1++;
        }

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
        this.startTime = datas.body.data.starttime;
        this.endTime = datas.body.data.endtime;
        // console.log('isnull', datas.body.data.history_of_present_illness.length > 0);
        if (datas.body.data.history_of_present_illness.length > 0) {
          this.data1 = datas.body.data.history_of_present_illness[0].SubList;
        }
        if (datas.body.data.other_medical_history.length > 0) {
          this.data2 = datas.body.data.other_medical_history[0].SubList;
        }
        if (datas.body.data.physical_examination.length > 0) {
          this.data3 = datas.body.data.physical_examination[0].SubList;
        }
        if (datas.body.data.laboratory_examination.length > 0) {
          this.data4 = datas.body.data.laboratory_examination[0].SubList;
        }
        if (datas.body.data.supplementary_examination.length > 0) {
          this.data5 = datas.body.data.supplementary_examination[0].SubList;
        }
        this.fileFx(datas.body.data.files);

        // if (this.httpData.insert_status === '2' ){
        //   this.msgs = this.dialog.showToast( 2, '上传成功');
        // }else if (this.httpData.insert_status === '1'){
        //   this.msgs = this.dialog.showToast( 2, '保存');
        // }
        // this.as1 = this.httpData;

      }
      console.log(datas.body.data);
    });
  }

  // 附件解析
  fileFx(datas): void {


    for (let i = 0; i < datas.length; i++) {
      const files6 = {
        names: '附件',
        imgs: '',
        files6: null
      };
      console.log('files1:', datas);
      // toUrl.
      // 文件类型判断
      const suffix = datas[i].split('.');
      if (/(doc|docx|wbk)$/.test(suffix[3])) {
        files6.imgs = './assets/img/word@2x.png';
      } else if (/(xls|xlsx|xlt|xltx|xltm)$/.test(suffix[3])) {
        files6.imgs = './assets/img/excel@2x.png';
      }
      files6.names = '附件' + i;
      files6.files6 = datas[i];
      this.data6.push(files6);
      this.data8.push(files6);

      console.log('files:', this.data6);

    }

  }

  // 附件删除
  deleteFile(): void {
    this.data6 = this.del(this.data6, this.data6.length - 1);
    this.data8 = this.del(this.data8, this.data8.length - 1);
    this.data7 = this.del(this.data7, this.data7.length - 1);

    this.msgs = this.dialog.showToast(0, '删除成功');
    console.log('剩余', this.data6);
  }

  // httpstatus
  httpStatus(data): void {
    this.http.UpdateMedicalStatus(data).subscribe(datas => {

    });
  }

  // 解锁
  UnlockHttp(): void {
    // 状态改变
    const dataStatus = {
      Token: sessionStorage.getItem('token'),
      id: this.id,
      type: '2'
    };
    this.httpStatus(dataStatus);
  }

  // 字模块删除
  httpDelete(data): void {
    this.http.ModuleDelete(data).subscribe(datas => {
      if (datas.body.code === 1) {
        this.msgs = this.dialog.showToast(0, '删除成功');
      }
    });
  }

  // 审核请求
  httpCheck(data): void {
    this.Loadings = this.Loadings = this.http.SubmitCheck(data).subscribe(datas => {
      if (datas.body.code === 1) {
        this.msgs = this.dialog.showToast(2, datas.body.msg);
        setTimeout(() => {
          window.history.back();
        }, 1000);
      } else {
        this.msgs = this.dialog.showToast(2, datas.body.msg);
      }
    });
  }

  // 获取当前所在病例

  httpAddMedicalInfo(data): void {
    this.http.AddMedicalInfo(data).subscribe(res => {
      if (res.body.code === 1) {
        this.DepartValues = {
          id: res.body.data.department_id,
          title: res.body.data.department_name
        };

        this.wardvalues = {
          id: res.body.data.ward_id,
          title: res.body.data.ward_name
        };
        this.diseaseValue = {
          id: res.body.data.diseases_id,
          title: res.body.data.diseases_name
        };
        this.httpData.department_id = res.body.data.department_id;
        this.httpData.ward_id = res.body.data.ward_id;
        this.httpData.diseases_id = res.body.data.diseases_id;
      }
    });
  }


  ngAfterViewInit(): void {
    this.renderer2.setAttribute(this.el.nativeElement.querySelectorAll('input'), 'disabled', 'disabled');

  }

  ngDoCheck(): void {
    console.log('daoyi', this.as1);
    console.log('daoyi', this.as11);
    var test1 = this.hashcode(JSON.stringify(this.as1));
    var test2 = this.hashcode(JSON.stringify(this.as11));
    const a= [];
    if(this.counts1>0){
      for(let key in this.as1){
        const b=this.as1[key] === this.as11[key];
        a.push(b)
      }
    }

    let d=true;
    if(a!=null&&a.length>0){
      for(let i=0;i<a.length;i++){
        if(!a[i]){
          d=false;
        }
      }
    }

    if(!d){
      sessionStorage.setItem("isChange","0");
    }
    // const b = this.as1 === this.as2;
    const c = test1 === test2;
    console.log('数据a', test1);
    console.log('数据b', test2);
    console.log('数据发生改变d', d);
    // sessionStorage.setItem("isChange","0");
  }

  ngAfterViewChecked() {
    // console.log("数据发生改变2");
  }

  hashcode(str) {
    var hash = 0, i, chr, len;
    if (str.length === 0) {
      return hash;
    }
    for (i = 0, len = str.length; i < len; i++) {
      chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

}
