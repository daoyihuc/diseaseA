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
  AddRole(data: any): Observable<any>{
    return  this.http.post<any>( Api.AddRole, data, this.options )
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
  // 管理员列表接口
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
  AddAdmin(data: any): Observable<BaseResponse>{
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
  AddMedical(data: any): Observable<HttpResponse<BaseResponse>>{
    this.options2.params = data;
    // @ts-ignore
    return  this.http.post<BaseResponse>( Api.AddMedical, data, this.options2)
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
