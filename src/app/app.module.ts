import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './registration/registration.component';
import { AccountMainPageComponent } from './account-main-page/account-main-page.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WeightBarComponent } from './weight-bar/weight-bar.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserInfoBarComponent } from './user-info-bar/user-info-bar.component';
import { ModalModule } from 'ngx-bootstrap/modal';


import {register} from "swiper/element/bundle";
import { EvaluationFormComponent } from './evaluation-form/evaluation-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


// register Swiper custom elements
register();

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AuthComponent,
    RegistrationComponent,
    AccountMainPageComponent,
    SidebarComponent,
    WeightBarComponent,
    NotificationsComponent,
    EditProfileComponent,
    UserInfoBarComponent,
    EvaluationFormComponent
  ],
  imports: [
    ModalModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
