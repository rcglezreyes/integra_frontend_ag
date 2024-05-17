import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;
  readonly headers = new HttpHeaders().set('Content-Type', 'application/json');
  resp: any;

  constructor(private http: HttpClient) {
    this.ROOT_URL = 'http://localhost:1323';
    this.headers.append('Accept', 'application/json');
  }

  get(uri: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${uri}`, {headers: this.headers});
  }

  post(uri: string, payload: Object): Observable<any[]> {
    return this.http.post<any[]>(`${this.ROOT_URL}/${uri}`, payload, {headers: this.headers});
  }

  put(uri: string, payload: Object, user_id: number): Observable<any[]> {
    return this.http.put<any[]>(`${this.ROOT_URL}/${uri}/${user_id}`, payload, {headers: this.headers});
  }

  delete(uri: string, user_id: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.ROOT_URL}/${uri}/${user_id}`, {headers: this.headers});
  }
}
