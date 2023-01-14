import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public ServiceDetails: Array<any> = [];

  constructor(private httpClient: HttpClient, private loginservice: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.getAllServiceData()
  }

  getAllServiceData() {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('jwttoken'))
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };

    this.httpClient.get<any>("http://localhost:8080/service/getAllService", httpOptions)
      .subscribe((res: any) => {
        if (res.statusCode == 401) {
          this.loginservice.logOut()
          this.router.navigate(['login']);
        } else if (res.statusCode == 200) {
          if (res && res.data && res.data.length > 0) {
            this.ServiceDetails = res.data
          } else {

          }
        } else {

        }
      });
  }

}
