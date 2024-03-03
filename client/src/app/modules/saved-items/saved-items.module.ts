import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedItemsRoutingModule } from './saved-items-routing.module';
import { SavedItemsComponent } from './components/saved-items.component';


@NgModule({
  declarations: [
    SavedItemsComponent
  ],
  imports: [
    CommonModule,
    SavedItemsRoutingModule
  ]
})
export class SavedItemsModule { }
