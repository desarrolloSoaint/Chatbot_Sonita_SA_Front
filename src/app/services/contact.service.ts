import { Injectable } from '@angular/core';
import { Url_Back } from 'app/config/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from 'app/models/country';
import { Currency } from 'app/models/currency';
import { Gender } from 'app/models/gender';
import { Profession } from 'app/models/profession';
import { State } from 'app/models/state';
import { StateCivil } from 'app/models/state-civil';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private httpHeaders  = new HttpHeaders ({'Content-Type':'application/json'})

  

  constructor(
    private httpClient: HttpClient) { }
    ////////////////Eliminar////////////////////////////
  public delete(id): Observable<any>{
    return this.httpClient.delete(Url_Back + 'state/delete-state/' + id, { headers : this.httpHeaders} )
  }
  public deleteStaCivil(id): Observable<any>{
    return this.httpClient.delete(Url_Back + 'statecivil/delete-staCivil/' + id, { headers : this.httpHeaders} )
  }
  public deleteProfesion(id): Observable<any>{
    return this.httpClient.delete(Url_Back + 'profession/delete-profession/' + id, { headers : this.httpHeaders} )
  }
  public deletePais(id): Observable<any>{
    return this.httpClient.delete(Url_Back + 'country/delete-country/' + id, { headers : this.httpHeaders} )
  }
  public deleteGenero(id): Observable<any>{
    return this.httpClient.delete(Url_Back + 'gender/delete-gender/' + id, { headers : this.httpHeaders} )
  }
  public deleteMoneda(id): Observable<any>{
    return this.httpClient.delete(Url_Back + 'currency/delete-currency/' + id, { headers : this.httpHeaders} )
  }
  ////////////////////Crear//////////////////////////////////////////
  guardar(list): Observable<any> {
    return this.httpClient.post(Url_Back + '/api/v1/clients/create/private' , list, { headers : this.httpHeaders} )
  }
  guardarProfesion(profession): Observable<any> {
    return this.httpClient.post(Url_Back + 'profession/create-profession' , profession , { headers : this.httpHeaders} )
  }
  guardarStateCivil(estadoCivil): Observable<any> {
    return this.httpClient.post(Url_Back + 'statecivil/create-staCivil' , estadoCivil , { headers : this.httpHeaders} )
  }
  guardarGenero(gender) : Observable<any> {
    return this.httpClient.post(Url_Back+'gender/create-gender' , gender, { headers : this.httpHeaders} );
  
  }
  guardarMoneda(currency) : Observable<any> {
    return this.httpClient.post(Url_Back+'currency/create-currency' , currency, { headers : this.httpHeaders} );
  
  }
  guardarPais(country) : Observable<any> {
    return this.httpClient.post(Url_Back+'country/create-country' , country, { headers : this.httpHeaders} );
  
  }
  guardarEstado(state) : Observable<any> {
    return this.httpClient.post(Url_Back+'state/create-state' , state, { headers : this.httpHeaders} );
  ////////////////////Editar///////////////////////////////
  }
  public editGenero(gender,id): Observable<any>{
    return this.httpClient.put(Url_Back + 'gender/update-gender/' + id, gender, { headers : this.httpHeaders} )
  }
  public editMoneda(currency,id): Observable<any>{
    return this.httpClient.put(Url_Back + 'currency/update-currency/' + id, currency, { headers : this.httpHeaders} )

  }
  
  public editEstado(state,id): Observable<any>{
    return this.httpClient.put(Url_Back + 'state/update-state/' + id, state, { headers : this.httpHeaders} )
  }
  
  public editProfesion(profession,id): Observable<any>{
    return this.httpClient.put(Url_Back + 'profession/update-profession/' + id, profession, { headers : this.httpHeaders} )
  }

  public editPais(country,id): Observable<any>{
    return this.httpClient.put(Url_Back + 'country/update-country/' + id, country, { headers : this.httpHeaders} )
  }
  public editEstadoCivil(staCivil,id): Observable<any>{
    return this.httpClient.put(Url_Back + 'statecivil/update-staCivil/' + id,staCivil, { headers : this.httpHeaders} )
  }
 
  getContry(): Observable<Country[]>{
    return this.httpClient.get<Country[]>(`${Url_Back}country/find-all`)
  }
     //////////////////Contar//////////////////////////////////////
  
   public countPais(): Observable<any> {
    return this.httpClient.get(Url_Back + 'country/count-country');
  }

   public countMoneda(): Observable<any> {
    return this.httpClient.get(Url_Back + 'currency/count-currency');
  }

  public countGenero(): Observable<any> {
    return this.httpClient.get(Url_Back + 'gender/count-gender');
  }
  public countProfesion(): Observable<any> {
    return this.httpClient.get(Url_Back + 'profession/count-profession');
  }

  public countStateCivil(): Observable<any> {
    return this.httpClient.get(Url_Back + 'statecivil/count-staCivil');
  }

  public countState(): Observable<any> {
    return this.httpClient.get(Url_Back + 'state/count-state');
  }

  public countPublic(): Observable<any> {
    return this.httpClient.get(Url_Back + 'clients/count-client-public');
  }

  public countPrivate(): Observable<any> {
    return this.httpClient.get(Url_Back + 'clients/count-client-private');
  }
  ///////////////////////Servicio de Rol/////////////////////////////
  
  crearRol(rol): Observable<any> {
    return this.httpClient.post(Url_Back + 'rol/create' , rol , { headers : this.httpHeaders} )
  }

  public editRol(rol,id): Observable<any>{
    return this.httpClient.put(Url_Back + 'rol/update/' + id, rol, { headers : this.httpHeaders} )

  }
  public deleteRol(id): Observable<any>{
    return this.httpClient.delete(Url_Back + 'rol/delete/' + id, { headers : this.httpHeaders} )
  }
  public countRol(): Observable<any> {
    return this.httpClient.get(Url_Back + 'rol/count-rol');
  }

}
