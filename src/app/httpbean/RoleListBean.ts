import {BaseResponse} from './BaseResponse.js';

export interface RoleListBean extends BaseResponse{
  data: RoleListBeanData;
}

export interface RoleListBeanData {
   List?: RoleListBeanDataList[];
   Paginate?: Paginate;
}


export interface Paginate {
   Pages?: number;
   Count?: number;
}

export interface RoleListBeanDataList {
  id?: number;
  role_name?: string;
  dateline?: string;
  updatetime?: string;
  CreateName?: string;
  UpdateName?: string;
}
