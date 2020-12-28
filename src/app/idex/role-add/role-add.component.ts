import {Component, ElementRef, OnInit} from '@angular/core';
import {HttpServiceService} from '../../http/http-service.service.js';
import {DepartMentBean, DepartMentBeanArry} from '../../httpbean/DepartMentBean.js';
import {Constan} from '../../constant/constan.js';
import {typeValue} from '../../bean/lable.js';
import {RoleListBean} from '../../httpbean/RoleListBean.js';
import {ConsoleLogger} from '@angular/compiler-cli/ngcc';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {ClassSelectService} from '../service/class-select.service.js';
import {LoadingType} from 'ng-devui';
import {DialogService} from '../service/dialog.service.js';
import {AdminInfoBean, AdminInfoBeanData} from '../../httpbean/AdminInfoBean.js';
import {DepartmentBeans} from '../../bean/departmentBean.js';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  // 科室
  DepartmentOption: any = null;
  DepartValues: any = null;
  // 病区
  WardOption: any = null;
  // 病区值
  wardvalues: any;
  // 账号类型
  accountType = typeValue;
  accountValue: any = null;
  // 角色名称
  AccountName: any[] = [];
  // id
  roleId = 0;

  // 提交数据结构
  // 编号(新增必传)
  // 用户姓名(新增必传)
  // 手机号(新增必传)
  // 科室ID,逗号隔开(新增必传)
  // 病区ID,逗号隔开(新增必传)
  // 账号类型(0:医生；1：管理员)(新增必传)
  // 密码(新增必传)
  // 角色ID(新增必传)
  // 处理类型(值为add:新增；值为edit：编辑)
  // 管理员ID(编辑必传)
  SavaDateName: any = [
    '编号不能为空',
    '用户姓名不能为空',
    '手机号不能为空',
    '科室不能为空',
    '病区不能为空',
    '账号类型不能为空',
    '密码不能为空',
    '角色不能为空',
    '处理类型不能为空',
    '管理员不能为空',
  ];
  SaveData: any = {
    Token: sessionStorage.getItem('token'),
    user_number: '',
    account: '',
    mobile: '',
    department_id: '',
    ward_id: '',
    type: '',
    password: '',
    role_id: '',
    deal_type: '',
    id: ''
  };
  SaveDataShow: AdminInfoBeanData;

  // toast
  msg: any[] = [];

  // 遮罩
  loadings: LoadingType;

  // http 数据结构
  myDataDepart: DepartMentBean;
  myDataRole: RoleListBean;

  // show_button
  showButton = true;

  // 科室二次数据
  DepartData: DepartMentBeanArry[] = [];

  constructor(
    private http: HttpServiceService,
    private el: ElementRef,
    private route: Router,
    private router: ActivatedRoute,
    private classSelectService: ClassSelectService,
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    this.loadings = undefined;
    const data = {
      Token: sessionStorage.getItem('token')
    };
    this.https_Depart(data, 0);
    this.http_roles(data);
    this.SaveData.deal_type = this.router.snapshot.paramMap.get('type');
    if (this.router.snapshot.paramMap.has('id')){
        this.SaveData.id = this.router.snapshot.paramMap.get('id');
    }
    if (this.SaveData.deal_type === 'edit'){
      const eData = {
        Token: sessionStorage.getItem('token'),
        id: this.SaveData.id
      };
      this.httpInfo(eData);
    }
    if (this.SaveData.deal_type === 'show'){
      this.showButton = false;
      const eData = {
        Token: sessionStorage.getItem('token'),
        id: this.SaveData.id
      };
      this.httpInfo(eData);
    }

  }
  // http 请求
  https_Depart(data, type: number): void{
    this.http.DepartmentList(data).subscribe( datas => {
      this.myDataDepart = datas.body;
      switch (type) {
        case 0: // 科室
          this.DepartmentOption = this.myDataDepart.data;
          this.filiterData();
          break;
        case 1: // 病区
          this.WardOption = this.myDataDepart.data;
          break;
      }
      if (Constan.DeBug){
          console.log(this.myDataDepart);
      }
    });
  }

  filiterData(): void{
    console.log('结果', '数据清洗中');
    const results = [];
    for( let i = 0; i < this.myDataDepart.data.length; i++) {
      const result = new DepartMentBeanArry();
      result.id = this.myDataDepart.data[i].id;
      result.title = this.myDataDepart.data[i].title;
      const data = {
        Token: sessionStorage.getItem('token'),
        parent_id: result.id
      };
      this.http.DepartmentList(data).subscribe( datas => {
        result.data = datas.body.data;
        results.push(result);
      });


    }
    console.log('结果', '' + results);
    this.DepartData = results;
  }

  // change
  changes(i, j, envent): void{
    if (envent){
      this.DepartData[i].data[j].isActivited = 1;
      this.DepartData[i].isActivited = 1;
    }else {
      this.DepartData[i].data[j].isActivited = 0;
    }
    let isc = false;
    // for (let i1 = 0; i1 < this.DepartData.length; i1++){

      for (let j1 = 0; j1 < this.DepartData[i].data.length; j1++){
        if (this.DepartData[i].data[j1].isActivited === 1){
          isc = true;
        }
      }

    // }
    if (!isc){
      this.DepartData[i].isActivited = 0;
    }
    console.log(this.DepartData);
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
    this.SaveData.department_id = event.id;
    this.SaveData.ward_id = '';
  }
  // 病区选择
  selectValueW(event): void{
    this.SaveData.ward_id = event.id;
  }
  // 类型选择
  selectValueP(event): void{
    this.SaveData.type = event.id;
  }




  // http_roles
  http_roles(data): void{
    this.http.RoleList(data).subscribe(datas => {
      this.myDataRole = datas.body;
      for (let i=0;i<this.myDataRole.data.List.length;i++){
        const isSelect = {
          id: 0,
          isSelected: false
        };
        // @ts-ignore
        isSelect.id = this.myDataRole.data.List[i].id;
        this.AccountName.push(isSelect);
        console.log("daoyiww",this.AccountName);
      }
    });
  }

  // 类型选择
  typeClick(index): void{
    console.log('daoyi', index);
    for (let i = 0; i < this.AccountName.length ; i++){
       if (i === index ){
         this.AccountName[index].isSelected = true;
         this.SaveData.role_id = this.myDataRole.data.List[index].id;
       }else{
         this.AccountName[i].isSelected = false;
       }
    }
    console.log(this.AccountName);
  }

  // 输入记录
  InputChange(envent, count: number): void{
    switch (count) {
      case 0: // 用户编号
        this.SaveData.user_number = envent.target.value;
        break;
      case 1: // 用户姓名
        this.SaveData.account = envent.target.value;
        break;
      case 2: // 用户手机
        this.SaveData.mobile = envent.target.value;
        break;
      case 3: // 用户密码
        this.SaveData.password = envent.target.value;
        break;
    }
    if (Constan.DeBug){
        console.log('daoyi', this.SaveData);
    }
  }

  // sumbit
  sumbit(): void{
    this.filterData();
    if (this.SaveData.deal_type === 'edit'){
      console.log('daoyi', 'edit' );
      if (this.SaveData.user_number === '' && this.SaveData.account === '' && this.SaveData.mobile === ''
        && this.SaveData.department_id === '' && this.SaveData.ward_id === '' && this.SaveData.type === ''
        && this.SaveData.password === '' && this.SaveData.role_id === ''){
        this.msg = this.dialog.showToast(1, '还没有做任何修改哦');
      }else{
        this.httpSave(this.SaveData);
      }
    }else{
      if (this.SaveData.user_number === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[0]);
      }else if (this.SaveData.account === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[1]);
      }else if (this.SaveData.mobile === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[2]);
      }else if (this.SaveData.department_id === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[3]);
      }else if (this.SaveData.ward_id === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[4]);
      }else if (this.SaveData.type === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[5]);
      }else if (this.SaveData.password === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[6]);
      }else if (this.SaveData.role_id === ''){
        this.msg = this.dialog.showToast(1, this.SavaDateName[7]);
      }else {
        this.httpSave(this.SaveData);
      }
    }


  }
  // 数据筛选拼接
  filterData(): void{

    for (let i = 0; i < this.DepartData.length; i++){

      for (let j = 0; j < this.DepartData[i].data.length; j++){

        if (this.DepartData[i].data[j].isActivited === 1){
          this.SaveData.ward_id += this.DepartData[i].data[j].id + ',';
        }
      }
      if (this.DepartData[i].isActivited === 1){
        this.SaveData.department_id += this.DepartData[i].id + ',';
      }
    }
  }

  // 判断id是否存在
  isHave(a, b): void{
    console.log('当前id', a);
    // console.log('对比id', this.DepartData[i].id);
    for (let i = 0; i < a.length; i++){
      console.log('当前id', a[i]);
      this.isHave1(a[i]);
    }
    for (let i = 0; i < b.length; i++){
      this.isHave1(b[i]);
    }
  }
  //
  isHave1(a): void{
    for (let i = 0; i < this.DepartData.length; i++){
      // 是否是科室id
      console.log('当前id2', a);
      console.log('对比id', this.DepartData[i].id);
      console.log('对比', this.DepartData[i].id == a);
      if (a == this.DepartData[i].id){
        this.DepartData[i].isActivited = 1;
      }
      for (let j = 0; j < this.DepartData[i].data.length; j++){

        // 是否是病区id
        if (a == this.DepartData[i].data[j].id){
          this.DepartData[i].data[j].isActivited = 1;
        }
        console.log('对比', this.DepartData[i].data[j].id == a);
      }

    }
  }


  // httpSave
  httpSave(data): void{
    this.loadings = this.http.AddAdmin(data).subscribe( datas => {
        if (datas.body.code === 1) {
          this.msg = this.dialog.showToast(2, '保存成功');
          setTimeout( () => {
            window.history.back();
          }, 1000);
        }else{
          this.msg = this.dialog.showToast(0, datas.body.msg);
        }
      });
  }
  // 管理员详情
  httpInfo(data): void{
    this.http.AdminInfo(data).subscribe( datas => {
      this.SaveDataShow = datas.body.data;
      this.wardvalues = {
        id: this.SaveDataShow.ward_id,
        title: this.SaveDataShow.ward_name
      };
      this.DepartValues = {
        id: this.SaveDataShow.department_id,
        title: this.SaveDataShow.department_name
      };
      console.log('qwe1', this.SaveDataShow.type);
      if ( this.SaveDataShow.type === 0 ){
        this.accountValue = {
          id: this.SaveDataShow.type,
          name: '医生'
        };
      }else if (this.SaveDataShow.type === 1 ){
        this.accountValue = {
          id: this.SaveDataShow.type,
          name: '管理员'
        };
      }
      this.roleId = this.SaveDataShow.role_id;
      let depatArray = this.SaveDataShow.department_id.toString().split(',');
      depatArray = this.del(depatArray, depatArray.length - 1);
      let waryArray = this.SaveDataShow.ward_id.toString().split(',');
      waryArray = this.del(waryArray, waryArray.length - 1);
      setTimeout( () => {
        if (this.DepartData.length > 0){
          this.isHave(depatArray, waryArray);
        }
      }, 1000);


      console.log(depatArray);
      console.log(waryArray);

      if (Constan.DeBug){
        console.log('qwe', this.SaveDataShow);
      }
    });
  }
  // 定义删除的方法，需要传递的参数，一是数组，二是该数组里你想要删除的元素
  del(ary, el): any[] {
    const index = ary.indexOf(el);   // 找到要删除的元素对应的下标,从0开始
    const delEle = ary.splice(el, 1);   // splice为从要删除的元素开始,删除一个,刚好就是删除那个元素
    console.log(index);    // 打印要删除元素对应的下标
    return ary;            // 因为splice方法直接对原数组进行改变,所以返回的是删除后的数组
  }



  // 取消按钮
  cancle(): void{
    this.route.navigate(['index/authority']);
  }

}
