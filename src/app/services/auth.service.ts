import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUsuario } from '../models/login-usuario';
import { Observable, throwError } from 'rxjs';
import { JwtModel } from '../models/jwt-model';
import { Gender } from '../models/gender';
import { Country } from '../models/country';
import { Currency } from '../models/currency';
import { Profession } from '../models/profession';
import { State } from '../models/state';
import { StateCivil } from '../models/state-civil';
import { Url_Back } from 'app/config/config';
import { catchError } from 'rxjs/operators';
import { Clientes } from 'app/models/clientes';
import { AvatarSoniat } from 'app/models/avatarSoniat';
import { AvatarChat } from 'app/models/avatarChat';
import { Rol } from 'app/models/rol';
import { Aiml } from 'app/models/aiml';
import { Aiml_if } from 'app/models/aiml_if';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public arrayDelService: boolean;
  private httpHeaders  = new HttpHeaders ({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  exportToExcel(json:any[], excelFileName: string): void{
    const worksheet: XLSX.WorkSheet= XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, filename: string): void{
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE});
    FileSaver.saveAs(data, filename + '_export_'+ new Date().getTime()+EXCEL_EXT);
  }
  public login(login: LoginUsuario): Observable<JwtModel> {
    return this.http.post<JwtModel>(Url_Back + 'auth/login', login);
  }

  public gender(): Observable<Gender[]> {
    return this.http.get<Gender[]>(Url_Back + 'gender/find-all');
  }

  public countAiml(): Observable<any> {
    return this.http.get(Url_Back + 'fileaiml/count-aiml');
  }

  public countAimlIf(): Observable<any> {
    return this.http.get(Url_Back + 'fileaimlif/count-aimlif');
  }

  public country(): Observable<Country[]> {
    return this.http.get<Country[]>(Url_Back + 'country/find-all');
  }

  public currency(): Observable<Currency[]> {
    return this.http.get<Currency[]>(Url_Back + 'currency/find-all');
  }

  public clientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>(Url_Back + 'clients/list-client-public');
  }
 
  fotos(): Observable<any> {
    return this.http.get(Url_Back + 'avatar/find-all');
  }

  public getAvatar(): Observable<AvatarSoniat[]> {
    return this.http.get<AvatarSoniat[]>(Url_Back + 'find-all');
  }

  public getAiml(): Observable<Aiml[]> {
    return this.http.get<Aiml[]>(Url_Back + 'fileaiml/find-all');
  }

  public getAimlIf(): Observable<Aiml_if[]> {
    return this.http.get<Aiml_if[]>(Url_Back + 'fileaimlif/find-all');
  }

  public stateCivil(): Observable<StateCivil[]> {
    return this.http.get<StateCivil[]>(Url_Back + 'statecivil/find-all');
  }

  public state(): Observable<State[]> {
    return this.http.get<State[]>(Url_Back + 'state/find-all');
  }

  public delete(id): Observable<any> {
    return this.http.delete(Url_Back + 'clients/delete/' + id, { headers: this.httpHeaders })
  }
  public deleteAvatar(id): Observable<any> {
    return this.http.delete(Url_Back + 'avatar/delete-avatar/' + id, { headers: this.httpHeaders })
  }

  public deleteAiml(id): Observable<any> {
    return this.http.delete(Url_Back + 'fileaiml/delete-aiml/' + id, { headers: this.httpHeaders })
  }

  public deleteAimlIf(id): Observable<any> {
    return this.http.delete(Url_Back + 'fileaimlif/delete-aimlif/' + id, { headers: this.httpHeaders })
  }

  public edit(clientes, id): Observable<any> {
    return this.http.put(Url_Back + 'clients/update/' + id, clientes, { headers: this.httpHeaders })
  }

  editAimlIf(myFormData, id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put(Url_Back + 'fileaimlif/update-aimlif/' + id, myFormData, { headers });
  }

  public profession(): Observable<Profession[]> {
    return this.http.get<Profession[]>(Url_Back + 'profession/find-all');
  }

  public getAvatarChat(): Observable<AvatarChat[]> {
    return this.http.get<AvatarChat[]>(Url_Back + 'avatar/find-all-chat');
  }

  public editAvatar(avatar): Observable<any> {
    return this.http.put(Url_Back + 'avatar/update-avatar-chat/1', avatar, { headers: this.httpHeaders })
  }

  editAiml(myFormData, id): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.put(Url_Back + 'fileaiml/update-aiml/' + id, myFormData, { headers });
  }

  guardar(clientes): Observable<any> {
    return this.http.post(Url_Back + 'clients/create', clientes, { headers: this.httpHeaders })
      .pipe(
        catchError((err) => {
          console.error(err.error.mensaje, 'ERORRR');
          return throwError(err.error.mensaje);
        })
      )
  }

  guardarPublico(clientes): Observable<any> {
    return this.http.post(Url_Back + 'clients/create-public', clientes, { headers: this.httpHeaders });
  }

  guardarPrivate(clientes): Observable<any> {
    return this.http.post(Url_Back + 'clients/acces-private', clientes, { headers: this.httpHeaders });
  }

  guardarEncuesta(encuesta): Observable<any> {
    return this.http.post(Url_Back +'quiz/send', encuesta, { headers: this.httpHeaders });
  }

  guardarAiml(myFormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(Url_Back + 'fileaiml/create-aiml', myFormData, { headers });
  }

  guardarAimlIf(myFormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(Url_Back + 'fileaimlif/create-aimlif', myFormData, { headers });
  }

  avatar(myFormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(Url_Back + 'avatar/create-avatar', myFormData, { headers });
  }

  public id(): Observable<any> {
    return this.http.get<any[]>(Url_Back + 'users/find-data-users/');
  }

  public rol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(Url_Back + 'rol/find-all');
  }
  setArray(array: any) {
    this.arrayDelService = array;
  }

  getArray() {
    return this.arrayDelService;
  }

}

