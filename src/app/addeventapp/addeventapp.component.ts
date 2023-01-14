import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-addeventapp',
  templateUrl: './addeventapp.component.html',
  styleUrls: ['./addeventapp.component.css']
})
export class AddeventappComponent implements OnInit {

  isEvent = false;
  isEventMessage = '';
  isEventCreation = false;
  enableCreateButton = false;
  isEventUpdate = false;
  public OrgObj = {
    date: '',
    capacity: '',
    outdoors: '',
    age_limit: '',
    property: ''
  }

  public AddressObj = {
    number: '',
    street: '',
    postal_code: '',
    city: '',
    country: ''
  }

  public Event = {
    eventId: '',
    name: '',
    status: '',
    orgObj: this.OrgObj,
    addressObj: this.AddressObj
  }

  constructor(private httpClient: HttpClient, private loginservice: AuthenticationService, private router: Router) { }

  updateEvent() {
    if (this.enableCreateButton) {
      this.createEvent();
    } else {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + sessionStorage.getItem('jwttoken'))
        .set('Content-Type', 'application/json');
      const httpOptions = {
        headers: headers,
      };
      this.httpClient.post<any>("http://localhost:8080/event/updateEvent", this.Event, httpOptions)
        .subscribe((res: any) => {
          if (res.statusCode == 401) {
            this.loginservice.logOut()
            this.router.navigate(['login']);
          } else if (res.statusCode == 201) {
            if (res && res.data) {
              this.isEventUpdate = true;
              this.isEventMessage = 'Successfully Updated';
            } else {
              this.isEventUpdate = true;
              this.isEventMessage = 'No Data found';
            }
          } else {
            this.isEventUpdate = true;
            this.isEventMessage = res.message;
          }
        });
    }
  }


  createEvent() {
    if (this.Event.eventId && this.Event.name && this.Event.status && this.Event.orgObj.date && this.Event.orgObj.capacity
      && this.Event.orgObj.property && this.Event.addressObj.number && this.Event.addressObj.street && this.Event.addressObj.postal_code
      && this.Event.addressObj.city && this.Event.addressObj.country) {
      const headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + sessionStorage.getItem('jwttoken'))
        .set('Content-Type', 'application/json');
      const httpOptions = {
        headers: headers,
      };
      this.httpClient.post<any>("http://localhost:8080/event/create", this.Event, httpOptions)
        .subscribe((res: any) => {
          console.log(res)
          if (res.statusCode == 401) {
            this.loginservice.logOut()
            this.router.navigate(['login']);
          } else if (res.statusCode == 201) {
            if (res && res.data) {
              this.isEvent = false;
              this.isEventUpdate = false;
              this.enableCreateButton = false;

              this.isEventCreation = true;
              this.isEventMessage = 'Successfully Created';
            } else {
              this.isEvent = false;
              this.isEventUpdate = false;
              this.enableCreateButton = false;
              this.isEventCreation = true;
              this.isEventMessage = 'No Data found';
            }
          } else {
            this.isEvent = false;
            this.isEventUpdate = false;
            this.enableCreateButton = false;
            this.isEventCreation = true;
            this.isEventMessage = res.message;
          }
        });
    } else {
      this.cleanObj();
      this.isEventCreation = true;
      this.isEventMessage = 'Mandatory Data cannot be null';
    }
  }

  ngOnInit() {
  }

  searchBy(e: any) {
    this.cleanObj();
    if (this.Event.eventId != '') {
      this.getAllEventData(this.Event.eventId);
    } else {
      this.cleanObj();
    }
  }

  getAllEventData(id: any) {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + sessionStorage.getItem('jwttoken'))
      .set('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers,
    };

    this.cleanObj();

    this.httpClient.get<any>("http://localhost:8080/event/getEventById/" + id, httpOptions)
      .subscribe((res: any) => {
        if (res.statusCode == 401) {
          this.loginservice.logOut()
          this.router.navigate(['login']);
        } else if (res.statusCode == 200) {
          this.isEvent = false;
          this.isEventMessage = ''
          if (res && res.data) {
            this.Event = res.data;
          } else {
            this.isEvent = true;
            this.enableCreateButton = true;
            this.isEventMessage = 'No Data found/. ** You can create event base this - ' + id + ' - id **'
          }
        } else {
          this.isEvent = true;
          this.isEventMessage = res.message;
        }
      });
  }

  cleanObj() {
    this.Event.name = '';
    this.Event.status = '';
    this.Event.orgObj.age_limit = '';
    this.Event.orgObj.date = '';
    this.Event.orgObj.capacity = '';
    this.Event.orgObj.outdoors = '';
    this.Event.orgObj.property = '';
    this.Event.addressObj.number = '';
    this.Event.addressObj.street = '';
    this.Event.addressObj.postal_code = '';
    this.Event.addressObj.city = '';
    this.Event.addressObj.country = '';
    this.isEvent = false;
    this.isEventMessage = '';
    this.isEventCreation = false;
    this.isEventUpdate = false;
    this.enableCreateButton = false;
  }

}
