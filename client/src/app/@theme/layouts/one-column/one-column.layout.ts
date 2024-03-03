import { Component } from "@angular/core";
import { NbLayoutDirection, NbLayoutDirectionService } from "@nebular/theme";

@Component({
  selector: "ngx-one-column-layout",
  styleUrls: ["./one-column.layout.scss"],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
        <!-- <label dir="ltr">
          <input type="checkbox" value="isRtl" (click)="toggleFlow()" />
          <span>RTL</span>
        </label> -->
      </nb-layout-column>

      <!-- <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar> -->

      <!-- <nb-sidebar>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar> -->

      <nb-sidebar right>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  constructor(private directionService: NbLayoutDirectionService) {}

  get isRtl() {
    return this.directionService.isRtl();
  }

  toggleFlow() {
    const oppositeDirection = this.isRtl
      ? NbLayoutDirection.LTR
      : NbLayoutDirection.RTL;
    this.directionService.setDirection(oppositeDirection);
  }
}
