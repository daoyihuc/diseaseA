import {BaseResponse} from './BaseResponse.js';


export interface LabelBean extends BaseResponse{

  data: LabelBeanData[];
}

export  interface LabelBeanData {
   id?: string;
   Term?: string;
   typeId?: string;
   conceptId?: string;
   Activited?: boolean;
}
