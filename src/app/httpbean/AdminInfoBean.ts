import {BaseResponse} from './BaseResponse.js';

export interface AdminInfoBean extends BaseResponse{
  data: AdminInfoBeanData;
}

export  interface AdminInfoBeanData {
   id?: number;
   user_number?: string;
   account?: string;
   mobile?: string;
   department_id?: string;
   ward_id?: string;
   type?: number;
   department_name?: string;
   ward_name?: string;
   role_id?: number;
}
