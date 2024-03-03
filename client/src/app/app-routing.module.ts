import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProfileLayoutComponent } from "./modules/profile/profile-layout/profile-layout.component";
import { AutherizationGuard } from "./@core/guards/autherization.guard";

export const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./modules/home/home.module").then((m) => m.HomeModule),
  },

  {
    path: "dashboard",
    canActivate: [AutherizationGuard],
    loadChildren: () =>
      import("./profile/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/authentication/authentication.module").then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: "profile",
    component: ProfileLayoutComponent,
    canActivate: [AutherizationGuard],
    children: [
      {
        path: "",
        redirectTo: "personal-info",
        pathMatch: "full",
      },

      {
        path: "personal-info",
        loadChildren: () =>
          import("./modules/personal-info/personal-info.module").then(
            (m) => m.PersonalInfoModule
          ),
      },
      // {
      //   path: 'messaging',
      //   loadChildren: () => import('./modules/messaging/messaging.module').then(m => m.MessagingModule),
      // },
      {
        path: 'save',
        loadChildren: () => import('./modules/saved-items/saved-items.module').then(m => m.SavedItemsModule),
      },
      // {
      //   path: 'document-type',
      //   loadChildren: () => import('./modules/document-type/document-type.module').then(m => m.DocumentTypeModule),
      // },
      // {
      //   path: 'culture',
      //   loadChildren: () => import('./modules/culture/culture.module').then(m => m.CultureModule)
      // },
      // {
      //   path: 'product-category',
      //   loadChildren: () => import('./modules/product-category/product-category.module').then(m => m.ProductCategoryModule)
      // },
      // {
      //   path: 'product',
      //   loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule)
      // },
      // {
      //   path: 'supplier-product',
      //   loadChildren: () => import('./modules/supplier-product/supplier-product.module').then(m => m.SupplierProductModule)
      // },
      // {
      //   path: 'product-template',
      //   loadChildren: () => import('./modules/product-template/product-template.module').then(m => m.ProductTemplateModule)
      // },
      // {
      //   path: 'individual-party',
      //   loadChildren: () => import('./modules/individual-party/individual-party.module').then(m => m.IndividualPartyModule)
      // },
      // {
      //   path: 'organization-party',
      //   loadChildren: () => import('./modules/organization-party/organization-party.module').then(m => m.OrganizationPartyModule)
      // },
      // {
      //   path: 'system-setting',
      //   loadChildren: () => import('./modules/system-setting/system-setting.module').then(m => m.SystemSettingModule)
      // },

      {
        path: "",
        loadChildren: () =>
          import("./modules/authentication/authentication.module").then(
            (m) => m.AuthenticationModule
          ),
      },
      // {
      //   path: 'intro',
      //   loadChildren: () => import('./modules/intro/intro.module').then(m => m.IntroModule)
      // },
    ],
  },

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
