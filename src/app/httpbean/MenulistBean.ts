import {BaseResponse} from './BaseResponse.js';

export interface MenulistBean extends BaseResponse{
  data: MenulistBeanDate;
}

export interface MenulistBeanDate {
   id?: number;
   title?: string;
   pid?: number;
   children?: Children[];
}

export interface Children {
   id?: number;
   title?: string;
   pid?: number;
   children?: Children[];
}


