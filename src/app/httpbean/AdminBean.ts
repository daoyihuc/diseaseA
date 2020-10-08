import {BaseResponse} from './BaseResponse.js';

export interface AdminBean extends BaseResponse{
  data: AdminBeanData;
}

export  interface AdminBeanData  {
   List?: List[];
   Paginate?: Paginate;
}

export interface Paginate {
   Pages?: number;
   Count?: number;
}

export interface List {
   id?: number;
   user_number?: string;
   account?: string;
   mobile?: string;
   department_id?: string;
   ward_id?: string;
   type?: number;
   login_ip?: string;
   dateline?: string;
   add_admin?: string;
   updatetime?: string;
   update_admin?: string;
}
