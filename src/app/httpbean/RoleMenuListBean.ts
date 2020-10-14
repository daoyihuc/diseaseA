import {BaseResponse} from './BaseResponse.js';

export interface RoleMenuListBean extends BaseResponse{
  data: RoleMenuListData[];
}
export interface RoleMenuListData {
   id?: number;
   title?: string;
   isActivi?: number;
   NextList?: NextList[];
}

export interface NextList {
   id?: number;
   isActivi?: number;
   title?: string;
}
