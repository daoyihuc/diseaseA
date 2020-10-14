
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {LoginIndexComponent} from './login-index/login-index.component';
import {DevUIModule, SliderComponent} from 'ng-devui';
import { IdexComponent } from './idex/idex.component';
import { HeadersComponent } from './idex/headers/headers.component';
import { SidesComponent } from './idex/sides/sides.component';
import {FormsModule} from '@angular/forms';
import { IndexFirstComponent } from './idex/index-first/index-first.component';
import { PersonalcenterComponent } from './idex/personalcenter/personalcenter.component';
import {IndexRouterModule} from './index-router/index-router.module';
import { ReviewDialogComponent } from './idex/dialogs/review-dialog/review-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SubmitDialogComponent } from './idex/dialogs/submit-dialog/submit-dialog.component';
import { DepartmentComponent } from './idex/department/department.component';
import { RolesComponent } from './idex/roles/roles.component';
import { AddWardComponent } from './idex/dialogs/add-ward/add-ward.component';
import { AddDepartComponent } from './idex/dialogs/add-depart/add-depart.component';
import { AddDiseaseComponent } from './idex/dialogs/add-disease/add-disease.component';
import { AuthorityComponent } from './idex/authority/authority.component';
import { HttpClientModule } from '@angular/common/http';
import { CaseComponent } from './idex/case/case.component';
import { UseraAddComponent } from './idex/usera-add/usera-add.component';
import { RoleAddComponent } from './idex/role-add/role-add.component';
import {SafePipeModule} from 'ng-devui/utils';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { TableComponent } from './idex/table/table.component';
import {IsloginGuard} from './guards/islogin.guard.js';
import { AddTagsComponent } from './idex/dialogs/add-tags/add-tags.component';
import { AddotherComponent } from './idex/dialogs/addother/addother.component';
import { PhysiqueComponent } from './idex/dialogs/physique/physique.component';
import { LaboratoryComponent } from './idex/dialogs/laboratory/laboratory.component';
import { AssistComponent } from './idex/dialogs/assist/assist.component';
import { ChangePasswordComponent } from './idex/dialogs/change-password/change-password.component';
import { UnlockComponent } from './idex/dialogs/unlock/unlock.component';





const appRoute: Routes = [
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {path: 'index_f', component: IndexFirstComponent, data: {animation: 'HomePage'} },
  {path: 'header', component: HeadersComponent, data: {animation: 'header' }},
  {path: 'Personalcenter', component: PersonalcenterComponent, data: {animation: 'Personalcenter'}},
  {path: 'slide', component: SidesComponent, data: {animation: 'slide'}},
  {path: 'loginIndex', component: LoginIndexComponent, data: {animation: 'loginIndex' } },
  { path: '',  redirectTo: '/login', pathMatch: 'full', data: {animation: 'login'} },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginIndexComponent,
    IdexComponent,
    HeadersComponent,
    SidesComponent,
    PersonalcenterComponent,
    IndexFirstComponent,
    ReviewDialogComponent,
    SubmitDialogComponent,
    DepartmentComponent,
    RolesComponent,
    AddWardComponent,
    AddDepartComponent,
    AddDiseaseComponent,
    AuthorityComponent,
    CaseComponent,
    UseraAddComponent,
    RoleAddComponent,
    TableComponent,
    AddTagsComponent,
    AddotherComponent,
    PhysiqueComponent,
    LaboratoryComponent,
    AssistComponent,
    ChangePasswordComponent,
    UnlockComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DevUIModule,
    IndexRouterModule,
    RouterModule.forRoot(appRoute
    ),
    FormsModule,
    HttpClientModule,
    SafePipeModule,

  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
