import { Injectable } from '@angular/core';
import { Clientes } from 'app/models/clientes';

import { Url_Back } from 'app/config/config';

import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Historial } from 'app/models/history';
import { Historialecu } from 'app/models/historyencu';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private http: HttpClient) { }

  getHour():Observable<any>{
    return this.http.get<any>(Url_Back+ 'bot/time-one-day',{headers:this.httpHeaders})

  }
  getmonth():Observable<any>{
    return this.http.get<any>(Url_Back+ 'bot/time-one-month',{headers:this.httpHeaders})
  }

  getcant(): Observable<any>{
   return this.http.get<any>(Url_Back+ 'bot/count-response-link',{headers:this.httpHeaders})
  
}
  getcantExp(): Observable<any>{
    return this.http.get<any>(Url_Back+'bot/count-time-expired',{headers:this.httpHeaders})
}
getfrepu(): Observable<any>{
  return this.http.get<any>(Url_Back+ 'bot/frec-client-public',{headers:this.httpHeaders})
}

getfrepri(): Observable<any>{
  return this.http.get(Url_Back+ 'bot/frec-client-private',{headers:this.httpHeaders})
}
gettimer(id): Observable<Historial>{
  return this.http.get<Historial>(Url_Back+ 'bot/time-response/'+ id)
}

historialecu(): Observable<Historialecu[]>{
  return this.http.get<Historialecu[]>(Url_Back+'quiz/find-all');
}
}
