import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { COMMON_MESSAGES } from "../data/common-message.data";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  constructor(private toasService: ToastrService, private router: Router) {}

  handle400Error(error: HttpErrorResponse) {
    this.toasService.error(this.getErrorMessage(error));
  }
  handle401Error(error: HttpErrorResponse) {
    this.toasService.clear();
    this.toasService.error(this.getErrorMessage(error));
  }
  handle403Error(error: HttpErrorResponse) {
    this.toasService.error(this.getErrorMessage(error));
    this.router.navigate(["/login"]);
  }
  handle405Error(error: HttpErrorResponse) {
    this.toasService.error(this.getErrorMessage(error));
  }
  handle409Error(error: HttpErrorResponse) {
    this.toasService.error(this.getErrorMessageAdvanced(error));
  }
  handle500Error(error?: HttpErrorResponse) {
    this.toasService.error(COMMON_MESSAGES.serverIsNotResponsible);
  }

  getErrorMessage(error: HttpErrorResponse) {
    return error.error && error.error.message
      ? error.error.message
      : error.statusText
      ? error.statusText
      : COMMON_MESSAGES.unknownError;
  }

  getErrorMessageAdvanced(error: HttpErrorResponse): string {
    if (error.error.parameters) {
      let message = error.error.message.replace(
        /{\w+}/g,
        function (something: string) {
          let number = something.substring(1, something.length - 1);
          return error.error.parameters[Number(number)] || something;
        }
      );
      return message;
    }

    return error.error.message as string;
  }
}
