import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AccountService } from "../../../shared/services/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // const httpOptions: { headers: HttpHeaders } = {
    //   headers: new HttpHeaders({
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   }),
    // };

    const jwt = localStorage.getItem("access_token");
    return next.handle(
      request.clone({ setHeaders: { authorization: `Bearer ${jwt}` } })
    );
  }
}
