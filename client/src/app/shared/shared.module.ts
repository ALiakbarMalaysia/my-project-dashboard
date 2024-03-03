import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { NbButtonModule, NbCardModule, NbDialogModule, NbInputModule, NbSelectModule } from "@nebular/theme";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FilePickerModule } from "ngx-awesome-uploader";
import { ImageCropperModule } from "ngx-image-cropper";
import { CropperDialogComponent } from './components/cropper-dialog/cropper-dialog.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { ImageConrolComponent } from './components/image-conrol/image-conrol.component';
import { ImgCropperComponent } from './components/img-cropper/img-cropper.component';
import { UploaderComponent } from "./components/uploader/uploader.component";
import { PersianNumberDirective } from './directives/persian-number.directive';
import { SplicNumberCommaDirective } from './directives/splic-number-comma.directive';
import { SpliceNumberDirective } from "./directives/splice-number.directive";

@NgModule({
  declarations: [
    SpliceNumberDirective,
    PersianNumberDirective,
    UploaderComponent,
    SplicNumberCommaDirective,
    DatePickerComponent,
    ImgCropperComponent,
    CropperDialogComponent,
    ImageConrolComponent,
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
