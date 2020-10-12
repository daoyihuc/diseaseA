export class CaseBean {
  title: string;
  content: string;
  files: any[] = [];
  imgs?: string = '';
  imgA?: any[] = [];
  label_title?: any[] = [];
  labelShow?: LabelSow[] = [];
}


export  interface  LabelSow {
  id?: number;
  name?: string;
  labelStyle?: string;
}
