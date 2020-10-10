
export class DateUtils{

  /**
   * GMT时间转换为 正常北京时间(string类型)
   * @param time
   * @constructor
   */
  // tslint:disable-next-line:typedef
  GMTToStr(time){
    const date = new Date(time);
    const Str = date.getFullYear() + '-' +
      (date.getMonth() + 1) + '-' +
      date.getDate() + ' ' +
      date.getHours() + ':' +
      date.getMinutes() + ':' +
      date.getSeconds();
    return Str;
  }

  /**
   * string类型转date 时间戳
   * @param date
   */

  // tslint:disable-next-line:typedef
  public str_date(date){

    console.log('日期转换：');
    console.log(date);


    // 前台数据转换获得时间戳 传给后台
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    const date_m = Date.parse(date);
    // console.log(date_m);

    // 将时间戳转换为GMT 格式时间
    const strDate = new Date(date_m);
    // console.log(strDate);

    // 得到正常北京时间
    // @ts-ignore
    const GMTDate = this.GMTToStr(strDate);
    // console.log(GMTDate);

    // 返回时间戳


    return  date_m;
  }

  // 时间戳转日期格式
 formatDateTime3(time, format): void{
    const t = new Date(time);
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
      switch (a){
        case 'yyyy':
          return this.a(t.getFullYear());
          break;
        case 'MM':
          return this.a(t.getMonth() + 1);
          break;
        case 'mm':
          return this.a(t.getMinutes());
          break;
        case 'dd':
          return this.a(t.getDate());
          break;
        case 'HH':
          return this.a(t.getHours());
          break;
        case 'ss':
          return this.a(t.getSeconds());
          break;
      }
    });
  }
  a(i): string{
    return (i < 10 ? '0' : '') + i;
  }


}
