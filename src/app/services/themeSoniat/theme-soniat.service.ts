import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Url_Back } from 'app/config/config';
import { Colors } from 'app/models/colors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ThemeSoniatService {
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getTheme(): Observable<Colors[]>{
    return this.http.get<Colors[]>(`${Url_Back}color/find-all`)
  }
 
  updateTheme(color:Colors):Observable<Colors>{
    return this.http.put<Colors>(`${Url_Back}color/update-color/${1}`,color,{headers: this.httpHeaders})
  }
}  
