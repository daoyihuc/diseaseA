import {BaseResponse} from './BaseResponse.js';

export interface UserInfoBean extends BaseResponse{
  data: UserInfoBeanDate;
}

export  interface UserInfoBeanDate {
   id?: number;
   account?: string;
   department_id?: string;
   ward_id?: string;
   mobile?: string;
   department_name?: any;
   ward_name?: any;
   RoleName?: string;
}
