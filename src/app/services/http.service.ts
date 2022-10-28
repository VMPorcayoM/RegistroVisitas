import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Oficina } from '../models/oficina';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol';
import { Visita } from '../models/visita';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private base_url = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  getOficinas(): Observable<Oficina[]>{
    var res = this.http.get<Oficina[]>(`${this.base_url}/oficinas`);
    return res;
  }

  auth(nickname:string, pass:string):Observable<boolean>{
    return this.http.get<boolean>(`${this.base_url}/auth/${nickname}/${pass}`);
  }
  getUserType(nickname:string):Observable<Rol[]>{
    return this.http.get<Rol[]>(`${this.base_url}/type/${nickname}`);
  }
  getVisita(folio:string):Observable<Visita[]>{
    return this.http.get<Visita[]>(`${this.base_url}/visita/${folio}`);
  }
  agregarVisita(visita:Visita):Observable<boolean>{
    return this.http.post<boolean>(`${this.base_url}/visita`,visita);
  }
}
