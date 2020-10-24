import { Injectable } from '@angular/core';
import { serverName } from 'src/assets/server-name';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ManagerPositionResponce,
  ManagerPositionRequest,
} from '../models/manager-position.model';

@Injectable({
  providedIn: 'root',
})
export class ManagerPositionService {
  private readonly url = serverName + 'manager-position';

  constructor(private http: HttpClient) {}

  getList(): Observable<ManagerPositionResponce[]> {
    return this.http.get<ManagerPositionResponce[]>(this.url);
  }

  add(
    position: ManagerPositionRequest
  ): Observable<ManagerPositionResponce> {
    return this.http.post<ManagerPositionResponce>(this.url, position);
  }

  edit(
    position: ManagerPositionRequest
  ): Observable<ManagerPositionResponce> {
    return this.http.put<ManagerPositionResponce>(
      `${this.url}/${position.id}`,
      position
    );
  }

  delete(id: string): Observable<ManagerPositionResponce> {
    return this.http.delete<ManagerPositionResponce>(`${this.url}/${id}`);
  }
}
