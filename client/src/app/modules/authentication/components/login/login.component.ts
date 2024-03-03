import { Component, OnInit } from "@angular/core";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LoginResultDTO } from "../../interfaces/user";
import { AccountService } from "../../../../shared/services/account.service";

@Component({
  selector: "ali-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: UntypedFormGroup;
  showPassword = false;

  constructor(
    protected router: Router,
    protected accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      user_email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(".+@.+..+"),
      ]),
      user_password: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
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

  submit() {
    this.toastr.clear();
    this.accountService
      .login(this.loginForm.value)
      .subscribe((result: LoginResultDTO) => {
        
        if (result.access_token) {
          this.router.navigate(["/dashboard"]);
          this.toastr.success(
            "ورود شما با موفقیت انجام شد",
            `${result.user.user_firstName + " " + result.user.user_lastName}`
          ),
            {
              timeOut: 1000,
            };
        } else {
          this.toastr.error("لطفاً یک ایمیل معتبر وارد کنید."),
            {
              timeOut: 1000,
            };
        }
      });

  }
  routeLogin() {
    this.router.navigate(["register"]);
  }
}
