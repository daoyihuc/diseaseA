import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
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



const appRoute: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'index_f', component: IndexFirstComponent},
  {path: 'header', component: HeadersComponent},
  {path: 'Personalcenter', component: PersonalcenterComponent},
  // {
  //   path: 'index',
  //   component: IdexComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: IndexFirstComponent,
  //       children: [
  //         {
  //           path: 'pou',
  //           component: PersonalcenterComponent
  //         }
  //       ]
  //     }
  //   ]
  // },
  {path: 'slide', component: SidesComponent},
  {path: 'loginIndex', component: LoginIndexComponent},
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
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
    IndexFirstComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DevUIModule,
    IndexRouterModule,
    RouterModule.forRoot(appRoute,
      {enableTracing: true}
    ),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
