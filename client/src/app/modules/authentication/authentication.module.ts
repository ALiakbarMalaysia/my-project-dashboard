import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthenticationRoutingModule } from "./authentication-routing.module";
import { AuthenticationComponent } from "./components/athentication/athentication.component";
import { RegisterComponent } from "./components/register/register.component";
import { RequestPasswordComponent } from "./components/request-password/request-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ThemeModule } from "../../@theme/theme.module";
import { LoginComponent } from "./components/login/login.component";
import { ConfirmPasswordComponent } from "./components/confirm-password/confirm-password.component";
import { AccountService } from "../../shared/services/account.service";

@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterComponent,
    RequestPasswordComponent,
    ResetPasswordComponent,
    LoginComponent,
    ConfirmPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
  ],
  providers: [AccountService],
})
export class AuthenticationModule {}
