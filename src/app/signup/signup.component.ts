import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

  isSignUp = false
  isSignUpMessage = ''
  firstName = ''
  username = ''
  dateofbirth = ''
  password = ''
  role = ''

  public _values2 = ["user", "organiser", " participants"];

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  async signUp() {
    if (this.firstName && this.dateofbirth && this.username && this.password && this.role && (this.role == 'user' || this.role == 'organiser' || this.role == 'participants')) {
      this.httpClient.post<any>("http://localhost:8080/user/create",
        { firstName: this.firstName, name: this.username, dateOfBirth: this.dateofbirth, password: this.password, role: this.role })
        .subscribe((res: any) => {
          if (res.statusCode == 201) {
            this.router.navigate(['login']);
          } else {
            this.isSignUp = true;
            this.isSignUpMessage = res.data.outMsgDesc
          }
        });
    }

  }

}
