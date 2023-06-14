import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddCattleFormComponent } from './add-cattle-form/add-cattle-form.component';
import { AddCattleFeedFormComponent } from './add-cattle-feed-form/add-cattle-feed-form.component';
import { AddCattleMedFormComponent } from './add-cattle-med-form/add-cattle-med-form.component';
import { UpdateCattleFormComponent } from './update-cattle-form/update-cattle-form.component';
import { CattleDetailsComponent } from './cattle-details/cattle-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CattleDtoFluentValidator } from './DtoFluentValidators/cattledtoFluentValidator';
import { CattleFeedDtoFluentValidator } from './DtoFluentValidators/cattlefeeddtoFluentValidator';
import { CattleMedDtoFluentValidator } from './DtoFluentValidators/cattlemeddtoFluentValidator';
import { CattleFluentValidator } from './FluentValidators/cattleFluentValidator';
import { CattleFeedFluentValidator } from './FluentValidators/cattlefeedFluentValidator';
import { CattleMedFluentValidator } from './FluentValidators/cattlemedFluentValidator';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddCattleFormComponent,
    AddCattleFeedFormComponent,
    AddCattleMedFormComponent,
    CattleDetailsComponent,
    UpdateCattleFormComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    CattleDtoFluentValidator,
    CattleFeedDtoFluentValidator,
    CattleMedDtoFluentValidator,
    CattleFluentValidator,
    CattleFeedFluentValidator,
    CattleMedFluentValidator
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
