import {BaseResponse} from './BaseResponse.js';


/*
* @author: daoyi(yw)
* @param: '科室，病区，疾病'
* Date: ${DATE}
* */
export interface DepartMentBean extends BaseResponse{
  data: DepartMentBeanData[];
}


export  interface DepartMentBeanData {
   id?: number;
   title?: string;
}

export  class DepartMentBeanArry {
  id?: number;
  title?: string;
  data: DepartMentBeanData[];
}
