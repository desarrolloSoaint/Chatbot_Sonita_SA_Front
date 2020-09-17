import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'app/models/user.model';
import { Session } from 'protractor';
import {USERS } from '../models/avatar'
import {Rol} from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class UserService {
public rol;
  public identity;
  public icon;
  public imagen;
  httpClient: any;
  public USERS: any;
  info: {  email: any; authorities: any; };
  tokenService: any;

  constructor() {}



dataUserSesion(USERS): Observable<any> {

    let identity = JSON.parse(localStorage.getItem('USERS'));
    if (this.USERS = USERS ) {
      this.identity = this.USERS;
    }
    return this.identity;
  }
  



  

datauserrol(): Observable<any> {
  if (this.rol =  'administrador' ) {
    this.rol = this.rol;
  } else {
    this.rol = null;
  }
  return this.rol;
}



}