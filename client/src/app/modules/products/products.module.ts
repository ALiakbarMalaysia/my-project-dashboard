import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { NbButtonModule, NbCardModule, NbSelectModule } from '@nebular/theme';
import { ProductsComponent } from './components/products/products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductService } from './services/product.service';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    NbSelectModule,
    NbButtonModule,
    NbCardModule
  ],
  exports:[ProductsComponent],
  providers:[ProductService]
})
export class ProductsModule { }
