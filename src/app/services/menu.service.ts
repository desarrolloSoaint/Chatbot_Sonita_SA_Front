import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ROUTES } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public menuItems;
  public ROUTES: any;
  RouteInfo: any;

  constructor() { }
  menuOptionService( ROUTES ): Observable<any> {
    this.ROUTES = ROUTES;
    this.menuItems = this.ROUTES;
   return this.menuItems;
  }

}




















