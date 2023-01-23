import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowSwapComponent } from './components/show-swap/show-swap.component';
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

  {path:"ad-medo-min",component:AdminComponent},
  // {path:"adm-ahmed-min",component:AdminComponent},
  // {path:"",component:},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
