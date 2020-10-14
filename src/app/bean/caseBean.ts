export class CaseBean {
  id?: number = 0x11;
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
