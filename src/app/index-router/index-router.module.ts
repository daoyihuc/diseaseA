/*
 * @Descripttion:
 * @version:
 * @@Company: DCIT-SH
 * @Author: daoyi(yanwen)
 * @Date: 2020-09-19 11:14:31
 * @LastEditors: daoyi
 * @LastEditTime: 2020-11-20 18:32:00
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IdexComponent } from '../idex/idex.component';
import { IndexFirstComponent } from '../idex/index-first/index-first.component';
import { PersonalcenterComponent } from '../idex/personalcenter/personalcenter.component';
import { DepartmentComponent } from '../idex/department/department.component';
import { RolesComponent } from '../idex/roles/roles.component';
import { AuthorityComponent } from '../idex/authority/authority.component';
import {CaseComponent} from '../idex/case/case.component';
import {DevUIModule, SliderComponent} from 'ng-devui';
import {UseraAddComponent} from '../idex/usera-add/usera-add.component';
import {RoleAddComponent} from '../idex/role-add/role-add.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {IsloginGuard} from '../guards/islogin.guard.js';


const crisisCenterRoutes: Routes = [
  {
    path: 'index',
    component: IdexComponent,
    canActivate: [IsloginGuard],
    children: [
      {
        path: '',
        component: IndexFirstComponent,
        data: {animation: 'index'}
      },
      {
        path: 'person',
        component: PersonalcenterComponent,
        data: {animation: 'person'}
      },
      {
        path: 'depart',
        component: DepartmentComponent,
        data: {animation: 'depart'}
      },
      {
        // 用户管理
        path: 'roles',
        component: RolesComponent,
        data: {animation: 'roles'}
      },
      {
        // 管理
        path: 'authority',
        component: AuthorityComponent,
        data: {animation: 'authority'}
      },
      {
        // 病例
        path: 'case',
        component: CaseComponent,
        data: {animation: 'case'}
      },
      {
        /*权限编辑/新增*/
        path: 'user_add',
        component: UseraAddComponent,
        data: {animation: 'user_add'}
      }
      ,
      {
        /*用户编辑/新增*/
        path: 'roles_add',
        component: RoleAddComponent,
        data: {animation: 'roles_add'}
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    DevUIModule,
    CommonModule,
    RouterModule.forChild(crisisCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
})
export class IndexRouterModule { }
