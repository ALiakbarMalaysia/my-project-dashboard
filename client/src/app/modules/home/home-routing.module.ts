import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { NotFoundComponent } from "../../profile/miscellaneous/not-found/not-found.component";
import { ProfileLayoutComponent } from "../profile/profile-layout/profile-layout.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "products",
        loadChildren: () =>
          import("../products/products.module").then((m) => m.ProductsModule),
      },
      {
        path: "profile",
        component:ProfileLayoutComponent
    
      },

      {
        path: "",
        redirectTo: "products",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
