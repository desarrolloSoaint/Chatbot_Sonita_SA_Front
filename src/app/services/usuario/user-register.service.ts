import { Injectable } from '@angular/core';
import { Gender } from 'app/models/gender';
import { Country } from 'app/models/country';
import { User } from 'app/models/user';
import { Rol } from 'app/models/rol';
import { DataUser } from 'app/models/dataUser';
import { Url_Back } from 'app/config/config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Image } from 'app/models/image';
import { PrivateContact } from 'app/models/private-contact';
import { DataPrivate } from 'app/models/data-private';
import { Historial } from 'app/models/history';


@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  public userList: User[] = [];
  public hist: Historial[] = [];
  public arrayDelService: Array<any>;


  constructor(private http: HttpClient) { }

  getGender(): Observable<Gender[]> {
    return this.http.get<Gender[]>(`${Url_Back}gender/find-all`)
  }

  getContry(): Observable<Country[]>{
    return this.http.get<Country[]>(`${Url_Back}country/find-all`)
  }

  getRole(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${Url_Back}rol/find-all`)
  }

  crearData(dataUser:DataUser):Observable<DataUser>{
    return this.http.post<DataUser>(`${Url_Back}users/create-data-user`,dataUser,{headers: this.httpHeaders})
  } 

  create(user:User):Observable<User>{
    return this.http.post<User>(`${Url_Back}auth/create`,user,{headers: this.httpHeaders})
  } 

  getUser(): Observable<User[]>{
    return this.http.get(`${Url_Back}user/find-all`).pipe(map(response => response as User[]));
  }

  getDataUser(): Observable<DataUser[]>{
    return this.http.get<DataUser[]>(`${Url_Back}users/find-data-users`)
  }

  update(user,id):Observable<any>{
    return this.http.put(`${Url_Back}user/update/${id}`,user, {headers:this.httpHeaders})
  }

  updateDataUser(_user,id):Observable<any>{
    return this.http.put(`${Url_Back}users/update-data-user/${id}`,_user, {headers:this.httpHeaders})
  }

  // getOne(id):Observable<any>{
  //   return this.http.get(`${Url_Back}user/${id}`)
  // }

  // getOneDataUser(id): Observable<DataUser>{
  //   return this.http.get<DataUser>(`${Url_Back}users/find-data-users/${id}`)
  //}

  delete(id): Observable<any>{
    return this.http.delete(`${Url_Back}user/delete/${id}`,{headers:this.httpHeaders})
  }

  // deleteDataUser(id): Observable<any>{
  //   return this.http.delete(`${Url_Back}users/delete-data-user/${id}`,{headers:this.httpHeaders})
  // }
  historial(): Observable<Historial[]>{
    return this.http.get<Historial[]>(Url_Back+ 'bot/historial');
  }
  gettime(): Observable<any>{
    return this.http.get<any>(Url_Back+ 'bot/time-response/{id}',{headers:this.httpHeaders})
  }
  avatar(myFormData,idU):Observable<any>{
    const headers = new HttpHeaders();
    
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put(Url_Back+'users/update-img-user/'+ idU, myFormData, {headers});
  }

  avatarChat(idU):Observable<any>{
    return this.http.get<any>(Url_Back+'users/find-data-users/'+ idU)
  }
//////////////////////// Cliente Privado /////////////////////////////////

  save(privateClient): Observable<any> {
    return this.http.post( `${Url_Back}clients/create/private` , privateClient, { headers : this.httpHeaders} )
  }

  edit(clientesPrivado, id): Observable<any> {
    return this.http.put(`${Url_Back}clients/update/private/`  + id, clientesPrivado, { headers : this.httpHeaders} )
  }

  getIdPrivate(): Observable<PrivateContact []> {
    return this.http.get<PrivateContact []>(`${Url_Back}clients/list-client-private` , { headers : this.httpHeaders} )
  }

  wait(): Observable<PrivateContact[]> {
    return this.http.get<PrivateContact[]>(`${Url_Back}clients/list-client-private`);
  }

updateDataPrivate(dataPrivate, id): Observable <any> {
  return this.http.put(`${Url_Back}clients-data/update-data-clients-private/` + id, dataPrivate, { headers: this.httpHeaders })
}
  deletePrivate(id): Observable<any> {
    return this.http.delete(`${Url_Back}clients/delete/private/${id}`, {headers: this.httpHeaders})
  }

  crearDataPrivate(dataPrivate: DataPrivate): Observable<DataPrivate> {
    // tslint:disable-next-line: max-line-length
    return this.http.post<DataPrivate>(`${Url_Back}clients-data/create-data-clients-private`, dataPrivate, {headers: this.httpHeaders})
  }

  getDataPrivate(): Observable<DataPrivate[]> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<DataPrivate[]>(`${Url_Back}clients-data/find-data-client-private`, {headers: this.httpHeaders})
  }
}
