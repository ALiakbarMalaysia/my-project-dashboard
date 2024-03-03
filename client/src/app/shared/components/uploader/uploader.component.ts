import { Component } from "@angular/core";
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { NbDialogService } from "@nebular/theme";
import { ToastrService } from "ngx-toastr";
import { throwError } from "rxjs";
import { IProducts } from "../../interfaces/product.interface";
import { ICategories } from "../../interfaces/uploader.interface";
import { UploaderService } from "../../services/uploader.service";
import { ImgCropperComponent } from "../img-cropper/img-cropper.component";


@Component({
  selector: "ali-uploader",
  templateUrl: "./uploader.component.html",
  styleUrls: ["./uploader.component.scss"],
})
export class UploaderComponent {
  status: "initial" | "uploading" | "success" | "fail" = "initial";
  form: UntypedFormGroup;
  data: ICategories[] = [
    { id: 1, brand: "لباس" },
    { id: 2, brand: "کفش" },
  ];
  itemSelected: ICategories;
  selectedValue: any;
  type = "select";
  file: File | null = null;
  imageUrl = "";
  fileToUpload;
  priceValue = 0.
  imageChangedEvent: any = '';
  croppedImage: any = '';
  product_img;
  profileImage = '';
  imageToCrop: File;
  getImge;

  constructor(
    private uploadService: UploaderService,
    private toastService: ToastrService,
    private dialogService: NbDialogService,
  ) {
    this.uploadService.getDataImg$.subscribe((res)=>{
   this.product_img = res
    })
    this.uploadService.getFileUplaod$.subscribe((res)=>{
   this.getImge = res
    })

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      product_name: new FormControl("", Validators.required),
      product_price: new FormControl(null, Validators.required),
      product_weight: new FormControl(null),
      product_cart_description: new FormControl(""),
      product_short_desc: new FormControl(""),
      product_long_desc: new FormControl(""),
    });
  }

  onChange(event: any) {
    const files = event.target.files;
    this.fileToUpload = event.target.files[0];
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);

    if (files) {
      this.status = "initial";
      this.file = files;
    }
  }

  onUpload() {
    if (this.file) {
      // const formData: FormData = new FormData();
      // const fileToUpload = this.file[0] as File;
      // const formData = new FormData();
      // formData.append('file', fileToUpload, fileToUpload.name);

      // formData.append("image", this.file, this.file.name);
      const upload$ = this.uploadService.uploadImage(this.file);
      this.status = "uploading";
      upload$.subscribe({
        next: () => {
          this.status = "success";
        },
        error: (error: any) => {
          this.status = "fail";
          return throwError(() => error);
        },
      });
    }
  }

  onSelectStatus(formData: IProducts): void {
    if (formData) {
      // this.uploadService.addProducts(formData);
    }
  }



  openUploadImg(){
    this.dialogService.open(ImgCropperComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    })
      
  }


  

  handleFileClick(file: HTMLInputElement): void {
    file.click(); // trigger input file
  }

  fileChangeEvent(event: any): void {
    if (event.target.files.length) {
      this.imageToCrop = event;
    } else {
      this.profileImage = '';
    }
  }

  onCrop(image: File) {
    if (image) {
      console.log('cropped image ready for upload:', image);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(image);
    } else {
      this.profileImage = '';
    }
  }
  submit(formData: IProducts) {
    // let [val1] = formData.product_img.split('/')[1].split('/')
    if (!formData) {
      this.toastService.error("Not added!");
    } else {
      this.uploadService.addProducts(formData,this.product_img);
    }
  }



}
