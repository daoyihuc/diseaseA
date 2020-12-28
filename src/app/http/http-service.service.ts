import { Injectable, OnInit } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse, HttpEvent,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams, HttpProgressEvent,
  HttpResponse,
  HttpSentEvent, HttpUserEvent
} from '@angular/common/http';
import {Headers, HeadersFile, observes, reType} from './header';
import { Api } from './HttpApi';
import {catchError} from 'rxjs/operators';
import {LoginBean} from '../httpbean/LoginBean.js';
import {BaseResponse} from '../httpbean/BaseResponse.js';
import {MenulistBean} from '../httpbean/MenulistBean.js';
import {RoleListBean} from '../httpbean/RoleListBean.js';
import {AdminBean} from '../httpbean/AdminBean.js';
import {MedicalBean} from '../httpbean/MedicalBean.js';
import {DepartMentBean} from '../httpbean/DepartMentBean.js';
import {AdminInfoBean} from '../httpbean/AdminInfoBean.js';
import {SystemConfigBean} from '../httpbean/SystemConfigBean.js';
import {LabelBean} from '../httpbean/LabelBean.js';
import {UserInfoBean} from '../httpbean/UserInfoBean.js';
import {MedicalInfoBean} from '../httpbean/MedicalInfoBean.js';
import {RoleMenuListBean} from '../httpbean/RoleMenuListBean.js';
import {AddmdedicalInfo} from '../bean/AddmdedicalInfo.js';

@Injectable({
  providedIn: 'root'
})

export class HttpServiceService {

  // 初始化http请求
  constructor(private http: HttpClient) { }

  options: any = {
    headers: new HttpHeaders(Headers),
    observe: observes,
    params: null,
    reportProgress: false,
    responseType: 'json',
    withCredentials: false,
  };
  options2: any = {
    headers: new HttpHeaders(HeadersFile),
    observe: observes,
    params: null,
    reportProgress: false,
    responseType: 'json',
    withCredentials: false,
  };

  // 登录
  Login(loginBean: any): Observable<HttpResponse<LoginBean>> {
    // this.options.params = data;
    // @ts-ignore
    return  this.http.post< LoginBean > ( Api.Login, loginBean, this.options)
            .pipe(
              // catchError(this.handleError)
            );
  }
  // 添加菜单接口
  AddMenu(data: any): Observable<any>{
    return  this.http.post<any>( Api.AddMenu, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 菜单列表
  MenuList(data: any): Observable<HttpResponse<MenulistBean>>{
    // @ts-ignore
    return  this.http.post<MenulistBean>( Api.MenuList, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 角色添加编辑接口
  AddRole(data: any): Observable<HttpResponse<BaseResponse>>{
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.AddRole, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 角色详情接口
  RoleInfo(data: any): Observable<any>{
    return  this.http.post<any>( Api.RoleInfo, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 角色管理列表接口
  RoleList(data: any): Observable<HttpResponse<RoleListBean>>{
    // @ts-ignore
    return  this.http.post<RoleListBean>( Api.RoleList, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 管理员列表接口
  AdminList(data: any): Observable<HttpResponse<AdminBean>>{
    // @ts-ignore
    return  this.http.post<AdminBean>( Api.AdminList, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 电子病历列表接口(首页接口)
  MedicalList(data: any): Observable<HttpResponse<MedicalBean>>{
    // @ts-ignore
    return  this.http.post<MedicalBean>( Api.MedicalList, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 管理员列表接口
  DepartmentList(data: any): Observable<HttpResponse<DepartMentBean>>{
    // @ts-ignore
    return  this.http.post<DepartMentBean>( Api.DepartmentList, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 管理员新增编辑提交接口
  AddAdmin(data: any): Observable<HttpResponse<BaseResponse>>{
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.AddAdmin, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 权限管理详情接口
  AdminInfo(data: any): Observable<HttpResponse<AdminInfoBean>>{
    // @ts-ignore
    return  this.http.post<AdminInfoBean>( Api.AdminInfo, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 权限管理详情接口
  SystemConfig(data: any): Observable<HttpResponse<SystemConfigBean>>{
    // @ts-ignore
    return  this.http.post<SystemConfigBean>( Api.SystemConfig, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 获取标注列表接口
  LabelShow(data: any): Observable<HttpResponse<LabelBean>>{
    // @ts-ignore
    return  this.http.post<LabelBean>( Api.LabelShow, data, this.options )
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 新增病历接口
  AddMedical(data: FormData): Observable<BaseResponse>{
    // this.options2.params = data;
    return  this.http.post<BaseResponse>( Api.AddMedical, data)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 病历审核接口
  MedicalCheck(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.MedicalCheck, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  MedicalCalibration(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.MedicalCalibration, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  UpdateMedicalStatus(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.UpdateMedicalStatus, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  UpdatePassword(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.UpdatePassword, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 个人中心
  UserInfo(data: any): Observable<HttpResponse<UserInfoBean>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<UserInfoBean>( Api.UserInfo, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 病例详情
  MedicalInfo(data: any): Observable<HttpResponse<MedicalInfoBean>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<MedicalInfoBean>( Api.MedicalInfo, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }


  // 病例编辑
  MedicalEdit(data: FormData): Observable<BaseResponse>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.MedicalEdit, data)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 病例编辑
  ModuleDelete(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.ModuleDelete, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 加角色配置权限列表接口
  RoleMenuList(data: any): Observable<HttpResponse<RoleMenuListBean>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<RoleMenuListBean>( Api.RoleMenuList, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  } // 加角色配置权限列表接口
  SystemDelete(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<RoleMenuListBean>( Api.SystemDelete, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 编辑
  EditSystem(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<RoleMenuListBean>( Api.EditSystem, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }

  // 病例删除
  MedicalDelete(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<RoleMenuListBean>( Api.MedicalDelete, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 用户删除
  AdminDelete(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.AdminDelete, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 新增电子病历 科室，病区，主疾病信息获取接口
  AddMedicalInfo(data: any): Observable<HttpResponse<AddmdedicalInfo>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<AddmdedicalInfo>( Api.AddMedicalInfo, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }
  // 审核
  SubmitCheck(data: any): Observable<HttpResponse<BaseResponse>>{
    // this.options2.params = data;
    // @ts-ignore
    return  this.http.post<AddmdedicalInfo>( Api.SubmitCheck, data, this.options)
      .pipe(
        // catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse): Observable<never>{
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
