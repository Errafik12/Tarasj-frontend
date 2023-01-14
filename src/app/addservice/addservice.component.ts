import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {

  constructor(private httpClient: HttpClient, private loginservice: AuthenticationService, private router: Router) { }

  isService = false;
  isServiceCreation = false;
  isServiceMessage = ''
  enableServiceCreateButton = false;
  isServiceUpdate = false;

  public Service = {
    eventId: '',
    title: '',
    description: '',
    percentage: ''
  }

  ngOnInit() {
  }

  searchBy(e: any) {
    if (this.Service.eventId != '') {
      this.getServiceById(this.Service.eventId);
    } else {
      this.cleanObjData();
    }
  }

  updateService() {
    if (this.enableServiceCreateButton) {
      this.createService();
    } else {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + sessionStorage.getItem('jwttoken'))
        .set('Content-Type', 'application/json');
      const httpOptions = {
        headers: headers,
      };
      this.httpClient.post<any>("http://localhost:8080/service/updateService/" + this.Service.title + "/" + this.Service.percentage, null, httpOptions)
        .subscribe((res: any) => {
          if (res.statusCode == 401) {
            this.loginservice.logOut()
            this.router.navigate(['login']);
          } else if (res.statusCode == 200) {
            if (res && res.data && res.data.length > 0) {
              this.isService = false;
              this.isServiceMessage = ''
              this.Service = res.data[0];
            } else {
              this.isService = true;
              this.isServiceMessage = 'No Data found'
            }
          } else {
            this.isService = true;
            this.isServiceMessage = res.message;
          }
        });
    }
  }

  createService() {
    if (this.Service.eventId && this.Service.title && this.Service.description && this.Service.percentage) {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + sessionStorage.getItem('jwttoken'))
        .set('Content-Type', 'application/json');
      const httpOptions = {
        headers: headers,
      };
      this.httpClient.post<any>("http://localhost:8080/service/create", this.Service, httpOptions)
        .subscribe((res: any) => {
          console.log(res)
          if (res.statusCode == 401) {
            this.loginservice.logOut()
            this.router.navigate(['login']);
          } else if (res.statusCode == 201) {
            if (res && res.data) {
              this.isService = false;
              this.isServiceUpdate = false;
              this.enableServiceCreateButton = false;

              this.isServiceCreation = true;
              this.isServiceMessage = 'Successfully Created';
            } else {
              this.isService = false;
              this.isServiceUpdate = false;
              this.enableServiceCreateButton = false;
              this.isServiceCreation = true;
              this.isServiceMessage = 'No Data found';
            }
          } else {
            this.isService = false;
            this.isServiceUpdate = false;
            this.enableServiceCreateButton = false;
            this.isServiceCreation = true;
            this.isServiceMessage = res.message;
          }
        });
    } else {
      this.cleanObjData();
      this.isServiceCreation = true;
      this.isServiceMessage = 'Mandatory Data cannot be null';
    }
  }

  getServiceById(id: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('jwttoken'))
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };
    this.cleanObjData();
    this.httpClient.get<any>("http://localhost:8080/service/getServiceByName/" + id, httpOptions)
      .subscribe((res: any) => {
        if (res.statusCode == 401) {
          this.loginservice.logOut()
          this.router.navigate(['login']);
        } else if (res.statusCode == 200) {
          if (res && res.data && res.data.length > 0) {
            this.isService = false;
            this.isServiceMessage = ''
            this.Service = res.data[0];
          } else {
            this.isService = true;
            this.enableServiceCreateButton = true;
            this.isServiceMessage = 'No Data found'
          }
        } else {
          this.isService = true;
          this.isServiceMessage = res.message;
        }
      });
  }

  cleanObjData() {
    this.Service.description = '';
    this.Service.percentage = '';
    this.Service.title = '';
    this.isService = false;
    this.isServiceCreation = false;
    this.isServiceMessage = ''
    this.enableServiceCreateButton = false;
    this.isServiceUpdate = false;
  }

}
