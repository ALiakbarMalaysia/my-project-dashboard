import { Component } from "@angular/core";
import { DASHBOARD_MENU_ITEMS } from "../../profile/pages-menu";

@Component({
  selector: "ali-home",
  styleUrls: ["./home.component.scss"],
  template: ` <ngx-one-column-layout>
    <nb-menu [items]="menu"></nb-menu>
    <router-outlet></router-outlet>
  </ngx-one-column-layout>`,
})
export class HomeComponent {
  menu = DASHBOARD_MENU_ITEMS;

  constructor() {}
}
