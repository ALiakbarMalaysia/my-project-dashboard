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
  selector: "ali-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  changepassForm!: UntypedFormGroup;

  constructor(
    protected router: Router,
    protected accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.changepassForm = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      newPassword: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  submit(password) {
    this.accountService.changePassword(password).subscribe((res) => {
      if (res) {
        this.toastr.success("پسوورد شما با موفقیت تغییر یافت"),
          {
            timeOut: 1000,
          };
        this.router.navigate(["pages"]);
      } else {
        this.toastr.error("You email is not verified");
      }
    });
  }
}
