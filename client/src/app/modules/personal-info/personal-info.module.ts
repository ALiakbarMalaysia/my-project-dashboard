import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalInfoRoutingModule } from './personal-info-routing.module';
import { PersonalInfoComponent } from './components/personal-info.component';
import { PersonalInfoEditComponent } from './components/personal-info-edit/personal-info-edit.component';


@NgModule({
  declarations: [
    PersonalInfoComponent,
    PersonalInfoEditComponent
  ],
  imports: [
    CommonModule,
    PersonalInfoRoutingModule
  ]
})
export class PersonalInfoModule { }
