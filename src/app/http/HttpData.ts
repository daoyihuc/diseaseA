


export class HttpData {

  datas: any = {}; // 数据存储栈

  // 用于数据输入
  public setdata(...data): void{
    this.isObjectOrArray(data);
  }
  // 对象判断
  public isObjectOrArray(...data): void{
    for ( let i = 0; i < data.length; i++) {

      if ( data[i] instanceof Object){
        this.getObjectValue(data[i]);
      }else if (data[i] instanceof Array){
        this.getArrayValue(data[i]);
      }
      console.log('daoyi', i);
    }
  }
  // 取值（object）
  public getObjectValue(data): void{

    for (const j in data){

      if (data[j] instanceof Object){
        this.isObjectOrArray(data[j]);
      }else if (data[j] instanceof Array){
        this.getArrayValue(data[j]);
      }else {
        console.log('daoyi2', data[j] + '\n');
      }

    }
  }

  // 取值(array)
  public getArrayValue(data): void{

    for (let i = 0; i < data.length; i++){

      if (data[i] instanceof Object){
        this.isObjectOrArray(data[i]);
      }else if (data[i] instanceof Array){
        this.getArrayValue(data[i]);
      }else {
        console.log('daoyi3', data[i] + '\n');
      }

    }
  }

  public test(): void{
    this.setdata(1 , 1 , 2 , 3);
  }
}
