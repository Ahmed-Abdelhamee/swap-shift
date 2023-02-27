import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { HomeComponent } from './components/home/home.component';
import { LetsGoComponent } from './components/lets-go/lets-go.component';
import { LoginComponent } from './components/login/login.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowSwapComponent } from './components/show-swap/show-swap.component';
import { ViewHolidaysComponent } from './components/view-holidays/view-holidays.component';
import { ViewShiftsComponent } from './components/view-shifts/view-shifts.component';
import { AdminFeedbackComponent } from './_Admin/admin-feedback/admin-feedback.component';
import { AdminComponent } from './_Admin/admin/admin.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"show-swap",component:ShowSwapComponent},
  {path:"profile",component:ProfileComponent},
  {path:"problems",component:ProblemsComponent},
  {path:"feedback",component:FeedbackComponent},
  {path:"forget-pass",component:ForgetPassComponent},
  {path:"let's-go",component:LetsGoComponent},
  {path:"view-shifts",component:ViewShiftsComponent},
  {path:"view-holidays",component:ViewHolidaysComponent},

  {path:"ad-swapshift-users-min",component:AdminComponent},
  {path:"ad-swapshift-feedback-min",component:AdminFeedbackComponent},
  {path:"**",component:ErrorComponent},
  // {path:"",component:},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
