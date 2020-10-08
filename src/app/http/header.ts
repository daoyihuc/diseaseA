
// json
export const Headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', // 表单提交
  // 'Content-Type': 'multipart/form-data', // 文件上载时，既可以上传文件和文本
  'Content-Type':  'application/json',
  Accept: '*/*'
};

// 表單
export const HeadersFrom = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', // 表单提交
  // 'Content-Type': 'multipart/form-data', // 文件上载时，既可以上传文件和文本
  // 'Content-Type':  'application/json',
  Accept: '*/*'
};
// 文件上传
export const HeadersFile = {
  // 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', // 表单提交
  'Content-Type': 'multipart/form-data', // 文件上载时，既可以上传文件和文本
  // 'Content-Type':  'application/json',
  Accept: '*/*'
};

// return 结果
export const observes = 'response'; // 'body' | 'events' | 'response',

// 返回类型
export  const reType = 'json'; //  responseType?: 'arraybuffer'|'blob'|'json'|'text'
