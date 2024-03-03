import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { IRegister } from "../../interfaces/register.dto";
import { AccountService } from "../../../../shared/services/account.service";
import { ErrorService } from "../../../../shared/clinet-service/error.service";

@Component({
  selector: "ali-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm!: UntypedFormGroup;
  showPassword = true;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private errorService:ErrorService
  ) {}

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      user_firstName: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      user_lastName: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(2),
      ]),
      user_email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
      ]),
      user_password: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      user_confirmPassword: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    this.registerForm = this.createFormGroup();
  }

  getInputType() {
    if (this.showPassword) {
      return "text";
    }
    return "password";
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword() {
    this.showPassword = !this.showPassword;
  }

  submit() {
    this.accountService
      .register(this.registerForm.value)
      .subscribe((res: IRegister) => {
        if (res.code == 200) {

          this.toastr.success("اطلاعات شما با موفقیت ثبت شد"),
            {
              timeOut: 1000,
            };
          this.router.navigate(["auth/login"]);
        }
      });

    // ({
    // next: (restult: IRegister) => {
    //   
    //   if (restult.user_confirmPassword) {

    //
    //   }
    // },
    // complete: () => {
    //   console.log("Register is successfully");
    // },
    // });
  }
}
