import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CattleMedDto } from '../DtoModels/cattlemeddto.model';
import { CattleMed } from '../Models/cattlemed.model';


@Injectable({
  providedIn: 'root'
})
export class CattleMedServicesService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = config.apiURLCattleMed;
  }

  getCattleMedList(cattleCode: number): Observable<Array<CattleMed>> {
    return this.http.get<any>(this.url+cattleCode);
  }

  addCattleMed(data: CattleMedDto): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
