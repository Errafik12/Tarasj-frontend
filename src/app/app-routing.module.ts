import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventappComponent } from './eventapp/eventapp.component';
import { AddeventappComponent } from './addeventapp/addeventapp.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { SignupComponent } from './signup/signup.component';
import { ServiceComponent } from './service/service.component';
import { AddserviceComponent } from './addservice/addservice.component';

const routes: Routes = [
  { path: 'event', component: EventappComponent, canActivate: [AuthGaurdService] },
  { path: 'addevent', component: AddeventappComponent, canActivate: [AuthGaurdService] },
  { path: 'service', component: ServiceComponent, canActivate: [AuthGaurdService] },
  { path: 'addservice', component: AddserviceComponent, canActivate: [AuthGaurdService] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService] },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }