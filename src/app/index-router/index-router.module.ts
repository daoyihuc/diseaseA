import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IdexComponent } from '../idex/idex.component';
import { IndexFirstComponent } from '../idex/index-first/index-first.component';
import { PersonalcenterComponent } from '../idex/personalcenter/personalcenter.component';
import {DevUIModule, SliderComponent} from 'ng-devui';


const crisisCenterRoutes: Routes = [
  {
    path: 'index',
    component: IdexComponent,
    children: [
      {
        path: '',
        component: IndexFirstComponent
      },
      {
        path: 'person',
        component: PersonalcenterComponent
      },
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
  ]
})
export class IndexRouterModule { }
