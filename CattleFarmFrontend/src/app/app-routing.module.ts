import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddCattleFormComponent } from './add-cattle-form/add-cattle-form.component';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';
import { AddCattleFeedFormComponent } from './add-cattle-feed-form/add-cattle-feed-form.component';
import { AddCattleMedFormComponent } from './add-cattle-med-form/add-cattle-med-form.component';
import { UpdateCattleFormComponent } from './update-cattle-form/update-cattle-form.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: "", component: HomeComponent
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "cattleForm", component: AddCattleFormComponent
  },
  {
    path: "cattle/:cattleCode", component: CattleDetailsComponent
  },
  {
    path: "cattle/:cattleCode/feed", component: AddCattleFeedFormComponent
  },
  {
    path: "cattle/:cattleCode/update", component: UpdateCattleFormComponent
  },
  {
    path: "cattle/:cattleCode/med", component: AddCattleMedFormComponent
  },
  {
    path: "error", component: ErrorPageComponent
  },
  {
    path: "**", redirectTo: "home"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
