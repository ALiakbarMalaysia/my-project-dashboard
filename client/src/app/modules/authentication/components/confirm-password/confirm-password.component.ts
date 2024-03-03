import { Component } from "@angular/core";
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AccountService } from "../../../../shared/services/account.service";

@Component({
  selector: "app-confirm-password",
  templateUrl: "./confirm-password.component.html",
  styleUrls: ["./confirm-password.component.scss"],
})
export class ConfirmPasswordComponent {
  confirmForm!: UntypedFormGroup;
  getUserName!: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toastService: ToastrService
  ) {}

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      password: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  ngOnInit(): void {
    this.confirmForm = this.createFormGroup();
  }

  submit(newPassword: any): void {
    this.accountService.confirmForget(newPassword).subscribe((res) => {
      if (res) {
        this.router.navigate(["auth/reset-password"]);
        this.toastService.success("ورود شما با موفقیت انجام شد"),
          {
            timeOut: 1000,
          };
      }
    });
  }
}
