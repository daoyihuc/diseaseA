import {BaseResponse} from './BaseResponse.js';

export interface MedicalBean extends BaseResponse{
  data: MedicalBeanData;
}

export  interface MedicalBeanData {
   List?: List[];
   Paginate?: Paginate;
}

export interface Paginate {
   Pages?: number;
   Count?: number;
}

export interface List {
   id?: number;
   username?: string;
   diseases_id?: number;
   deal_status?: number;
   concurrent_name?: string;
   starttime?: number;
   endtime?: number;
   editer?: string;
   update_admin?: string;
   department_name?: string;
   ward_name?: string;
   diseases_name?: string;
}
