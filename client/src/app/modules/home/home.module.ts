import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { ProductsModule } from '../products/products.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ThemeModule,
    NbMenuModule,
    ProductsModule,
    SharedModule,
  ]
})
export class HomeModule { }
