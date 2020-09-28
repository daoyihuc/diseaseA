import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {PersonBean} from '../../bean/PersonBean';
import {CommonModule} from '@angular/common';
import { PersonDate1, personDate2} from '../../bean/PersonData';
import * as jq from 'jquery';
import {CaseBean} from '../../bean/caseBean';


@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.css']
})
export class CaseComponent implements OnInit {

  constructor() { }

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
  tagList2: any = [
    { id: 918, name: '标签颜色1', labelStyle: 'blue-w98' }, { id: 1769, name: '标签颜色2', labelStyle: 'green-w98' },
    { id: 555, name: '标签颜色3', labelStyle: 'yellow-w98' }, { id: 668, name: '标签颜色4', labelStyle: 'orange-w98' }
  ];
  // 个人信息
  persondate1 = PersonDate1;
  persondate2 = personDate2;

  // 整体数据模型
  data1: any[] = [];
  data2: any[] = [];
  data3: any[] = [];
  data4: any[] = [];
  data5: any[] = [];

  ngOnInit(): void {
    console.log('daoyi', jq('body').height());

  }


  getValue(value): void{
    console.log(value);
  }
  // 文件选择
  selected_image(envent, id: number, index: number): void{
    // const file = jq('#image_slected');
    const file = envent.target.files[0];
    console.log(file);
    console.log(file.name);
    // 文件类型判断
    const suffix = file.name.split('.');
    console.log(suffix);
    if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(suffix[1])){
      this.showToast('只能上传图片哦');
      return;
    }

    // 文件大小判断
    if (file.size / 1000 / 1000 > 3){
      this.showToast('文件不能超过3M哦');
      return;
    }
    // 文件个数选择
    this.add_files( id, index, file);

  }
  // 文件添加
  add_files(id: number, index: number, files): void{
    const reader = new FileReader();
    switch (id) {
      case 1:
        if (this.data1[index].files.length < 5){
          this.data1[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data1[index].imgs.push(reader.result);
          };
        }else{
          this.showToast('最多上传5张哦');
        }
        break;
      case 2:
        if (this.data2[index].files.length < 5){
          this.data2[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data2[index].imgs.push(reader.result);
          };
        }else{
          this.showToast('最多上传5张哦');
        }
        break;
      case 3:
        if (this.data3[index].files.length < 5){
          this.data3[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data3[index].imgs.push(reader.result);
          };
        }else{
          this.showToast('最多上传5张哦');
        }
        break;
      case 4:
        if (this.data4[index].files.length < 5){
          this.data4[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data4[index].imgs.push(reader.result);
          };
        }else{
          this.showToast('最多上传5张哦');
        }
        break;
      case 5:
        if (this.data5[index].files.length < 5){
          this.data5[index].files.push(files);
          reader.readAsDataURL(files);
          reader.onload = () => {
            this.data5[index].imgs.push(reader.result);
          };
        }else{
          this.showToast('最多上传5张哦');
        }
        break;
    }
    console.log('d1', this.data1);
    console.log('d2', this.data2);
    console.log('d3', this.data3);
    console.log('d4', this.data4);
    console.log('d5', this.data5);
  }



  // 弹窗
  showToast(value: string): void{
    this.msgs = [
      { severity: 'error', life: 3000, summary: '警告', detail: value }
    ];
  }
  // 标签
  getTagValue(value): void {
    console.log(value.tag);
  }
  deleteTag(index): void{
    this.tagList2.splice(index, 1);
  }
  // add child
  add_child(id: number): void{
    switch (id) {
      case 1:
        const  cases1 = new CaseBean();
        cases1.name = 'da';
        this.data1.push(cases1);
        break;
      case 2:
        const  cases2 = new CaseBean();
        this.data2.push(cases2);
        break;
      case 3:
        const  cases3 = new CaseBean();
        this.data3.push(cases3);
        break;
      case 4:
        const  cases4 = new CaseBean();
        this.data4.push(cases4);
        break;
      case 5:
        const  cases5 = new CaseBean();
        this.data5.push(cases5);
        break;
    }
    console.log(this.data1);
  }
  rm_child(id: number, index: number): void{
    switch (id) {
      case 1:
        this.data1 =  this.del(this.data1, index);
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
  del(ary, el): any[]{
    const index = ary.indexOf(el);   // 找到要删除的元素对应的下标,从0开始
    const delEle = ary.splice(el, 1);   // splice为从要删除的元素开始,删除一个,刚好就是删除那个元素
    console.log(index);    // 打印要删除元素对应的下标
    return ary;            // 因为splice方法直接对原数组进行改变,所以返回的是删除后的数组
  }

}
