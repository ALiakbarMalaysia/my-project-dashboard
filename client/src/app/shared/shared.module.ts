import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FilePickerModule } from "ngx-awesome-uploader";
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbSelectModule } from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SpliceNumberDirective } from "./directives/splice-number.directive";
import { PersianNumberDirective } from './directives/persian-number.directive';
import { UploaderComponent } from "./components/uploader/uploader.component";
import {MatMenuModule} from '@angular/material/menu';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from "@angular/material/button";
import { SplicNumberCommaDirective } from './directives/splic-number-comma.directive';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ImageCropperModule } from "ngx-image-cropper";
import { ImgCropperComponent } from './components/img-cropper/img-cropper.component';
import { ImgageControlComponent } from './components/imgage-control/imgage-control.component';
import { CropperDialogComponent } from './components/cropper-dialog/cropper-dialog.component';

@NgModule({
  declarations: [
    SpliceNumberDirective,
    PersianNumberDirective,
    UploaderComponent,
    SplicNumberCommaDirective,
    DatePickerComponent,
    ImgCropperComponent,
    ImgageControlComponent,
    CropperDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FilePickerModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    CurrencyMaskModule,
    ImageCropperModule,
    NbDialogModule,
    NbCardModule,
    
    
  ],
  exports: [
    SpliceNumberDirective,
    PersianNumberDirective,
    SplicNumberCommaDirective,
    CurrencyMaskModule,
    ImageCropperModule,
    ImgCropperComponent

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
