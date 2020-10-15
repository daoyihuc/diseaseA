export class CaseBean {
  id?: number;
  title: string;
  content: string;
  files: any[] = [];
  imgs?: string = '';
  imgA?: any[] = [];
  base_imgs?: string = '';
  label_title?: any[] = [];
  labelShow?: LabelSow[] = [];
}


export  interface  LabelSow {
  id?: number;
  name?: string;
  labelStyle?: string;
}
