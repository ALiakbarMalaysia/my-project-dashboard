import { Component, OnInit } from "@angular/core";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "../../../../shared/services/account.service";

@Component({
  selector: "ali-request-password",
  templateUrl: "./request-password.component.html",
  styleUrls: ["./request-password.component.scss"],
})
export class RequestPasswordComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      user_email: new UntypedFormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern(".+@.+..+"),
      ]),
    });
  }

  submit(user_email: string) {
    this.accountService.requestReset(user_email).subscribe((res) => {
      if (res) {
        this.accountService.setEmailUser.next(user_email);
        this.toastr.success("رمز برای ایمیل شما ارسال شد'"),
          {
            timeOut: 1000,
          };
        this.router.navigate(["auth/confirm-password"]);
      } else {
        this.toastr.error("ایمیل شما موجود نمبباشد");
      }
    });
  }
}
