import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EventappComponent } from './eventapp/eventapp.component';
import { AddeventappComponent } from './addeventapp/addeventapp.component';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './service/service.component';
import { AddserviceComponent } from './addservice/addservice.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    EventappComponent,
    AddeventappComponent,
    SignupComponent,
    ServiceComponent,
    AddserviceComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
