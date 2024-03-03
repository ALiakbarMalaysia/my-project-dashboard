import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersonalInfoComponent } from "./components/personal-info.component";
import { PersonalInfoEditComponent } from "./components/personal-info-edit/personal-info-edit.component";

const routes: Routes = [
  {
    path: "",
    component: PersonalInfoComponent,
  },
  {
    path: "edit",
    component: PersonalInfoEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalInfoRoutingModule {}
