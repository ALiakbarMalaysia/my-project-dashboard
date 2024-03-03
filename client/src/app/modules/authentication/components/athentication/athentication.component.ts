import { Component, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { Location } from "@angular/common";
import { NbAuthService } from "@nebular/auth";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "ali-authentication",
  templateUrl: "./athentication.component.html",
  styleUrls: ["./athentication.component.scss"],
})
export class AuthenticationComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  subscription: any;

  authenticated: boolean = false;
  token: string = '';

  // showcase of how to use the onAuthenticationChange method
  constructor(protected auth: NbAuthService, protected location: Location) {

    this.subscription = auth.onAuthenticationChange()
      .pipe(takeUntil(this.destroy$))
      .subscribe((authenticated: boolean) => {
        this.authenticated = authenticated;
      });
  }

  back() {
    this.location.back();
    return false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
