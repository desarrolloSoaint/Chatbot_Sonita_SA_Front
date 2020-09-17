import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Url_Back } from 'app/config/config';
import { Observable } from 'rxjs';
import { Prueba } from 'app/components/home/i';
import { Clientes } from 'app/models/clientes';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }


  countUsers(): Observable<any>{
    return this.http.get(`${Url_Back}user/count-users`)
  }
  countClientPublic(): Observable<any>{
    return this.http.get(`${Url_Back}clients/count-client-public`)
  }
  countClientPrivate(): Observable<any>{
    return this.http.get(`${Url_Back}clients/count-client-private`)
  }
  countQuestion(): Observable<any>{
    return this.http.get(`${Url_Back}bot/count-question`)
  }
  clientPrivateLast(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-private-lastmonth`)
  }
  clientPrivateToday(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-private-today`)
  }
  clientPublicLast(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-public-lastmonth`)
  }
  clientPublicToday(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-public-today`)
  }
  countResponseLink(): Observable<any>{
    return this.http.get(`${Url_Back}bot/count-response-link`,{headers:this.httpHeaders})
  }
  countTimeExpired(): Observable<any>{
    return this.http.get(`${Url_Back}bot/count-time-expired`,{headers:this.httpHeaders})
  }
  clientPrivateFrequencyLast(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-private-lastmonth`)
  }
  clientPublicFrequencyLast(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-public-lastmonth`)
  }
  clientPrivateFrequencyToday(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-private-today`)
  }
  clientPublicFrequencyToday(): Observable<any>{
    return this.http.get(`${Url_Back}bot/frec-client-public-today`)
  }
  countUsersWeek(): Observable<any>{
    return this.http.get(`${Url_Back}user/count-week-users`)
  }
  countUsersDay(): Observable<any>{
    return this.http.get(`${Url_Back}user/count-day-users`)
  }
  countClientPublicWeek(): Observable<any>{
    return this.http.get(`${Url_Back}clients/count-week-client-public`)
  }
  countClientPublicDay(): Observable<any>{
    return this.http.get(`${Url_Back}clients/count-day-client-public`)
  }
  countClientPrivateWeek(): Observable<any>{
    return this.http.get(`${Url_Back}clients/count-week-client-private`)
  }
  countClientPrivateDay(): Observable<any>{
    return this.http.get(`${Url_Back}clients/count-day-client-private`)
  }
  countQuestionWeek(): Observable<any>{
    return this.http.get(`${Url_Back}bot/count-last-week`)
  }
  countQuestionDay(): Observable<any>{
    return this.http.get(`${Url_Back}bot/count-today`)
  }
}
