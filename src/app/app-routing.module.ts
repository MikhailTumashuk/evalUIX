import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AuthComponent} from "./auth/auth.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AccountMainPageComponent} from "./account-main-page/account-main-page.component";
import {NotificationsComponent} from "./notifications/notifications.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {EvaluationFormComponent} from "./evaluation-form/evaluation-form.component";

const routes: Routes = [
  {path: '', redirectTo: 'main-page', pathMatch: 'full'},
  {path: '', redirectTo: 'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'account-main-page', component: AccountMainPageComponent},
  {path: 'notifications', component: NotificationsComponent},
  {path: 'edit-profile', component: EditProfileComponent},
  {path: 'evaluation-form', component: EvaluationFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
