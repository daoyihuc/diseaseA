import {BaseResponse} from '../httpbean/BaseResponse.js';

export  interface AddmdedicalInfo extends BaseResponse{
  data: AddmdedicalInfoBean;
}

export  interface AddmdedicalInfoBean {
   department_id?: number;
   department_name?: string;
   ward_id?: number;
   ward_name?: string;
   diseases_id?: string;
   diseases_name?: string;
}
