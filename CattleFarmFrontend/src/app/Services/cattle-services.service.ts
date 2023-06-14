import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CattleDto } from '../DtoModels/cattledto.model';
import { Cattle } from '../Models/cattle.model';

@Injectable({
  providedIn: 'root'
})
export class CattleServicesService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = config.apiURLCattle;
  }

  getCattlesList(): Observable<Array<Cattle>> {
    return this.http.get<any>(this.url);
  }

  getCattleByID(code: number): Observable<Cattle> {
    return this.http.get<any>(this.url+"/"+code);
  }

  addCattle(data: CattleDto): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

  updateCattle(cattleCode: number, cattle: CattleDto): Observable<any> {
    return this.http.put<any>(this.url+"/"+cattleCode,cattle);
  }

  deleteCattle(cattleCode: number): Observable<any> {
    return this.http.delete<any>(this.url+"/"+cattleCode);
  }

}
