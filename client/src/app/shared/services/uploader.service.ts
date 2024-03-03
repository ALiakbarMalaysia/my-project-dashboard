import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { IProducts } from "../interfaces/product.interface";

@Injectable({
  providedIn: "root",
})
export class UploaderService {

 getDataImg$ = new BehaviorSubject({})
 getFileUplaod$ = new BehaviorSubject({})

  constructor(private http: HttpClient, private toastService: ToastrService) { }

  uploadImage(file: File) {
    debugger
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append("file", fileToUpload, fileToUpload.name);
    return this.http.post(`${environment.apiEndPoint}/uploadImage`, formData);
  }

  addProducts(product: IProducts,fileName:string): Observable<IProducts> {
    if (!product) {
      this.toastService.error("No category selected!");
      console.error("No category selected");
      return;
    }
    debugger
    // var parts = product.product_img.split("\\");
    // var fileNameWithExtension = parts[parts.length - 1];
    // var fileNameParts = fileNameWithExtension.split(".");
    // var fileName = fileNameParts[0];
    // Get the extension part
    const payload = {
      product_name: product.product_name,
      product_img: fileName,
      product_long_desc: product.product_long_desc,
      product_price: product.product_price,
      product_short_desc: product.product_short_desc,
      product_weight: product.product_weight,
      product_cart_description: product.product_cart_description
    };
    this.http.post(environment.apiEndPoint + "/" + "product", payload).subscribe((res) => {
      this.toastService.success('محصول شما با موفقیت ثبت شد')
    });
  }

  createProducts(formData: any) { }
}
