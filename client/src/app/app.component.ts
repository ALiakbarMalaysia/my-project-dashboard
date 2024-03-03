/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";
import { NbLayoutDirection, NbLayoutDirectionService } from "@nebular/theme";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  get isRtl() {
    return this.directionService.isRtl();
  }
  oppositeDirection = this.isRtl;

  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private directionService: NbLayoutDirectionService
  ) {
    this.toggleFlow();
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
  toggleFlow() {
    const oppositeDirection = this.isRtl
      ? NbLayoutDirection.LTR
      : NbLayoutDirection.RTL;
    this.directionService.setDirection(oppositeDirection);
  }
}
