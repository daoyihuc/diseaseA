import {BaseResponse} from './BaseResponse.js';

export interface MedicalInfoBean extends BaseResponse{
  data: MedicalInfoData;
}
export  interface MedicalInfoData {
   id?: number;
   username?: string;
   diseases_id?: number;
   department_id?: number;
   ward_id?: number;
   deal_status?: number;
   deal_time?: number;
   starttime?: string;
   endtime?: string;
   concurrent_name?: string;
   medical_record_diagnosis?: string;
   age?: number;
   gerder?: number;
   occupation?: string;
   birthplace?: string;
   nation?: string;
   marriage?: string;
   blood_pressure?: string;
   height?: string;
   weight?: string;
   temperature?: string;
   heart_rate?: string;
   respiratory_rate?: string;
   chief_complaint?: string;
   remark?: string;
   edit_status?: number;
   editer?: string;
   system_log?: string;
   dateline?: string;
   update_admin?: number;
   updatetime?: string;
   department_name?: string;
   ward_name?: string;
   diseases_name?: string;
   check_time?: string;
   history_of_present_illness?: HistoryOfPresentIllness[];
   other_medical_history?: OtherMedicalHistory[];
   physical_examination?: PhysicalExamination[];
   laboratory_examination?: LaboratoryExamination[];
   supplementary_examination?: SupplementaryExamination[];
}

export interface HistoryOfPresentIllness {
   id?: number;
   title?: string;

   SubList?: SubList[];
}



export interface OtherMedicalHistory {
   id?: number;
   title?: string;
   SubList?: SubList[];
}



export interface PhysicalExamination {
   id?: number;
   title?: string;
   SubList?: SubList[];
}



export interface LaboratoryExamination {
   id?: number;
   title?: string;
   SubList?: SubList[];
}


export interface SupplementaryExamination {
   id?: number;
   title?: string;
   SubList?: SubList[];
}

export interface SubList {
   id?: number;
   title?: string;
   content?: string;
   imgs?: string[];
   dateline?: string;
   LabelList?: LabelList[];
}

export interface LabelList {
   l_id?: number;
   label_title?: string;
   label_color?: any;
   typeId?: string;
   conceptId?: string;
   id?: string;
}
