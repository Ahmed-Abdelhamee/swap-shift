import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ZfooterComponent } from './components/zfooter/zfooter.component';
import { HomeComponent } from './components/home/home.component';
// Import the functions you need from the SDKs you need

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideRemoteConfig,getRemoteConfig } from '@angular/fire/remote-config';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import { ProfileComponent } from './components/profile/profile.component';
import { ShowSwapComponent } from './components/show-swap/show-swap.component';
import { ProblemsComponent } from './components/problems/problems.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ForgetPassComponent } from './components/forget-pass/forget-pass.component';
import { AdminComponent } from './_Admin/admin/admin.component';
import { LetsGoComponent } from './components/lets-go/lets-go.component';
import { ViewShiftsComponent } from './components/view-shifts/view-shifts.component';
import { ViewHolidaysComponent } from './components/view-holidays/view-holidays.component';
import { AdminFeedbackComponent } from './_Admin/admin-feedback/admin-feedback.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ZfooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    ShowSwapComponent,
    ProblemsComponent,
    FeedbackComponent,
    ForgetPassComponent,
    AdminComponent,
    LetsGoComponent,
    ViewShiftsComponent,
    ViewHolidaysComponent,
    AdminFeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideRemoteConfig(() => getRemoteConfig()),
    provideStorage(() => getStorage()),

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
