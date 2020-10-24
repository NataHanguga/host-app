import { Injectable } from '@angular/core';
import { serverName } from 'src/assets/server-name';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AdditionalPositionResponse,
  AdditionalPositionRequest,
} from '../models/additional-position.model';

@Injectable({
  providedIn: 'root',
})
export class AdditionalPositionService {
  private readonly url = serverName + 'employee-position';

  constructor(private http: HttpClient) {}

  getList(): Observable<AdditionalPositionResponse[]> {
    return this.http.get<AdditionalPositionResponse[]>(this.url);
  }

  add(
    position: AdditionalPositionRequest
  ): Observable<AdditionalPositionResponse> {
    return this.http.post<AdditionalPositionResponse>(this.url, position);
  }

  edit(
    position: AdditionalPositionRequest
  ): Observable<AdditionalPositionResponse> {
    return this.http.put<AdditionalPositionResponse>(
      `${this.url}/${position.id}`,
      position
    );
  }

  delete(id: string): Observable<AdditionalPositionResponse> {
    return this.http.delete<AdditionalPositionResponse>(`${this.url}/${id}`);
  }
}
