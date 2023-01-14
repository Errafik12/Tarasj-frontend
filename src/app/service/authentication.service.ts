import { AfterViewInit, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var $: any;

export class JwtResponse {
  constructor(
    public jwttoken: string,
    public token: string,
  ) { }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit, AfterViewInit {

  constructor(private httpClient: HttpClient, private router: Router) { }
  isUserValid = false
  private JwtObj = {
    jwttoken: '',
    token: '',
    role: '',
  };

  ngOnInit() {
  }

  async authenticate(username: any, password: any) {
    this.getAuthenticate(username, password);
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.jwtTokenValidator(username);
  }

  jwtTokenValidator(username: any): boolean {
    if (this.JwtObj.jwttoken) {
      sessionStorage.setItem('username', username)
      sessionStorage.setItem('jwttoken', this.JwtObj.jwttoken)
      sessionStorage.setItem('role', this.JwtObj.role)
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  isParticipants() {
    let role = sessionStorage.getItem('role')
    return (role === 'PARTICIPANTS')
  }

  isUser() {
    let role = sessionStorage.getItem('role')
    return (role === 'USER')
  }

  logOut() {
    this.JwtObj.jwttoken = '';
    this.JwtObj.token = '';
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('jwttoken')
  }

  getAuthenticate(username: any, password: any) {
    this.JwtObj.jwttoken = '';
    this.JwtObj.token = '';
    this.httpClient.post<JwtResponse>("http://localhost:8080/authenticate", { username: username, password: password })
      .subscribe((res: any) => {
        this.JwtObj.jwttoken = res.jwttoken;
        this.JwtObj.token = res.token;
        this.JwtObj.role = res.role;
      });
  }

  ngAfterViewInit() {
  }

}

function wait(arg0: number) {
  throw new Error('Function not implemented.');
}
