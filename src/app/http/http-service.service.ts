import { Injectable, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Headers, observes, reType} from './header';
import { Api } from './HttpApi';

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

  // 登录
  Login(data: any): Observable<any>{
    return  this.http.post<any>( Api.Login, data, this.options );
  }
  // 添加菜单接口
  AddMenu(data: any): Observable<any>{
    return  this.http.post<any>( Api.AddMenu, data, this.options );
  }
  // 菜单列表
  MenuList(data: any): Observable<any>{
    return  this.http.post<any>( Api.MenuList, data, this.options );
  }
  // 角色添加编辑接口
  AddRole(data: any): Observable<any>{
    return  this.http.post<any>( Api.AddRole, data, this.options );
  }
  // 角色详情接口
  RoleInfo(data: any): Observable<any>{
    return  this.http.post<any>( Api.RoleInfo, data, this.options );
  }
  // 角色管理列表接口
  RoleList(data: any): Observable<any>{
    return  this.http.post<any>( Api.RoleList, data, this.options );
  }



}
