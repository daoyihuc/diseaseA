/*
 * @Descripttion:
 * @version:
 * @@Company: DCIT-SH
 * @Author: daoyi(yanwen)
 * @Date: 2020-10-12 13:44:07
 * @LastEditors: daoyi
 * @LastEditTime: 2020-11-24 10:13:46
 */
import {BaseResponse} from './BaseResponse.js';


export interface LabelBean extends BaseResponse{

   data: LabelBeanData2;
}

export  interface LabelBeanData {
   id?: string;
   Term?: string;
   typeId?: string;
   conceptId?: string;
   Activited?: boolean;
}
export interface LabelBeanData2{
  data: LabelBeanData[];
  total_num: any;
}
