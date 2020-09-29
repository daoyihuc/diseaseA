import { TextBean } from './text-bean';


export const DepartmentBeans: TextBean[] = [
  {
    isshow: false,
    name: '主疾病科室',
  },
  {
    isshow: false,
    name: '主疾病区',
  },
  {
    isshow: false,
    name: '主疾病名称',

  },
  {
    isshow: false,
    name: '主疾病ID',

  },
  {
    isshow: false,
    name: '创建人',
  },
  {
    isshow: false,
    name: '创建时间',
  },
  {
    isshow: false,
    name: '最近更新者',

  },
  {
    isshow: false,
    name: '最近更新时间',

  },
  {
    isshow: false,
    name: '级别',
  },
  {
    isshow: false,
    name: '操作步骤',
  }
];
// 列数据
export  class DepartmentClass {
  // isCheck: boolean ; // 是否选择
  MainDiseaseDepartment: string; // 主疾病科室
  DisArea: string; // 主疾病区
  MainDiseaseName: string; // 主疾病名称
  MainDiseaseID: string; //  主疾病ID
  Founder: string; // 创建人
  CreationTime: string; // 创建时间
  RecentlyUpdated: string; // 最近更新者
  LastUpdateTime: string; // 最近更新时间
  Level: string; // 级别
  OperatingId: string; // 操作id
}
// 行数据
export  class DepartmentClassT {
  isCheck: boolean;
  data: any[] = [];
}

