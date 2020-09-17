import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Url_Back } from 'app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SoniatService {
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  private id: number;
  private idPrivate: number;

  constructor(private http: HttpClient) { }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setIdPrivate(id: number): void {
    this.idPrivate = id;
  }

  public getIdPrivate(): number {
    return this.idPrivate;
  }

  public getPublic(): Observable<any> {
    return this.http.get(`${Url_Back}clients/registros`);
  }

  public getPrivate(): Observable<any> {
    return this.http.get(`${Url_Back}clients/registros/private`);
  }

  public getPublicId(id): Observable<any> {
    return this.http.get(`${Url_Back}clients/${id}`, { headers: this.httpHeaders })
  }

  public questionPublic(id, question): Observable<any> {
    return this.http.get(`${Url_Back}bot/botQuestionPublic?id=${id}&question=${question}`)
  }

  public questionPrivate(id, question): Observable<any> {
    return this.http.get(`${Url_Back}bot/botQuestionPrivate?id=${id}&question=${question}`)
  }

}
