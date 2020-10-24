import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rate } from '../models/rate.model';
import { serverName } from '../../assets/server-name';

@Injectable({
  providedIn: 'root'
})
export class RateService {
  private readonly url = serverName + 'rate';

  constructor(private http: HttpClient) { }

  getList(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.url);
  }

  add(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(this.url, rate);
  }

  edit(rate: Rate): Observable<Rate> {
    return this.http.put<Rate>(`${this.url}/${rate.id}`, rate);
  }


  delete(id: string): Observable<Rate> {
    return this.http.delete<Rate>(`${this.url}/${id}`);
  }
}
