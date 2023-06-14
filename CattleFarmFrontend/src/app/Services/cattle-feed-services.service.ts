import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CattleFeedDto } from '../DtoModels/cattlefeeddto.model';
import { CattleFeed } from '../Models/cattlefeed.model';

@Injectable({
  providedIn: 'root'
})
export class CattleFeedServicesService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = config.apiURLCattleFeed;
  }

  getCattleFeedList(cattleCode: number): Observable<Array<CattleFeed>> {
    return this.http.get<any>(this.url+cattleCode);
  }

  addCattleFeed(data: CattleFeedDto): Observable<any> {
    return this.http.post<any>(this.url, data);
  }

}
