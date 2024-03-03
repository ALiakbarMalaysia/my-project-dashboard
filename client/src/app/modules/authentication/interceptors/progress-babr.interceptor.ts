import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";



@Injectable({
    providedIn: 'root'
  })
export class ProgressBarService implements HttpInterceptor {
  // progressBarRef: NgProgressRef;
  constructor(private progressBarService: ProgressBarService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.progressBarRef.start();
    return next.handle(req).pipe(
      finalize(() => {
        // this.progressBarRef.complete();
      })
    );
  }
}
