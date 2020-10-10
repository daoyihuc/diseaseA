import {BaseResponse} from './BaseResponse.js';

export interface SystemConfigBean extends BaseResponse{
  data: SystemConfigBeanData;
}

export  interface SystemConfigBeanData {
   List?: List[];
   Paginate?: Paginate;
}

export interface Paginate {
   Pages?: number;
   Count?: number;
}

export interface List {
   id?: number;
   type?: number;
   dateline?: string;
   updatetime?: string;
   add_admin?: string;
   update_admin?: string;
   department_name?: string;
   ward_name?: string;
   diseases_name?: string;
   diseases_id?: number;
}
